'use client'

import { useDashboardContext } from '@/components/context/DashboardContext'

export function Campaigns() {
  const { state } = useDashboardContext()
  return (
    <>
      {state.campaigns.map((entry) => (
        <p key={entry.id}>{entry.name}</p>
      ))}
    </>
  )
}
