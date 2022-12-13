import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'

const CheckerItemsInsideCont = observer(
  ({
    slider,
    list,
    countOfChidlren,
    container,
    child,
  }: {
    slider: any
    list: any
    countOfChidlren: number
    container: string
    child: string
  }) => {
    const [showSlider, setShow] = useState(false)
    const { width } = useWindowDimensions()

    useEffect(() => {
      const cont = document.querySelector(container)
      if (!cont) return
      const contWidth = cont.getBoundingClientRect().width
      const ch = document.querySelector(child)
      if (!ch) return
      const margin =
        parseInt(getComputedStyle(ch).marginRight) ||
        parseInt(getComputedStyle(ch).marginLeft)

      if (
        (ch.getBoundingClientRect().width + margin) * countOfChidlren <=
        contWidth
      ) {
        setShow(false)
      } else setShow(true)
    }, [width, countOfChidlren, container, child])

    return <>{showSlider ? slider : list}</>
  },
)

export default CheckerItemsInsideCont
