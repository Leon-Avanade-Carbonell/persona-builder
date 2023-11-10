import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex h-[60px] m-5 p-10 rounded-lg bg-green-700">Test</div>
      <div className="flex grow-1">{children}</div>
    </div>
  )
}
