'use client'

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'

export type ComposerStateType = {
  message: string
}

const INIT_STATE: ComposerStateType = {
  message: ''
}

const ComposerContext = createContext<{
  state: ComposerStateType
  dispatch: Dispatch<Partial<ComposerStateType>>
}>({
  state: INIT_STATE,
  dispatch: () => null
})

function reducer(
  state: ComposerStateType,
  nextState: Partial<ComposerStateType>
) {
  return { ...state, ...nextState }
}

export function useComposerContext() {
  const composerContext = useContext(ComposerContext)

  if (!composerContext) {
    throw new Error('Please use ComposerContextProvider')
  }

  return composerContext
}

export function ComposerContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  return (
    <ComposerContext.Provider value={{ state, dispatch }}>
      {children}
    </ComposerContext.Provider>
  )
}
