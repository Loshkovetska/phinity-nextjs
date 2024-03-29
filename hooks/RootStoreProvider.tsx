import { observable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import React, { createContext, ReactNode, useContext } from 'react'

const ContentState: any = observable({})

export class RootStore {
  ContentState: any

  constructor() {
    this.ContentState = ContentState
  }
}
enableStaticRendering(typeof window === 'undefined')

let store: RootStore
const StoreContext = createContext<RootStore | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

export function useRootStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

export function useContentState() {
  const { ContentState } = useRootStore()
  return ContentState
}

export function RootStoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode
  hydrationData?: any
}) {
  const store = initializeStore(hydrationData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function initializeStore(initialData?: any): RootStore {
  const _store = store ?? new RootStore()

  if (initialData) {
    runInAction(() => {
      _store.ContentState = initialData
    })
  }
  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}
