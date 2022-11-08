import { ConstantProductRPool} from "@sushiswap/tines";
import {BigNumber, ethers} from 'ethers'
import { LiquidityProvider } from "./LiquidityProvider";
import { getCreate2Address } from "ethers/lib/utils";
import { keccak256, pack } from '@ethersproject/solidity'
import { SushiPoolABI } from "../../ABI/SushiPool";
import { ChainId, Network, Token } from "../networks/Network";
import { Limited } from "../Limited";
import { PoolCode } from "../pools/PoolCode";
import { ConstantProductPoolCode } from "../pools/ConstantProductPool";

const SUSHISWAP_FACTORY = {
  [ChainId.ETHEREUM]: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
  [ChainId.MATIC]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
}

const INIT_CODE_HASH = {
  [ChainId.ETHEREUM]: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.MATIC]:    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
}

export class SushiProvider extends LiquidityProvider {

  constructor(chainDataProvider: ethers.providers.BaseProvider, net: Network, l: Limited) {
    super(chainDataProvider, net, l)
  }

  getPoolProviderName(): string {return 'Sushiswap'}

  async getPools(t0: Token, t1: Token): Promise<PoolCode[]> {
    if (SUSHISWAP_FACTORY[this.network.chainId] === undefined) {
      // No sushiswap for this network
      return []
    }
    const tokens = this._getAllRouteTokens(t0, t1)
    const pools = await this._getAllPools(tokens)
    return pools
  }
  
  _getPoolAddress(t1: Token, t2: Token): string {
    const [token0, token1] = t1.address.toLowerCase() < t2.address.toLowerCase() ? [t1, t2] : [t2, t1]
    return getCreate2Address(
      SUSHISWAP_FACTORY[this.network.chainId],
      keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
      INIT_CODE_HASH[this.network.chainId]
    )
  }

  async _getPoolData(t0: Token, t1: Token): 
    Promise<PoolCode|undefined> {
    const [token0, token1] = t0.address.toLowerCase() < t1.address.toLowerCase() ? [t0, t1] : [t1, t0]
    const poolAddress = this._getPoolAddress(token0, token1)
    try {
      const pool = await new ethers.Contract(poolAddress, SushiPoolABI, this.chainDataProvider)
      const [reserve0, reserve1]:[BigNumber, BigNumber] = await this.limited.callOnce(() => pool.getReserves())
      const rPool = new ConstantProductRPool(poolAddress, token0, token1, 0.003, reserve0, reserve1)
      return new ConstantProductPoolCode(rPool, this.getPoolProviderName())
    } catch (e) {
      return undefined
    }
  }

  async _getAllPools(
    tokens: Token[]
  ): Promise<PoolCode[]> {
    const poolData: Promise<PoolCode|undefined>[] = []
    for (let i = 0; i < tokens.length; ++i) {
      for (let j = i+1; j < tokens.length; ++j) {
        poolData.push(this._getPoolData(tokens[i], tokens[j]))
      }
    }
    const pools = await Promise.all(poolData)
    return pools.filter(p => p !== undefined) as PoolCode[]
  }

  _getAllRouteTokens(t1: Token, t2: Token) {
    const set = new Set<Token>([
      t1, 
      t2, 
      ...this.network.BASES_TO_CHECK_TRADES_AGAINST, 
      ...(this.network.ADDITIONAL_BASES[t1.address] || []),
      ...(this.network.ADDITIONAL_BASES[t2.address] || []),
     ])
     return Array.from(set)
  }

}