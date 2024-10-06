'use client'

import { useReactContext } from './ReactContextProvider'

export default function Article() {
  const userData = useReactContext()
  return (
    <div>
      <p>{userData?.email}</p>
      <p>{userData?.id}</p>
    </div>
  )
}
