import { Tab } from '@headlessui/react'
import React, { FC, Fragment, useState } from 'react'
import { useAccount } from '@sushiswap/wagmi'

import { PoolsTable } from './Tables'
import { TableFilters } from './Tables/TableFilters'
import { Button } from '@sushiswap/ui/future/components/button'
import { useIsMounted } from '@sushiswap/hooks'
import { Container } from '@sushiswap/ui/future/components/container'
import { PositionsTab } from './PositionsTab'
import { RewardsTab } from './RewardsTab'

export const PoolsSection: FC = () => {
  const { address } = useAccount()
  const [tab, setTab] = useState<number>(0)
  const isMounted = useIsMounted()

  return (
    <section className="flex flex-col">
      <Tab.Group defaultIndex={0} selectedIndex={tab} onChange={setTab}>
        <Container maxWidth="7xl" className="px-4 mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Tab as={Fragment}>
              {({ selected }) => (
                <Button size="sm" variant={selected ? 'secondary' : 'ghost'}>
                  All
                </Button>
              )}
            </Tab>
            {address && isMounted && (
              <>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <Button size="sm" variant={selected ? 'secondary' : 'ghost'} testId="my-positions">
                      My Positions
                    </Button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <Button size="sm" variant={selected ? 'secondary' : 'ghost'} testId="my-rewards">
                      My Rewards
                    </Button>
                  )}
                </Tab>
              </>
            )}
          </div>
        </Container>
        <Tab.Panels className="bg-gray-50 dark:bg-white/[0.02] pt-4">
          <Container maxWidth="7xl" className="px-4 mx-auto">
            <TableFilters showCategories={tab === 0} />
          </Container>
          <Tab.Panel unmount={false}>
            <Container maxWidth="7xl" className="px-4 mx-auto">
              <PoolsTable />
            </Container>
          </Tab.Panel>
          <Tab.Panel unmount={false}>
            <PositionsTab />
          </Tab.Panel>
          <Tab.Panel unmount={false}>
            <RewardsTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}
