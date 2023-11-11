'use client'
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'

export type CampaignType = {
  id: string
  name: string
  details: string
  keywords: string
}

export type DashboardStateType = {
  campaigns: CampaignType[]
}

const INIT_STATE: DashboardStateType = {
  campaigns: [
    {
      id: '48e2fcd0-5f4a-4101-bfcf-d51416032329',
      name: 'Tennis Australia - Love All',
      details: 'All about love',
      keywords: ''
    },
    {
      id: '9a91d3cb-ebb6-48c9-8e5e-ffc38622a3aa',
      name: 'Tennis Australia - Cheap Tuesdays',
      details: 'boost ticket sales',
      keywords: ''
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
