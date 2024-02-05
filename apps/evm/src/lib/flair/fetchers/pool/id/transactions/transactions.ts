import { parseArgs } from '@sushiswap/client'
import { Transaction, TransactionsArgs } from '@sushiswap/rockset-client'
import { FLAIR_POOL_API_URL } from 'src/lib/flair/fetchers/common'

export const getTransactionsUrl = (args: TransactionsArgs) => {
  return `${FLAIR_POOL_API_URL}/pool/${args.id}/transactions${parseArgs(args)}`
}

export const getTransactions = async (
  args: TransactionsArgs,
  init?: RequestInit,
): Promise<Transaction[]> => {
  const url = getTransactionsUrl(args)
  return fetch(url, init).then((data) => data.json())
}