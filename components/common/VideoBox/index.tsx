import { observer } from 'mobx-react'
import RightClickCatcher from '../RightClickCatcher'
import { useEffect, useRef, useState } from 'react'
import { observable, runInAction } from 'mobx'
import classNames from 'classnames'
import Play from '../../../assets/video/Play.svg'
import Close from '../../../assets/ex/close.svg'

export const VideoPlayer: any = observable({
  video: null || '',
  poster: null || '',
  isShow: false,
})

export const changePlayerState = () => {
  runInAction(() => {
    VideoPlayer.isShow = !VideoPlayer.isShow
  })
}

export const setVideo = (video: string, poster: string) => {
  runInAction(() => {
    VideoPlayer.video = video
    VideoPlayer.poster = poster
  })
}

const VideoBox = observer(() => {
  const ref = useRef<any>(null)
  const [play, setPlay] = useState(false)

  const playVideo = () => {
    if (!ref.current) return
    if (ref.current.paused) {
      setPlay(true)
      ref.current.play()
    } else {
      setPlay(false)
      ref.current.pause()
    }
  }

  useEffect(() => {
    if (!ref.current) return
    ;(ref.current as HTMLVideoElement).addEventListener('playing', (e) => {
      setPlay(true)
    })
    ;(ref.current as HTMLVideoElement).addEventListener('pause', (e) => {
      setPlay(false)
    })
    ;(ref.current as HTMLVideoElement).addEventListener('seeking', (e) => {
      setPlay(true)
    })
    ;(ref.current as HTMLVideoElement).addEventListener('ended', (e) => {
      setPlay(false)
      ;(ref.current as HTMLVideoElement).load()
    })

    return () => {
      ref.current && ref.current.load()
    }
  }, [])

  useEffect(() => {
    if (VideoPlayer.isShow) {
      document.addEventListener('scroll', (e: any) => {
        return false
      })
    } else {
      runInAction(() => {
        VideoPlayer.video = ''
      })
    }
  }, [VideoPlayer.isShow])

  useEffect(() => {
    if (VideoPlayer.isShow) {
    } else {
      setPlay(false)
      ref.current?.load()
    }
  }, [VideoPlayer.isShow])
  return (
    <section
      className={classNames('videobox', VideoPlayer.isShow && 'show')}
      onClick={changePlayerState}
    >
      <div className="videobox__container" onClick={(e) => e.stopPropagation()}>
        <div className="videobox__video">
          <div className="videobox__close" onClick={changePlayerState}>
            <Close />
          </div>

          <RightClickCatcher
            children={
              <>
                {VideoPlayer.video?.includes('youtube') ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={VideoPlayer.video}
                    frameBorder="0"
                    allowFullScreen={true}
                  ></iframe>
                ) : (
                  <video
                    preload="true"
                    disableRemotePlayback
                    disablePictureInPicture
                    ref={ref}
                    controls={play}
                    autoPlay={false}
                    src={VideoPlayer.video}
                    poster={VideoPlayer?.poster ? VideoPlayer?.poster : ''}
                  >
                    <source
                      src={VideoPlayer.video}
                      type="video/mp4;codecs='theora, vorbis'"
                    ></source>
                    <source
                      src={VideoPlayer.video}
                      type="video/ogg;codecs='theora, vorbis'"
                    ></source>
                    <source
                      src={VideoPlayer.video}
                      type="video/webm;codecs='theora, vorbis'"
                    ></source>
                  </video>
                )}
              </>
            }
          />
          {!VideoPlayer.video.includes('youtube') && (
            <div
              className={classNames('videobox__play', play && 'play')}
              onClick={playVideo}
            >
              <Play />
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

export default VideoBox
