import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { ChainId } from '@sushiswap/chain'
import { IconButton, LinkInternal } from '@sushiswap/ui'

import { PositionView } from '../../../../../ui/pool/PositionView'

export default async function PositionsPage({ params }: { params: { id: string; positionId: string } }) {
  const [chainId] = params.id.split('%3A') as [ChainId, string]

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <LinkInternal href={`/pool/${params.id}/positions`} className="flex items-center gap-1">
          <IconButton variant="ghost" size="sm" name="go back" icon={ArrowLeftIcon} />
          <span className="text-sm font-medium">View all positions</span>
        </LinkInternal>
      </div>
      <PositionView params={{ id: `${chainId}%3A${params.positionId}` }} />
    </div>
  )
}