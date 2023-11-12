'use client'

import { useDashboardContext } from '@/components/context/DashboardContext'
import { useRouter } from 'next/navigation'

export function Campaigns() {
  const { state } = useDashboardContext()
  const router = useRouter()
  return (
    <>
      <div className="p-5 max-w-5xl bg-orange-200 rounded-lg max-h-96">
        <div className="text-red-700 font-bold mb-5">Campaigns</div>
        <table className="border-collapse border-2 w-[700px] max-h-80">
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
