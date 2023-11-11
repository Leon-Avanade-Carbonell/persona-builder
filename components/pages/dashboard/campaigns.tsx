'use client'

import { useDashboardContext } from '@/components/context/DashboardContext'
import { useRouter } from 'next/navigation'

export function Campaigns() {
  const { state } = useDashboardContext()
  const router = useRouter()
  return (
    <>
      <div className="p-2 min-w-full bg-orange-200 rounded-lg">
        <table className="border-collapse border-2 w-[700px]">
          <tbody>
            {state.campaigns.map((entry) => (
              <tr key={entry.id}>
                <td
                  className="border-2 border-red-800 bg-orange-100/90 text-red-800 p-2"
                  onClick={() => router.push(`/dashboard/${entry.id}`)}
                >
                  {entry.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
