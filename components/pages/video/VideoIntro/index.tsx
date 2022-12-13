import { observer } from 'mobx-react'
import PageLinks from '../../../common/PageLinks'
import Vector from '../../../../assets/home-area.svg'
import Play from '../../../../assets/video/Play.svg'
import ArrowRight from '../../../../assets/ex/arrowRight.svg'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import GlobalState from '../../../../stores/GlobalState'
import RightClickCatcher from '../../../common/RightClickCatcher'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { outputDate } from '../../../../methods/output'
const VideoIntro = observer(({ videoCont }: { videoCont: any }) => {
  const ref = useRef<any>(null)
  const [play, setPlay] = useState(false)
  const { width, path } = useWindowDimensions()
  const content = useContentState()
  const { scrollY } = useWindowScroll()

  const [videoSrc, setSrc] = useState('')
  const requestRef = useRef<any>(false)
  useEffect(() => {
    const container = document.querySelector('.video-intro')
    const vect = document.querySelector('.video-intro__vector')
    const smooth = document.querySelector('.smooth')

    if (!smooth || !vect) return
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = container!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = elemRect.bottom - elemRect.height / 2

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        if (width > 480) {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0)`
        } else {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0) scale(0.7)`
        }
      })
    }
  }, [content.video, scrollY, width])

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

  const { video } = content

  useEffect(() => {
    if (!ref.current && video?.src.includes('youtube')) return
    ;(ref.current as HTMLVideoElement).addEventListener('playing', (e) => {
      setPlay(true)
    })
    ;(ref.current as HTMLVideoElement).addEventListener('pause', (e) => {
      setPlay(false)
      console.log('paused')
    })
    ;(ref.current as HTMLVideoElement).addEventListener('seeking', (e) => {
      setPlay(true)
      console.log('seek')
    })
    ;(ref.current as HTMLVideoElement).addEventListener('ended', (e) => {
      setPlay(false)
      console.log('end')
      ;(ref.current as HTMLVideoElement).load()
    })
    return () => {
      !video?.src.includes('youtube') && ref.current && ref.current.load()
    }
  }, [video])

  useEffect(() => {
    if (requestRef.current) return
    if (!video?.src) return
    setSrc(video.src)
    requestRef.current = true
  }, [video])

  const getIndex = () => {
    let idx = 0
    content?.videos?.forEach((v: any, i: number) => {
      if (v.id == video?.id) idx = i
    })

    return idx
  }

  const dt = content.videos

  let videos = '',
    main = ''

  const links = GlobalState.links
  if (links) {
    videos = links.find((l: any) => l.id == 644).link
    main = links.find((l: any) => l.id == 2).link
  }

  return (
    <section className="video-intro">
      <Vector className="video-intro__vector" />
      <div className="video-intro__container">
        <PageLinks
          links={[
            { title: videoCont.mainPageTitle, link: main },
            { title: videoCont.pageTitle, link: videos },
            {
              title: video?.title || '',
              link: `${videos}/${video?.link || ''}`,
            },
          ]}
        />

        <div className="video-intro__content">
          <div className="video-intro__content-top">
            <div className="video-intro__video">
              <RightClickCatcher
                children={
                  <>
                    {!video?.src.includes('youtube') ? (
                      <video
                        onClick={(e) => {
                          e.preventDefault()
                          playVideo()
                        }}
                        disableRemotePlayback={true}
                        ref={ref}
                        controls={play}
                        autoPlay={false}
                        src={video?.src}
                        poster={video?.poster ? video?.poster : ''}
                      >
                        <source src={video?.src}></source>
                      </video>
                    ) : (
                      <iframe
                        width="100%"
                        height="100%"
                        src={videoSrc}
                        frameBorder="0"
                        allowFullScreen={true}
                      ></iframe>
                    )}
                  </>
                }
              />

              {!video?.src.includes('youtube') && (
                <div
                  className={classNames(
                    'video-intro__video-play',
                    play && 'play',
                  )}
                  onClick={playVideo}
                >
                  <Play />
                </div>
              )}
            </div>
          </div>
          <div className="video-intro__top">
            <div className="video-intro__subtop">
              <div style={{ overflow: 'hidden' }}>
                <h1 className="video-intro__title">{video?.title}</h1>
              </div>
              <p className="video-intro__top-bottom">
                {video?.linkAuthor && (
                  <a href={video.linkAuthor}>{video.author?.name}</a>
                )}{' '}
                &bull; {outputDate(video!.date)}
              </p>
            </div>

            <div className="video-intro__social">
              <div className="video-intro__social-title">
                {videoCont?.shareTitle || ''}
              </div>
              <div className="video-intro__social-list">
                {videoCont?.shareList?.map((b: any, i: number) => (
                  <a href={b.link + path} target="__blank" key={i}>
                    <img src={b.icon} alt={video.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="video-intro__text">{video?.text}</div>
          {video?.author && (
            <div className="post-content__block">
              <div className="post-content__block-img">
                <img src={video?.author?.src || ''} alt={video?.title} />
              </div>
              {video?.author && (
                <div className="post-content__block-col">
                  <div className="post-content__block-subtitle">
                    About the Author
                  </div>
                  <div className="post-content__block-title">
                    {video?.author?.name}
                    {video?.author?.position && video?.author?.position.length
                      ? ', '
                      : ''}{' '}
                    {video?.author?.position}
                  </div>
                  <div className="post-content__block-text">
                    {video?.author?.about}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="video-intro__social">
          <div className="video-intro__social-title">
            {' '}
            {videoCont?.shareTitle || ''}
          </div>
          <div className="video-intro__social-list">
            {videoCont?.shareList?.map((b: any, i: number) => (
              <a key={i} href={b.link + path} target="__blank">
                <img src={b.icon} alt={video.title} />
              </a>
            ))}
          </div>
        </div>

        {dt?.length ? (
          <div className={classNames('video-intro__bottom')}>
            {dt[getIndex() - 1] ? (
              <PostArrow
                title={dt[getIndex() - 1]?.title}
                isLeft
                action={() => {
                  window.location.href = `${videos}/${dt[getIndex() - 1]!.link}`
                }}
              />
            ) : (
              <PostArrow
                title={dt![dt!.length - 1]?.title}
                isLeft
                action={() => {
                  window.location.href = `${videos}/${
                    dt![dt!.length - 1]!.link
                  }`
                }}
              />
            )}
            {dt[getIndex() + 1] ? (
              <PostArrow
                title={dt[getIndex() + 1]?.title}
                isLeft={false}
                action={() => {
                  window.location.href = `${videos}/${dt[getIndex() + 1]!
                    .link!}`
                }}
              />
            ) : (
              <PostArrow
                title={dt![0].title}
                isLeft={false}
                action={() => {
                  window.location.href = `${videos}/${dt![0].link!}`
                }}
              />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
})

export default VideoIntro

export const PostArrow = observer(
  ({
    title,
    isLeft,
    action,
  }: {
    isLeft: boolean
    title: string | undefined
    action: () => void
  }) => {
    return (
      <div className="post-content__bottom-col" onClick={action}>
        {isLeft ? (
          <>
            <div
              className={classNames(
                'post-content__bottom-arrow',
                isLeft ? 'left' : 'right',
              )}
            >
              <ArrowRight />
            </div>
            <div
              className={classNames(
                'post-content__bottom-block',
                isLeft ? 'left' : 'right',
              )}
            >
              <div className="post-content__bottom-text">
                {isLeft ? 'Previous' : 'Next'}
              </div>
              <div className="post-content__bottom-title">{title}</div>
            </div>
          </>
        ) : (
          <>
            <div className="post-content__bottom-block right">
              <div className="post-content__bottom-text">Next</div>
              <div className="post-content__bottom-title">{title}</div>
            </div>
            <div className="post-content__bottom-arrow right">
              <ArrowRight />
            </div>
          </>
        )}
      </div>
    )
  },
)
