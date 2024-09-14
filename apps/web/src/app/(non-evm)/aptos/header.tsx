'use client'

import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { ChevronDownIcon } from '@heroicons/react-v1/solid'
import { Navigation } from '@sushiswap/ui'
import { Badge, SushiNavigationDropdown, classNames } from '@sushiswap/ui'
import { SushiIcon } from '@sushiswap/ui/icons/SushiIcon'
import { SushiWithTextIcon } from '@sushiswap/ui/icons/SushiWithTextIcon'
import { AptosCircle } from '@sushiswap/ui/icons/network/circle/AptosCircle'
import React, { FC } from 'react'
import { SidebarToggle, useSidebar } from 'src/ui/sidebar'
import { headerElements } from './_common/header-elements'
import { UserProfile } from './_common/ui/user-profile/user-profile'

export const Header: FC = () => {
  const { connected } = useWallet()

  const { isOpen } = useSidebar()

  return (
    <div className="flex z-20">
      <div
        className={classNames(
          'hidden lg:flex justify-between items-center px-1 w-56 h-14 flex-shrink-0 bg-gray-100 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800',
          !isOpen && 'border-b',
        )}
      >
        <SushiNavigationDropdown className="!px-2">
          <SushiWithTextIcon width={90} />
        </SushiNavigationDropdown>
        <SidebarToggle variant="ghost" className="!px-2" asChild>
          <Badge
            position="bottom-right"
            badgeContent={
              connected ? (
                <div className="bg-green rounded-full w-2 h-2 mr-0.5 mb-0.5" />
              ) : (
                <div />
              )
            }
          >
            <AptosCircle width={22} height={22} />
          </Badge>
          <ChevronDownIcon className="w-3 h-3" />
        </SidebarToggle>
      </div>
      <div className="flex lg:hidden justify-between items-center pl-4 bg-gray-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <SushiNavigationDropdown>
          <SushiIcon width={24} height={24} />
        </SushiNavigationDropdown>
      </div>
      <Navigation
        className="!pl-0 lg:!pl-4"
        hideSushiDropdown
        leftElements={headerElements}
        rightElement={<UserProfile />}
      />
    </div>
  )
}
