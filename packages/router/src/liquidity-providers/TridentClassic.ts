import { getReservesAbi } from '@sushiswap/abi'
import { CONSTANT_PRODUCT_POOL_FACTORY_ADDRESS } from '@sushiswap/address'
import { ChainId } from '@sushiswap/chain'
import { Token } from '@sushiswap/currency'
import { ConstantProductRPool } from '@sushiswap/tines'
import { Address, readContracts, watchBlockNumber } from '@wagmi/core'

import { getPoolsByTokenIds, getTopPools, PoolResponse } from '../lib/api'
import { BentoPoolCode } from '../pools/BentoPool'
import type { PoolCode } from '../pools/PoolCode'
import { LiquidityProviders } from './LiquidityProvider'
import { convertTokenToBento, TridentBase } from './TridentBase'

interface PoolInfo {
  poolCode: PoolCode
  fetchType: 'INITIAL' | 'ON_DEMAND'
  updatedAtBlock: number
}

export class TridentCPPProvider extends TridentBase {
  isInitialized = false
  pools: Map<string, PoolInfo> = new Map()

  blockListener?: () => void
  unwatchBlockNumber?: () => void

  constructor(chainId: ChainId) {
    super(chainId)
    if (!(chainId in CONSTANT_PRODUCT_POOL_FACTORY_ADDRESS)) {
      throw new Error(
        `${this.getType()} cannot be instantiated for chainId ${chainId}, no constant product pool factory address found`
      )
    }
  }

  getType(): LiquidityProviders {
    return LiquidityProviders.TridentCP
  }

  getPoolProviderName(): string {
    return 'Trident CPP'
  }

  async initialize() {
    this.isInitialized = true

    const topPools = await getTopPools(
      this.chainId,
      'SushiSwap',
      'TRIDENT',
      ['CONSTANT_PRODUCT_POOL'],
      this.TOP_POOL_SIZE,
      this.TOP_POOL_LIQUIDITY_THRESHOLD
    )

    if (topPools.size > 0) {
      console.debug(`${this.getLogPrefix()} - INIT: top pools found: ${topPools.size}`)
    } else {
      console.debug(`${this.getLogPrefix()} - INIT: NO pools found.`)
      return
    }

    await this.initPools(Array.from(topPools.values()), 'INITIAL')

    console.debug(`${this.getLogPrefix()} - INIT, WATCHING ${this.getCurrentPoolList().length} POOLS`)
  }

  async initPools(pools: PoolResponse[], fetchType: 'INITIAL' | 'ON_DEMAND'): Promise<void> {
    const cppReservePromise = readContracts({
      allowFailure: true,
      contracts: pools.map((p) => ({
        address: p.address as Address,
        chainId: this.chainId,
        abi: getReservesAbi,
        functionName: 'getReserves',
      })),
    })

    const [cppReserves] = await Promise.all([cppReservePromise, this.initBridges(pools)])

    pools.forEach((pr, i) => {
      const res = cppReserves[i]
      if (res === undefined || res === null) return
      const tokens = [convertTokenToBento(pr.token0), convertTokenToBento(pr.token1)]
      const rPool = new ConstantProductRPool(pr.address, tokens[0], tokens[1], pr.swapFee, res[0], res[1])
      const pc = new BentoPoolCode(rPool, this.getType(), this.getPoolProviderName())
      this.pools.set(pr.address, { poolCode: pc, fetchType, updatedAtBlock: this.lastUpdateBlock })
      ++this.stateId
    })
  }

  async getPools(t0: Token, t1: Token): Promise<void> {
    console.debug(`****** ${this.getType()} POOLS IN MEMORY:`, this.getCurrentPoolList().length)
    const poolsOnDemand = await getPoolsByTokenIds(
      this.chainId,
      'SushiSwap',
      'TRIDENT',
      ['CONSTANT_PRODUCT_POOL'],
      t0.address,
      t1.address,
      this.TOP_POOL_SIZE,
      this.TOP_POOL_LIQUIDITY_THRESHOLD,
      this.ON_DEMAND_POOL_SIZE
    )
    console.debug(`${this.getLogPrefix()} - ON DEMAND: Begin fetching reserves for ${poolsOnDemand.size} pools`)
    const pools = Array.from(poolsOnDemand.values())

    // TODO: refactor this, unnecessary to fetch reserves for all pools, then update them again after
    await this.initPools(pools, 'ON_DEMAND')
    await this.updatePools('ALL')
  }

  async updatePools(type: 'ALL' | 'INITIAL'): Promise<void> {
    this.removeStalePools()
    let pools = Array.from(this.pools.values())

    if (type === 'INITIAL') {
      pools = pools.filter((p) => p.fetchType === 'INITIAL')
    }

    const reservePromise = readContracts({
      allowFailure: true,
      contracts: pools.map((p) => ({
        address: p.poolCode.pool.address as Address,
        chainId: this.chainId,
        abi: getReservesAbi,
        functionName: 'getReserves',
      })),
    })

    const [reserves] = await Promise.all([reservePromise, this.updateBridges(type)])

    pools.forEach((pi, i) => {
      const res = reserves[i]
      if (
        res === undefined ||
        res === null ||
        !pi.poolCode.pool.reserve0.eq(res[0]) ||
        !pi.poolCode.pool.reserve1.eq(res[1])
      ) {
        return
      }

      pi.poolCode.pool.updateReserves(res[0], res[1])
      this.pools.set(pi.poolCode.pool.address, {
        poolCode: pi.poolCode,
        fetchType: pi.fetchType,
        updatedAtBlock: this.lastUpdateBlock,
      })
      ++this.stateId
    })

    console.debug(`${this.getLogPrefix()} - UPDATED POOLS`)
  }

  startFetchPoolsData() {
    this.stopFetchPoolsData()
    this.pools = new Map()
    this.bridges = new Map()

    this.unwatchBlockNumber = watchBlockNumber(
      {
        listen: true,
      },
      (blockNumber) => {
        this.lastUpdateBlock = blockNumber
        if (!this.isInitialized) {
          this.initialize()
        } else {
          this.updatePools('INITIAL')
        }
      }
    )
  }

  private removeStalePools() {
    // TODO: move this to a per-chain config?
    this.removeStaleBridges()
    const blockThreshold = this.lastUpdateBlock - this.ON_DEMAND_POOLS_BLOCK_LIFETIME
    let removed = 0

    for (const [k, v] of this.pools) {
      if (v.updatedAtBlock < blockThreshold && v.fetchType === 'ON_DEMAND') {
        removed++
        this.pools.delete(k)
      }
    }

    if (removed > 0) {
      console.log(`${this.getLogPrefix()} -Removed ${removed} stale pools`)
    }
  }

  fetchPoolsForToken(t0: Token, t1: Token): void {
    this.getPools(t0, t1)
  }

  getCurrentPoolList(): PoolCode[] {
    return [...this.pools.values(), ...this.bridges.values()].map((p) => p.poolCode)
  }

  stopFetchPoolsData() {
    if (this.unwatchBlockNumber) this.unwatchBlockNumber()
    this.blockListener = undefined
  }
}
