'use client'

import { createContext, useContext } from 'react'

const ReactContext = createContext<{ email: string; id: string } | null>(null)

const ReactContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: any
}) => {
  return <ReactContext.Provider value={value}>{children}</ReactContext.Provider>
}

// Custom hook to use the context
export const useReactContext = () => {
  return useContext(ReactContext)
}

export default ReactContextProvider
