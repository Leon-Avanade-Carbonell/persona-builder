import { DashboardContextProvider } from '@/components/context/DashboardContext'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex flex-col min-h-screen mx-auto">
      <div className="flex justify-center">
        <div className="flex-grow min-h-[20px]">
          <div className="my-5 p-5 rounded-lg bg-orange-200">
            Tennis Australia
          </div>
        </div>
      </div>
      <div className="flex flex-1 mx-5">
        <DashboardContextProvider>
          <div className="">{children}</div>
        </DashboardContextProvider>
      </div>
    </div>
  )
}
