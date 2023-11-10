'use client'

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'

export type CampaignType = {
  id: number
  name: string
}

export type DashboardStateType = {
  campaigns: CampaignType[]
}

const INIT_STATE: DashboardStateType = {
  campaigns: [
    {
      id: 1,
      name: 'Tennis Australia - Love All'
    },
    {
      id: 2,
      name: 'Tennis Australia - Cheap Tuesdays'
    }
  ]
}

const DashboardContext = createContext<{
  state: DashboardStateType
  dispatch: Dispatch<Partial<DashboardStateType>>
}>({
  state: { campaigns: [] },
  dispatch: () => null
})

function reducer(
  state: DashboardStateType,
  nextState: Partial<DashboardStateType>
): DashboardStateType {
  return { ...state, ...nextState }
}

export function useDashboardContext() {
  const dashboardContext = useContext(DashboardContext)

  if (!dashboardContext) {
    throw new Error(
      'useDashboardContext has to be used inside DashboardContext.Provider'
    )
  }

  return dashboardContext
}

export function DashboardContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  )
}
