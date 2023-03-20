import { ChainId } from '@sushiswap/chain'
import {
  APE,
  APE_ADDRESS,
  BCT,
  BCT_ADDRESS,
  DAI,
  FEI,
  FEI_ADDRESS,
  FRAX,
  FRAX_ADDRESS,
  FXS,
  FXS_ADDRESS,
  KLIMA,
  KLIMA_ADDRESS,
  KP3R,
  KP3R_ADDRESS,
  LDO,
  LDO_ADDRESS,
  LINK,
  LUSD,
  MIM,
  Native,
  NFTX,
  OHM,
  PRIMATE,
  PRIMATE_ADDRESS,
  QUICK,
  renBTC,
  renBTC_ADDRESS,
  rETH2_ADDRESS,
  sETH2,
  SUSHI,
  SUSHI_ADDRESS,
  SWISE_ADDRESS,
  Token,
  TRIBE,
  TRIBE_ADDRESS,
  USDC,
  USDT,
  WBTC,
  WBTC_ADDRESS,
  WETH9,
  WNATIVE,
  XSUSHI,
  XSUSHI_ADDRESS,
} from '@sushiswap/currency'

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[]
} = {
  [ChainId.ETHEREUM]: [
    WNATIVE[ChainId.ETHEREUM],
    WBTC[ChainId.ETHEREUM],
    USDC[ChainId.ETHEREUM],
    USDT[ChainId.ETHEREUM],
    DAI[ChainId.ETHEREUM],
    MIM[ChainId.ETHEREUM],
    FRAX[ChainId.ETHEREUM],
    OHM[ChainId.ETHEREUM],
    NFTX[ChainId.ETHEREUM],
    LINK[ChainId.ETHEREUM],
  ],

  [ChainId.RINKEBY]: [WNATIVE[ChainId.RINKEBY], USDC[ChainId.RINKEBY]],
  [ChainId.KOVAN]: [WNATIVE[ChainId.KOVAN], USDC[ChainId.KOVAN]],
  [ChainId.POLYGON]: [
    WNATIVE[ChainId.POLYGON],
    WETH9[ChainId.POLYGON],
    WBTC[ChainId.POLYGON],
    USDC[ChainId.POLYGON],
    USDT[ChainId.POLYGON],
    DAI[ChainId.POLYGON],
    MIM[ChainId.POLYGON],
    FRAX[ChainId.POLYGON],
    QUICK[ChainId.POLYGON],
    new Token({
      chainId: ChainId.POLYGON,
      address: '0x2F800Db0fdb5223b3C3f354886d907A671414A7F',
      decimals: 18,
      name: 'Toucan Protocol: Base Carbon Tonne',
      symbol: 'BCT',
    }),
  ],
  [ChainId.POLYGON_TESTNET]: [WNATIVE[ChainId.POLYGON_TESTNET], USDC[ChainId.POLYGON_TESTNET]],
  [ChainId.FANTOM]: [
    WNATIVE[ChainId.FANTOM],
    WETH9[ChainId.FANTOM],
    WBTC[ChainId.FANTOM],
    USDC[ChainId.FANTOM],
    USDT[ChainId.FANTOM],
    DAI[ChainId.FANTOM],
    MIM[ChainId.FANTOM],
    FRAX[ChainId.FANTOM],
  ],
  [ChainId.GNOSIS]: [WNATIVE[ChainId.GNOSIS], USDC[ChainId.GNOSIS], USDT[ChainId.GNOSIS], DAI[ChainId.GNOSIS]],
  [ChainId.BSC]: [
    WNATIVE[ChainId.BSC],
    WETH9[ChainId.BSC],
    USDC[ChainId.BSC],
    USDT[ChainId.BSC],
    DAI[ChainId.BSC],
    MIM[ChainId.BSC],
    FRAX[ChainId.BSC],
  ],
  [ChainId.ARBITRUM]: [
    WNATIVE[ChainId.ARBITRUM],
    WBTC[ChainId.ARBITRUM],
    USDC[ChainId.ARBITRUM],
    USDT[ChainId.ARBITRUM],
    DAI[ChainId.ARBITRUM],
    MIM[ChainId.ARBITRUM],
    FRAX[ChainId.ARBITRUM],
    new Token({
      chainId: ChainId.ARBITRUM,
      address: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
      decimals: 18,
      symbol: 'MAGIC',
      name: 'MAGIC',
    }),
    new Token({
      chainId: ChainId.ARBITRUM,
      address: '0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1',
      decimals: 18,
      symbol: 'gOHM',
      name: 'Governance OHM',
    }),
  ],
  [ChainId.ARBITRUM_NOVA]: [
    WNATIVE[ChainId.ARBITRUM_NOVA],
    WBTC[ChainId.ARBITRUM_NOVA],
    USDC[ChainId.ARBITRUM_NOVA],
    USDT[ChainId.ARBITRUM_NOVA],
    DAI[ChainId.ARBITRUM_NOVA],
  ],
  [ChainId.AVALANCHE]: [
    WNATIVE[ChainId.AVALANCHE],
    WETH9[ChainId.AVALANCHE],
    WBTC[ChainId.AVALANCHE],
    new Token({
      chainId: ChainId.AVALANCHE,
      address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      decimals: 18,
      symbol: 'USDC.e',
      name: 'USD Coin',
    }),
    USDC[ChainId.AVALANCHE],
    USDT[ChainId.AVALANCHE],
    new Token({
      chainId: ChainId.AVALANCHE,
      address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
      decimals: 18,
      symbol: 'USDT.e',
      name: 'Tether USD',
    }),
    DAI[ChainId.AVALANCHE],
    MIM[ChainId.AVALANCHE],
    FRAX[ChainId.AVALANCHE],
    new Token({
      chainId: ChainId.AVALANCHE,
      address: '0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b',
      decimals: 18,
      name: 'Wrapped MEMO',
      symbol: 'WMEMO',
    }),
  ],

  [ChainId.HECO]: [WNATIVE[ChainId.HECO], USDC[ChainId.HECO], USDT[ChainId.HECO], DAI[ChainId.HECO]],
  [ChainId.HARMONY]: [
    WNATIVE[ChainId.HARMONY],
    USDC[ChainId.HARMONY],
    USDT[ChainId.HARMONY],
    DAI[ChainId.HARMONY],
    FRAX[ChainId.HARMONY],
  ],
  [ChainId.OKEX]: [WNATIVE[ChainId.OKEX], USDC[ChainId.OKEX], USDT[ChainId.OKEX], DAI[ChainId.OKEX]],
  [ChainId.CELO]: [
    WNATIVE[ChainId.CELO],
    USDC[ChainId.CELO],
    USDT[ChainId.CELO],
    DAI[ChainId.CELO],
    new Token({
      chainId: ChainId.CELO,
      address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
      decimals: 18,
      symbol: 'cEUR',
      name: 'Celo Euro',
    }),
    new Token({
      chainId: ChainId.CELO,
      address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
      decimals: 18,
      symbol: 'cUSD',
      name: 'Celo Dollar',
    }),
    new Token({
      chainId: ChainId.CELO,
      address: '0x2DEf4285787d58a2f811AF24755A8150622f4361',
      decimals: 18,
      symbol: 'cETH',
      name: 'Celo Ether',
    }),
    new Token({
      chainId: ChainId.CELO,
      address: '0xD629eb00dEced2a080B7EC630eF6aC117e614f1b',
      decimals: 18,
      symbol: 'cBTC',
      name: 'Celo Bitcoin',
    }),
  ],
  [ChainId.PALM]: [WNATIVE[ChainId.PALM]],
  [ChainId.MOONRIVER]: [
    WNATIVE[ChainId.MOONRIVER],
    USDC[ChainId.MOONRIVER],
    USDT[ChainId.MOONRIVER],
    DAI[ChainId.MOONRIVER],
    MIM[ChainId.MOONRIVER],
    FRAX[ChainId.MOONRIVER],
  ],
  [ChainId.FUSE]: [WNATIVE[ChainId.FUSE], USDC[ChainId.FUSE], USDT[ChainId.FUSE], DAI[ChainId.FUSE]],
  [ChainId.TELOS]: [WNATIVE[ChainId.TELOS], USDC[ChainId.TELOS], USDT[ChainId.TELOS]],
  [ChainId.MOONBEAM]: [
    WNATIVE[ChainId.MOONBEAM],
    USDC[ChainId.MOONBEAM],
    USDT[ChainId.MOONBEAM],
    DAI[ChainId.MOONBEAM],
    FRAX[ChainId.MOONBEAM],
  ],
  [ChainId.OPTIMISM]: [
    WNATIVE[ChainId.OPTIMISM],
    WBTC[ChainId.OPTIMISM],
    USDC[ChainId.OPTIMISM],
    USDT[ChainId.OPTIMISM],
    DAI[ChainId.OPTIMISM],
    LUSD[ChainId.OPTIMISM],
    FRAX[ChainId.OPTIMISM],
  ],
  [ChainId.KAVA]: [
    WNATIVE[ChainId.KAVA],
    WETH9[ChainId.KAVA],
    WBTC[ChainId.KAVA],
    USDC[ChainId.KAVA],
    USDT[ChainId.KAVA],
    DAI[ChainId.KAVA],
  ],
  [ChainId.METIS]: [WNATIVE[ChainId.METIS]],
  [ChainId.BOBA]: [
    WNATIVE[ChainId.BOBA],
    WBTC[ChainId.BOBA],
    USDC[ChainId.BOBA],
    USDT[ChainId.BOBA],
    DAI[ChainId.BOBA],
    FRAX[ChainId.BOBA],
  ],
  [ChainId.BOBA_AVAX]: [
    WNATIVE[ChainId.BOBA_AVAX],
    new Token({
      chainId: ChainId.BOBA_AVAX,
      address: '0x4200000000000000000000000000000000000023',
      decimals: 18,
      symbol: 'AVAX',
      name: 'Avax',
    }),
    USDT[ChainId.BOBA_AVAX],
    USDC[ChainId.BOBA_AVAX],
  ],
  [ChainId.BOBA_BNB]: [
    WNATIVE[ChainId.BOBA_BNB],
    new Token({
      chainId: ChainId.BOBA_BNB,
      address: '0x4200000000000000000000000000000000000023',
      decimals: 18,
      symbol: 'BNB',
      name: 'Binance Coin',
    }),
    USDT[ChainId.BOBA_BNB],
    USDC[ChainId.BOBA_BNB],
  ],
  [ChainId.BTTC]: [WNATIVE[ChainId.BTTC], USDC[ChainId.BTTC], USDT[ChainId.BTTC]],
}

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.ETHEREUM]: {
    [rETH2_ADDRESS[ChainId.ETHEREUM]]: [sETH2[ChainId.ETHEREUM]],
    [SWISE_ADDRESS[ChainId.ETHEREUM]]: [sETH2[ChainId.ETHEREUM]],
    [FEI_ADDRESS[ChainId.ETHEREUM]]: [TRIBE[ChainId.ETHEREUM]],
    [TRIBE_ADDRESS[ChainId.ETHEREUM]]: [FEI[ChainId.ETHEREUM]],
    [FRAX_ADDRESS[ChainId.ETHEREUM]]: [FXS[ChainId.ETHEREUM]],
    [FXS_ADDRESS[ChainId.ETHEREUM]]: [FRAX[ChainId.ETHEREUM]],
    [WBTC_ADDRESS[ChainId.ETHEREUM]]: [renBTC[ChainId.ETHEREUM]],
    [renBTC_ADDRESS[ChainId.ETHEREUM]]: [WBTC[ChainId.ETHEREUM]],
    [APE_ADDRESS[ChainId.ETHEREUM]]: [PRIMATE[ChainId.ETHEREUM]],
    [PRIMATE_ADDRESS[ChainId.ETHEREUM]]: [APE[ChainId.ETHEREUM]],
    [SUSHI_ADDRESS[ChainId.ETHEREUM]]: [XSUSHI[ChainId.ETHEREUM]],
    [XSUSHI_ADDRESS[ChainId.ETHEREUM]]: [SUSHI[ChainId.ETHEREUM]],
    [KP3R_ADDRESS[ChainId.ETHEREUM]]: [LDO[ChainId.ETHEREUM]],
    [LDO_ADDRESS[ChainId.ETHEREUM]]: [KP3R[ChainId.ETHEREUM]],
  },
  [ChainId.POLYGON]: {
    [FRAX_ADDRESS[ChainId.POLYGON]]: [FXS[ChainId.POLYGON]],
    [FXS_ADDRESS[ChainId.POLYGON]]: [FRAX[ChainId.POLYGON]],
    [BCT_ADDRESS[ChainId.POLYGON]]: [KLIMA[ChainId.POLYGON]],
    [KLIMA_ADDRESS[ChainId.POLYGON]]: [BCT[ChainId.POLYGON]],
  },
  [ChainId.ARBITRUM]: {
    [FRAX_ADDRESS[ChainId.ARBITRUM]]: [FXS[ChainId.ARBITRUM]],
    [FXS_ADDRESS[ChainId.ARBITRUM]]: [FRAX[ChainId.ARBITRUM]],
  },
  [ChainId.FANTOM]: {
    [FRAX_ADDRESS[ChainId.FANTOM]]: [FXS[ChainId.FANTOM]],
    [FXS_ADDRESS[ChainId.FANTOM]]: [FRAX[ChainId.FANTOM]],
  },
  [ChainId.BSC]: {
    [FRAX_ADDRESS[ChainId.BSC]]: [FXS[ChainId.BSC]],
    [FXS_ADDRESS[ChainId.BSC]]: [FRAX[ChainId.BSC]],
  },
  [ChainId.AVALANCHE]: {
    [FRAX_ADDRESS[ChainId.AVALANCHE]]: [FXS[ChainId.AVALANCHE]],
    [FXS_ADDRESS[ChainId.AVALANCHE]]: [FRAX[ChainId.AVALANCHE]],
  },
  [ChainId.MOONRIVER]: {
    [FRAX_ADDRESS[ChainId.MOONRIVER]]: [FXS[ChainId.MOONRIVER]],
    [FXS_ADDRESS[ChainId.MOONRIVER]]: [FRAX[ChainId.MOONRIVER]],
  },
  [ChainId.MOONBEAM]: {
    [FRAX_ADDRESS[ChainId.MOONBEAM]]: [FXS[ChainId.MOONBEAM]],
    [FXS_ADDRESS[ChainId.MOONBEAM]]: [FRAX[ChainId.MOONBEAM]],
  },
  [ChainId.HARMONY]: {
    [FRAX_ADDRESS[ChainId.HARMONY]]: [FXS[ChainId.HARMONY]],
    [FXS_ADDRESS[ChainId.HARMONY]]: [FRAX[ChainId.HARMONY]],
  },
  [ChainId.BOBA]: {
    [FRAX_ADDRESS[ChainId.BOBA]]: [FXS[ChainId.BOBA]],
    [FXS_ADDRESS[ChainId.BOBA]]: [FRAX[ChainId.BOBA]],
  },
  [ChainId.OPTIMISM]: {
    [FRAX_ADDRESS[ChainId.OPTIMISM]]: [FXS[ChainId.OPTIMISM]],
    [FXS_ADDRESS[ChainId.OPTIMISM]]: [FRAX[ChainId.OPTIMISM]],
  },
}

