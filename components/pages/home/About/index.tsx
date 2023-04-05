import Close from '../../../../assets/close.svg'
import Arrow from '../../../../assets/caret-right.svg'
import Triangle from '../../../../assets/triangle.svg'
import VectorScroll from '../../../../assets/Vector 4.svg'
import VectorScrollDesk from '../../../../assets/Vector 8.svg'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import classNames from 'classnames'
import RightClickCatcher from '../../../common/RightClickCatcher'
import { changePlayerState, setVideo } from '../../../common/VideoBox'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import VideoPreload from '../../../common/VideoPreload'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const About = observer(({ about }: { about: any }) => {
  const [showVideo, setShow] = useState(false)
  const [showBut, setShowBtn] = useState(false)
  const [isAutoPlay, setAuto] = useState(false)
  const { scrollY } = useWindowScroll()
  const { width } = useWindowDimensions()

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const about = smooth!.querySelector('.about')
    const items = smooth!.querySelectorAll('.about__row')

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = about!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top
    if (scrollY > offset - 800) {
      about?.classList.add('animated')
    }

    items.forEach((i, id) => {
      let elemRect = i!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top
      if (scrollY > offset - 800) {
        i?.classList.add('animated')

        if (id + 1 == items.length) {
          setAuto(true)
        }
      }
    })
  }, [scrollY])

  useEffect(() => {
    const container = document.querySelector('.about')
    const smooth = document.querySelector('.smooth')
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = container!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = elemRect.bottom - elemRect.height / 2

    const vect = document.querySelector(
      `.about__vector.${width > 480 ? 'desk' : 'mob'}`,
    )

    if (scrollY >= offset && scrollY <= offsetBottom) {
      ;(vect as HTMLElement).style.transform = `translate3d(0, ${
        scrollY - offset
      }px, 0)`
    }
  }, [scrollY, width])

  const fullScreen = () => {
    var elem: any = document.querySelector('.about-video')
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }
  const playVideo = () => {
    const vd = document?.querySelector('.about-video')
    ;(vd as HTMLVideoElement)?.play()
    fullScreen()
    setShowBtn(false)
  }

  useEffect(() => {
    document
      .querySelector('.about-video')
      ?.addEventListener('fullscreenchange', (e: any) => {
        if (document.fullscreenElement) {
        } else {
          const vd = document?.querySelector('.about-video')
          ;(vd as HTMLVideoElement)?.pause()
          ;(vd as HTMLVideoElement)?.load()
        }
      })
  }, [])

  if (!about) return <></>

  const { links: linksL } = useContentState()
  let aboutL = ''
  if (linksL) {
    aboutL = linksL.find((l: any) => l.id == 259)?.link
  }

  return (
    <section className="about">
      <VectorScrollDesk className="about__vector desk" />
      <VectorScroll className="about__vector mob" />
      <div className="about__container">
        <div className="about__row one animated">
          <div className="about__col">
            <div style={{ overflow: 'hidden' }}>
              <div
                className="about__title"
                dangerouslySetInnerHTML={{ __html: about[0].title }}
              ></div>
            </div>

            <div
              className="about__text"
              dangerouslySetInnerHTML={{ __html: about[0].text }}
            ></div>
            <div className="about__func">
              <div
                className="about__video"
                onClick={() => {
                  setVideo(about[0].videoScr, about[0].poster)
                  changePlayerState()
                }}
              >
                <div className="about__video-play">
                  <Triangle />
                </div>
                <span>Watch video</span>
                <div className="about__video-cont"></div>
              </div>
              <a className="about__more" href={aboutL}>
                Read More
                <Arrow />
              </a>
            </div>
          </div>
          <div>
            <div className={classNames('about__img one video')}>
              <div className="about-mask">
                <RightClickCatcher
                  children={
                    <VideoPreload
                      poster={about[0].poster}
                      src={about[0].videoScr}
                      classStr="about-video"
                    />
                  }
                />

                {showBut && (
                  <div
                    className={classNames(
                      'about-video__play',
                      showBut && showVideo && 'show',
                    )}
                    onClick={playVideo}
                  >
                    <Triangle />
                  </div>
                )}
              </div>

              <div
                className={classNames(
                  'about-video__close',
                  showVideo && 'show',
                )}
                onClick={() => {
                  setShow(false)
                  setShowBtn(false)
                  const video = document.querySelector('.video-play')
                  if (!video) return
                  const vd = video?.querySelector('video')
                  vd?.pause()
                }}
              >
                <Close />
              </div>
            </div>
          </div>
        </div>
        <div className="about__row two">
          <div className="about__img two">
            <div className="about-mask">
              <RightClickCatcher
                children={
                  <VideoPreload
                    isAutoPlay={true}
                    classStr="about-video"
                    src={about[1].videoScr}
                    poster={about[1].poster}
                    isLoop
                  />
                }
              />
            </div>
          </div>
          <div className="about__col">
            <div
              className="about__title"
              dangerouslySetInnerHTML={{ __html: about[1].title }}
            ></div>
            <div
              className="about__text mb30"
              dangerouslySetInnerHTML={{ __html: about[1].text }}
            ></div>

            <div className="about__func">
              <a
                className="button blue p18p40 book"
                href={about[1].buttonLink}
                target="__blank"
              >
                <div className="button__text">{about[1].buttonTitle}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
export default About
