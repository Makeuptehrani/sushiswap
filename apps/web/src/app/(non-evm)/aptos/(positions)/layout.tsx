'use client'

import { Container, LinkInternal } from '@sushiswap/ui'
import { useSearchParams } from 'next/navigation'
import { AptosSidebarContainer, SidebarProvider } from 'src/ui/sidebar'
import { PathnameButton } from '~aptos/(common)/components/PathnameButton'
import { PoolsFiltersProvider } from '~aptos/pool/ui/pools/filters/pool-filters-provider'
import { Header } from '../header'
import { Hero } from './hero'

export default function TabsLayout({
  children,
}: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  return (
    <SidebarProvider defaultOpen>
      <Header />
      <AptosSidebarContainer shiftContent>
        <main className="flex flex-col h-full flex-1">
          <Container maxWidth="7xl" className="px-4 py-16">
            <Hero />
          </Container>
          <Container maxWidth="7xl" className="px-4 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <LinkInternal
                shallow={true}
                scroll={false}
                href={`/aptos/pool?${searchParams.toString()}`}
              >
                <PathnameButton
                  id="my-positions"
                  pathname={'/aptos/pool'}
                  asChild
                  size="sm"
                >
                  My Positions
                </PathnameButton>
              </LinkInternal>
              {/*<LinkInternal*/}
              {/*  shallow={true}*/}
              {/*  scroll={false}*/}
              {/*  href={`/pool/my-rewards?${searchParams.toString()}`}*/}
              {/*>*/}
              <PathnameButton
                disabled
                id="my-rewards"
                pathname={'/aptos/pool/my-rewards'}
                size="sm"
              >
                My Rewards
              </PathnameButton>
              {/*</LinkInternal>*/}
            </div>
          </Container>
          <section className="flex flex-col flex-1 pb-10 h-full">
            <PoolsFiltersProvider>{children}</PoolsFiltersProvider>
          </section>
        </main>
      </AptosSidebarContainer>
    </SidebarProvider>
  )
}
