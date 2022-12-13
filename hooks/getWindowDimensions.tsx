import { useEffect, useState } from 'react'

export const useWindowDimensions = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [path, setOriginPath] = useState('')

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    setOriginPath(window.location.href)
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    })
  }, [])

  return {
    width,
    height,
    path,
  }
}
