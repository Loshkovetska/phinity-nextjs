import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import Cookie from '../Cookie'
import Footer from '../Footer'
import Header from '../Header'
import ScrollToTop from '../ScrollToTop'
import SearchBox from '../SearchBox'
import VideoBox from '../VideoBox'
import ScrollDown from '../../../assets/post/arrow.svg'
import classNames from 'classnames'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'

const Layout = observer(
  ({
    children,
    withScroll = false,
    withFooter = true,
    withCookie = true,
    withVideo = true,
    isTranslate = false,
    isFixed = false,
  }: {
    children: any
    withScroll?: boolean
    withFooter?: boolean
    withCookie?: boolean
    withVideo?: boolean
    isTranslate?: boolean
    isFixed?: boolean
  }) => {
    const { width } = useWindowDimensions()
    const ref = useRef<any>(null)

    const [showFooter, setFooter] = useState(false)
    const [showContent, setShow] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setFooter(true)
      }, 1000)
      setTimeout(() => {
        setShow(true)
      }, 100)
    }, [])

    return (
      <>
        <ScrollToTop headerContent={ref} />
        <div ref={ref}></div>
        <div
          className={classNames(
            'smooth',
            !showContent && 'hidden-content',
            !isTranslate && 'hidden-scroll',
            isFixed && 'hidden',
          )}
        >
          <Header />
          {children}
          {withFooter && showFooter && <Footer />}
          <SearchBox />
        </div>
        {width > 768 && withScroll && (
          <div className="intro__scrolldown ">
            <ScrollDown />
            <ScrollDown />
            <ScrollDown />
          </div>
        )}
        {withVideo && <VideoBox />}
        {withCookie && <Cookie />}
      </>
    )
  },
)

export default Layout
