import { useEffect, useState } from 'react'

export const useWindowScroll = () => {
  const [scrollY, setScroll] = useState(0)

  useEffect(() => {
    const setScrollValue = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', setScrollValue)

    return () => {
      window.removeEventListener('scroll', setScrollValue)
    }
  }, [])

  return {
    scrollY,
  }
}
