import { useEffect } from 'react'

const IsOutSide = (ref: any, func: (value: boolean) => void) => {
  const isInside = (e: Event) => {
    if (!ref.current) return false
    if (!(ref.current as any).contains(e.target)) {
      func(false)
    } else return false
  }

  useEffect(() => {
    document.addEventListener('click', isInside)

    return () => document.removeEventListener('click', isInside)
  }, [])
  if (!ref) return
}

export default IsOutSide
