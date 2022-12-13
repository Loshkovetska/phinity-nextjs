import { observer } from 'mobx-react'
import Triangle from '../../../../assets/triangle.svg'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Close from '../../../../assets/close.svg'
import RightClickCatcher from '../../../common/RightClickCatcher'
import { changePlayerState, setVideo } from '../../../common/VideoBox'
import VideoPreload from '../../../common/VideoPreload'

const OurServices = observer(({ issues }: { issues: any }) => {
  const [showVideo, setShow] = useState(false)
  const [showBut, setShowBtn] = useState(false)
  const [pos, setPos] = useState(0)
  const [isTouch, setTouch] = useState(false)
  const [poster, setPoster] = useState('')
  useEffect(() => {
    const isTouchC = /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
    setTouch(isTouchC)
  }, [])

  useEffect(() => {
    if (showVideo) {
      const video = document.querySelector('.video-play')
      if (!isTouch) {
        ;(video as any).style.transform = `translate3d(0, ${pos}px, 0)`
      } else {
        ;(video as any).style.transform = `translate3d(0, ${0}px, 0)`
      }
      const vd = video?.querySelector('video')
      if (!vd) return
      vd.play()

      vd.addEventListener('ended', (e) => {
        setShowBtn(true)
      })
    } else {
      const video = document.querySelector('.video-reset')
      const vd = video?.querySelector('video')
      if (!vd) return
      vd.load()
      ;(video as any).style.transform = `translate3d(0, ${0}px, 0)`
    }
  }, [showVideo, isTouch])

  const fullScreen = () => {
    var elem: any = document.querySelector('.about-video')
    if (!elem) return
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
  }, [poster])
  if (!issues) return <></>
  return (
    <section className="our-services issues">
      <div className="our-services__top left">
        <div className="our-services__top-img">
          <div>
            <div className="our-services__img-block">
              <img
                className="our-services__img-vectors"
                src="../vectors.svg"
                alt="vectors"
              />
              <div className="our-services__mask">
                <RightClickCatcher
                  children={
                    <VideoPreload
                      poster={issues.services.poster}
                      classStr="about-video"
                      src={issues.services.videoSrc}
                    />
                  }
                ></RightClickCatcher>

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
        <div className="our-services__top-col">
          <div
            className="our-services__title"
            dangerouslySetInnerHTML={{
              __html: issues.services.title,
            }}
          ></div>
          <div
            className="our-services__text"
            dangerouslySetInnerHTML={{
              __html: issues.services.text,
            }}
          ></div>
          <div
            className="about__video"
            onClick={() => {
              setVideo(issues.services.videoSrc, poster)
              changePlayerState()
            }}
          >
            <div className="about__video-play">
              <Triangle />
            </div>
            <span>Watch video</span>
            <div className="about__video-cont"></div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default OurServices
