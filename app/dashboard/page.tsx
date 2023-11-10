import { DashboardContextProvider } from '@/components/context/DashboardContext'
import { Campaigns } from '@/components/pages/dashboard/campaigns'

export default function Dashboard() {
  return (
    <DashboardContextProvider>
      <Campaigns />
    </DashboardContextProvider>
  )
}
