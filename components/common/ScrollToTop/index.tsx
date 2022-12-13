import { runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import GlobalState from '../../../stores/GlobalState'

const ScrollToTop = observer(({ headerContent }: { headerContent: any }) => {
  const { pathname } = useRouter()
  useEffect(() => {
    runInAction(() => {
      GlobalState.isMenuOpen = false
      GlobalState.isSearchOpen = false
      GlobalState.filterCount = 0
    })
    if (headerContent && headerContent.current) {
      ;(headerContent.current as Element).scrollIntoView()
    }
  }, [pathname])

  return null
})

export default ScrollToTop
