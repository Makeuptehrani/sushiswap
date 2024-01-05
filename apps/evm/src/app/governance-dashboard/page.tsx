import React from 'react'

import {
  GovernanceItemsFilters,
  getLatestGovernanceItems,
  getNotionEvents,
} from '../../lib/governance-dashboard'
import {
  HolderSnapshot,
  LatestPosts,
  UpcomingEvents,
} from '../../ui/governance-dashboard'

export default async function Overview({
  searchParams,
}: { searchParams: GovernanceItemsFilters }) {
  const [latestPosts, events] = await Promise.all([
    getLatestGovernanceItems(searchParams),
    getNotionEvents(),
  ])

  return (
    <div className="space-y-12 md:space-y-20">
      <LatestPosts posts={latestPosts} />
      <HolderSnapshot />
      <UpcomingEvents events={events} />
    </div>
  )
}
