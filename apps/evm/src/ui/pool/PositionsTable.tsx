import { Protocol } from '@sushiswap/client'
import { Card, CardHeader, CardTitle, DataTable } from '@sushiswap/ui'
import { Slot } from '@sushiswap/ui/components/slot'
import { useAccount } from '@sushiswap/wagmi'
import { ColumnDef, PaginationState, Row } from '@tanstack/react-table'
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react'
import { SUPPORTED_CHAIN_IDS } from 'src/config'
// import { useUserPositions } from 'src/lib/hooks'
// import { PositionWithPool } from 'src/types'

import { V2Position } from '@sushiswap/rockset-client'
import { useV2Positions } from 'src/lib/flair/hooks/positions/v2/v2'
import { usePoolFilters } from './PoolsFiltersProvider'
import {
  APR_COLUMN,
  NAME_COLUMN_POSITION_WITH_POOL,
  VALUE_COLUMN,
} from './columns'

const COLUMNS = [
  NAME_COLUMN_POSITION_WITH_POOL,
  VALUE_COLUMN,
  APR_COLUMN,
] satisfies ColumnDef<V2Position, unknown>[]

interface PositionsTableProps {
  protocol: Protocol
  onRowClick?(row: V2Position): void
  rowLink?(row: V2Position): string
}

const tableState = { sorting: [{ id: 'value', desc: true }] }

export const PositionsTable: FC<PositionsTableProps> = ({
  protocol,
  onRowClick,
  rowLink,
}) => {
  const { address } = useAccount()
  const { chainIds, tokenSymbols } = usePoolFilters()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: positions, isLoading } = useV2Positions(
    {
      user: address!,
      chainIds: SUPPORTED_CHAIN_IDS,
    },
    { enabled: !!address },
  )

  const _positions = useMemo<V2Position[]>(() => {
    if (!positions) return []

    const _tokenSymbols = tokenSymbols?.filter((el) => el !== '') || []
    const searchFiltered = positions.filter((el) =>
      _tokenSymbols.length > 0
        ? _tokenSymbols.some((symbol) => {
            return [el.pool?.token0.symbol, el.pool?.token1.symbol].includes(
              symbol.toUpperCase(),
            )
          })
        : true,
    )
    const chainFiltered = searchFiltered.filter((el) =>
      chainIds.includes(el.pool.chainId),
    )
    return chainFiltered.filter((el) => el.pool?.protocol === protocol)
  }, [positions, tokenSymbols, chainIds, protocol])

  const rowRenderer = useCallback(
    (row: Row<V2Position>, rowNode: ReactNode) => {
      if (onRowClick)
        return (
          <Slot
            className="cursor-pointer"
            onClick={() => onRowClick?.(row.original)}
          >
            {rowNode}
          </Slot>
        )
      return rowNode
    },
    [onRowClick],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          My Positions{' '}
          <span className="text-gray-400 dark:text-slate-500">
            ({_positions.length})
          </span>
        </CardTitle>
      </CardHeader>
      <DataTable
        loading={isLoading}
        rowRenderer={rowRenderer}
        linkFormatter={rowLink}
        columns={COLUMNS}
        data={_positions}
        pagination={true}
        onPaginationChange={setPaginationState}
        state={{
          ...tableState,
          pagination: paginationState,
        }}
      />
    </Card>
  )
}