export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {}

export const COMMON_BASES = {
  [ChainId.ETHEREUM]: [
    Native.onChain(ChainId.ETHEREUM),
    WNATIVE[ChainId.ETHEREUM],
    WBTC[ChainId.ETHEREUM],
    USDC[ChainId.ETHEREUM],
    USDT[ChainId.ETHEREUM],
    DAI[ChainId.ETHEREUM],
  ],
  [ChainId.ROPSTEN]: [],
  [ChainId.RINKEBY]: [],
  [ChainId.GÖRLI]: [],
  [ChainId.KOVAN]: [],
  [ChainId.GNOSIS]: [
    Native.onChain(ChainId.GNOSIS),
    WNATIVE[ChainId.GNOSIS],
    WETH9[ChainId.GNOSIS],
    USDC[ChainId.GNOSIS],
    USDT[ChainId.GNOSIS],
    DAI[ChainId.GNOSIS],
  ],
  [ChainId.BSC]: [
    Native.onChain(ChainId.BSC),
    WNATIVE[ChainId.BSC],
    WETH9[ChainId.BSC],
    USDC[ChainId.BSC],
    USDT[ChainId.BSC],
    DAI[ChainId.BSC],
  ],
  [ChainId.BSC_TESTNET]: [],
  [ChainId.POLYGON]: [
    Native.onChain(ChainId.POLYGON),
    WNATIVE[ChainId.POLYGON],
    WBTC[ChainId.POLYGON],
    WETH9[ChainId.POLYGON],
    USDC[ChainId.POLYGON],
    USDT[ChainId.POLYGON],
    DAI[ChainId.POLYGON],
  ],
  [ChainId.POLYGON_TESTNET]: [],
  [ChainId.AVALANCHE]: [
    Native.onChain(ChainId.AVALANCHE),
    WNATIVE[ChainId.AVALANCHE],
    WETH9[ChainId.AVALANCHE],
    WBTC[ChainId.AVALANCHE],
    USDC[ChainId.AVALANCHE],
    USDT[ChainId.AVALANCHE],
    DAI[ChainId.AVALANCHE],
    MIM[ChainId.AVALANCHE],
    FRAX[ChainId.AVALANCHE],
  ],
  [ChainId.AVALANCHE_TESTNET]: [],
  [ChainId.ARBITRUM_NOVA]: [
    Native.onChain(ChainId.ARBITRUM_NOVA),
    WNATIVE[ChainId.ARBITRUM_NOVA],
    WBTC[ChainId.ARBITRUM_NOVA],
    USDC[ChainId.ARBITRUM_NOVA],
    USDT[ChainId.ARBITRUM_NOVA],
    DAI[ChainId.ARBITRUM_NOVA],
  ],
  [ChainId.BOBA]: [
    Native.onChain(ChainId.BOBA),
    WNATIVE[ChainId.BOBA],
    USDC[ChainId.BOBA],
    USDT[ChainId.BOBA],
    DAI[ChainId.BOBA],
    FRAX[ChainId.BOBA],
    WBTC[ChainId.BOBA],
  ],
  [ChainId.FANTOM]: [
    Native.onChain(ChainId.FANTOM),
    WNATIVE[ChainId.FANTOM],
    WBTC[ChainId.FANTOM],
    WETH9[ChainId.FANTOM],
    USDC[ChainId.FANTOM],
    USDT[ChainId.FANTOM],
    DAI[ChainId.FANTOM],
    MIM[ChainId.FANTOM],
  ],
  [ChainId.FANTOM_TESTNET]: [],
  [ChainId.ARBITRUM]: [
    Native.onChain(ChainId.ARBITRUM),
    WNATIVE[ChainId.ARBITRUM],
    WBTC[ChainId.ARBITRUM],
    USDC[ChainId.ARBITRUM],
    USDT[ChainId.ARBITRUM],
    DAI[ChainId.ARBITRUM],
    MIM[ChainId.ARBITRUM],
  ],
  [ChainId.ARBITRUM_TESTNET]: [],
  [ChainId.HARMONY]: [
    Native.onChain(ChainId.HARMONY),
    WNATIVE[ChainId.HARMONY],
    WETH9[ChainId.HARMONY],
    USDC[ChainId.HARMONY],
    USDT[ChainId.HARMONY],
    DAI[ChainId.HARMONY],
  ],
  [ChainId.HARMONY_TESTNET]: [],
  [ChainId.HECO]: [
    Native.onChain(ChainId.HECO),
    WNATIVE[ChainId.HECO],
    WETH9[ChainId.HECO],
    USDC[ChainId.HECO],
    USDT[ChainId.HECO],
    DAI[ChainId.HECO],
  ],
  [ChainId.HECO_TESTNET]: [],
  [ChainId.OKEX]: [
    Native.onChain(ChainId.OKEX),
    WNATIVE[ChainId.OKEX],
    WETH9[ChainId.OKEX],
    USDC[ChainId.OKEX],
    USDT[ChainId.OKEX],
    DAI[ChainId.OKEX],
  ],
  [ChainId.OKEX_TESTNET]: [],
  [ChainId.CELO]: [
    Native.onChain(ChainId.CELO),
    // WNATIVE[ChainId.CELO],
    WETH9[ChainId.CELO],
    USDC[ChainId.CELO],
    USDT[ChainId.CELO],
    DAI[ChainId.CELO],
  ],
  [ChainId.PALM]: [Native.onChain(ChainId.PALM), WNATIVE[ChainId.PALM], WETH9[ChainId.PALM]],
  [ChainId.MOONRIVER]: [
    Native.onChain(ChainId.MOONRIVER),
    WNATIVE[ChainId.MOONRIVER],
    WETH9[ChainId.MOONRIVER],
    USDC[ChainId.MOONRIVER],
    USDT[ChainId.MOONRIVER],
    DAI[ChainId.MOONRIVER],
    FRAX[ChainId.MOONRIVER],
  ],
  [ChainId.FUSE]: [
    Native.onChain(ChainId.FUSE),
    WNATIVE[ChainId.FUSE],
    WBTC[ChainId.FUSE],
    WETH9[ChainId.FUSE],
    USDC[ChainId.FUSE],
    USDT[ChainId.FUSE],
    DAI[ChainId.FUSE],
  ],
  [ChainId.TELOS]: [
    Native.onChain(ChainId.TELOS),
    WNATIVE[ChainId.TELOS],
    WETH9[ChainId.TELOS],
    USDC[ChainId.TELOS],
    USDT[ChainId.TELOS],
  ],
  [ChainId.MOONBEAM]: [
    Native.onChain(ChainId.MOONBEAM),
    WNATIVE[ChainId.MOONBEAM],
    WETH9[ChainId.MOONBEAM],
    USDC[ChainId.MOONBEAM],
    USDT[ChainId.MOONBEAM],
    DAI[ChainId.MOONBEAM],
  ],
  [ChainId.OPTIMISM]: [
    Native.onChain(ChainId.OPTIMISM),
    WNATIVE[ChainId.OPTIMISM],
    WBTC[ChainId.OPTIMISM],
    USDC[ChainId.OPTIMISM],
    USDT[ChainId.OPTIMISM],
    DAI[ChainId.OPTIMISM],
  ],
  [ChainId.KAVA]: [
    Native.onChain(ChainId.KAVA),
    WNATIVE[ChainId.KAVA],
    WBTC[ChainId.KAVA],
    WETH9[ChainId.KAVA],
    USDC[ChainId.KAVA],
    USDT[ChainId.KAVA],
    DAI[ChainId.KAVA],
  ],
  [ChainId.METIS]: [
    Native.onChain(ChainId.METIS),
    WNATIVE[ChainId.METIS],
    WBTC[ChainId.METIS],
    WETH9[ChainId.METIS],
    USDC[ChainId.METIS],
    USDT[ChainId.METIS],
    DAI[ChainId.METIS],
  ],
  [ChainId.BOBA_AVAX]: [
    Native.onChain(ChainId.BOBA_AVAX),
    WNATIVE[ChainId.BOBA_AVAX],
    USDC[ChainId.BOBA_AVAX],
    USDT[ChainId.BOBA_AVAX],
  ],
  [ChainId.BOBA_BNB]: [
    Native.onChain(ChainId.BOBA_BNB),
    WNATIVE[ChainId.BOBA_BNB],
    new Token({
      chainId: ChainId.BOBA_BNB,
      symbol: 'BNB',
      name: 'Binance Coin',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000023',
    }),
    USDC[ChainId.BOBA_BNB],
    USDT[ChainId.BOBA_BNB],
  ],
  [ChainId.BTTC]: [Native.onChain(ChainId.BTTC), WNATIVE[ChainId.BTTC], USDC[ChainId.BTTC], USDT[ChainId.BTTC]],
  [ChainId.CONSENSUS_ZKEVM_TESTNET]: [
    Native.onChain(ChainId.CONSENSUS_ZKEVM_TESTNET),
    WNATIVE[ChainId.CONSENSUS_ZKEVM_TESTNET],
  ],
  [ChainId.SCROLL_ALPHA_TESTNET]: [Native.onChain(ChainId.SCROLL_ALPHA_TESTNET), WNATIVE[ChainId.SCROLL_ALPHA_TESTNET]],
  [ChainId.BASE_TESTNET]: [Native.onChain(ChainId.BASE_TESTNET), WNATIVE[ChainId.BASE_TESTNET]],
  // [ChainId.SEPOLIA]: [Native.onChain(ChainId.SEPOLIA), WNATIVE[ChainId.SEPOLIA]],
} as const
