import { allChains, allProviders } from '@sushiswap/wagmi-config'
import type { Address } from '@wagmi/core'
import { configureChains, createConfig, fetchToken } from '@wagmi/core'
import { sql } from 'drizzle-orm'
import { getAddress } from 'viem'
import { databaseClient, tokenSchema } from '../db.js'

const { publicClient } = configureChains(allChains, allProviders)
createConfig({
  autoConnect: true,
  publicClient,
})

export async function getToken(chainId: number, address: string) {
  try {
    const tokens = await databaseClient
      .select({
        address: tokenSchema.address,
        chainId: tokenSchema.chainId,
        name: tokenSchema.name,
        symbol: tokenSchema.symbol,
        decimals: tokenSchema.decimals,
      })
      .from(tokenSchema)
      .limit(1)
      .where(
        sql`${tokenSchema.chainId} = ${chainId} AND ${
          tokenSchema.address
        } = ${address.toLowerCase()}`,
      )
    const token = tokens[0]
    if (!tokens.length || !token) {
      throw new Error('Token not found')
    }
    return {
      ...token,
      address: getAddress(token.address),
    }
  } catch {
    const tokenFromContract = await fetchToken({
      chainId,
      address: address as Address,
    }).catch(() => {
      return undefined
    })
    if (tokenFromContract) {
      return {
        id: `${chainId}:${tokenFromContract.address}`,
        address: tokenFromContract.address,
        name: tokenFromContract.name,
        symbol: tokenFromContract.symbol,
        decimals: tokenFromContract.decimals,
      }
    } else {
      throw new Error('Token not found')
    }
  }
}

export async function getTokenAddressesByChainId(chainId: number) {
  const addresses = await databaseClient
    .select({
      address: tokenSchema.address,
    })
    .from(tokenSchema)
    .where(sql`${tokenSchema.chainId} = ${chainId}`)
  return addresses ? addresses : []
}

export async function getTokensByChainId(chainId: number) {
  const result = await databaseClient
    .select({
      address: tokenSchema.address,
      chainId: tokenSchema.chainId,
      name: tokenSchema.name,
      symbol: tokenSchema.symbol,
      decimals: tokenSchema.decimals,
    })
    .from(tokenSchema)
    .where(sql`${tokenSchema.chainId} = ${chainId}`)
  const tokens = result.map((token) => ({
    ...token,
    address: getAddress(token.address),
  }))
  return tokens ? tokens : []
}

export async function getTokens() {
  const result = await databaseClient
    .select({
      address: tokenSchema.address,
      chainId: tokenSchema.chainId,
      name: tokenSchema.name,
      symbol: tokenSchema.symbol,
      decimals: tokenSchema.decimals,
    })
    .from(tokenSchema)
  const tokens = result.map((token) => ({
    ...token,
    address: getAddress(token.address),
  }))
  return tokens ? tokens : []
}

export async function getTokensByAddress(address: string) {
  const result = await databaseClient
    .select({
      address: tokenSchema.address,
      chainId: tokenSchema.chainId,
      name: tokenSchema.name,
      symbol: tokenSchema.symbol,
      decimals: tokenSchema.decimals,
    })
    .from(tokenSchema)
    .where(sql`${tokenSchema.address} = ${address.toLowerCase()}`)
  const tokens = result.map((token) => ({
    ...token,
    address: getAddress(token.address),
  }))
  return tokens ? tokens : []
}
