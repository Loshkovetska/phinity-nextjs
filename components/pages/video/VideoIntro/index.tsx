import { observer } from 'mobx-react'
import PageLinks from '../../../common/PageLinks'
import Vector from '../../../../assets/home-area.svg'
import Play from '../../../../assets/video/Play.svg'
import ArrowRight from '../../../../assets/ex/arrowRight.svg'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import RightClickCatcher from '../../../common/RightClickCatcher'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import DateTime from '../../../common/DateTime'
const VideoIntro = observer(({ videoCont }: { videoCont: any }) => {
  const ref = useRef<any>(null)
  const [play, setPlay] = useState(false)
  const { width, path } = useWindowDimensions()
  const content = useContentState()
  const { scrollY } = useWindowScroll()

  const [videoSrc, setSrc] = useState('')
  const requestRef = useRef<any>(false)

  const copy = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
    }
  }

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

  const links = content.links
  if (links) {
    videos = links.find((l: any) => l.id == 644)?.link
    main = links.find((l: any) => l.id == 2)?.link
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
                    {video?.src.includes('phinitytherapy.com') ? (
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

              {video?.src.includes('phinitytherapy.com') && (
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
                &bull; <DateTime type="short" date={video!.date} />
              </p>
            </div>

            <div className="video-intro__social">
              <div className="video-intro__social-title">
                {videoCont?.shareTitle || ''}
              </div>
              <div className="video-intro__social-list">
                {videoCont?.shareList?.map((b: any, i: number) => (
                  <a href={b.link + path} target="__blank" key={i}>
                    <img src={b.icon.replaceAll('admin.', '')} alt={b.alt} />
                  </a>
                ))}
                <img
                  src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1647_68132)'%3E%3Ccircle cx='16' cy='16' r='12' fill='%230033CC' /%3E%3Cpath d='M15.5584 11.5806L17.1052 10.0338C17.4244 9.71439 17.8033 9.46095 18.2204 9.288C18.6376 9.11505 19.0847 9.02598 19.5362 9.02588C19.9878 9.02577 20.4349 9.11464 20.8521 9.28739C21.2693 9.46014 21.6484 9.7134 21.9677 10.0327C22.287 10.352 22.5403 10.7311 22.713 11.1483C22.8858 11.5655 22.9746 12.0126 22.9745 12.4642C22.9744 12.9157 22.8854 13.3628 22.7124 13.78C22.5395 14.1971 22.286 14.576 21.9666 14.8952L19.7569 17.1049C19.4377 17.4241 19.0587 17.6773 18.6417 17.8501C18.2246 18.0228 17.7776 18.1117 17.3262 18.1117C16.8748 18.1117 16.4278 18.0228 16.0107 17.8501C15.5937 17.6773 15.2147 17.4241 14.8955 17.1049' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Cpath d='M16.4415 20.4195L14.8947 21.9663C14.5756 22.2858 14.1966 22.5392 13.7795 22.7121C13.3624 22.8851 12.9152 22.9742 12.4637 22.9743C12.0121 22.9744 11.565 22.8855 11.1478 22.7128C10.7306 22.54 10.3515 22.2867 10.0322 21.9674C9.71291 21.6482 9.45966 21.2691 9.2869 20.8519C9.11415 20.4347 9.02529 19.9875 9.02539 19.536C9.0255 19.0844 9.11457 18.6373 9.28751 18.2202C9.46046 17.8031 9.7139 17.4241 10.0333 17.105L12.2431 14.8952C12.5623 14.576 12.9412 14.3228 13.3583 14.1501C13.7753 13.9773 14.2223 13.8884 14.6737 13.8884C15.1252 13.8884 15.5721 13.9773 15.9892 14.1501C16.4063 14.3228 16.7852 14.576 17.1044 14.8952' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Ccircle cx='16' cy='16' r='13' stroke='%230033CC' stroke-width='6' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1647_68132'%3E%3Crect width='32' height='32' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                  onClick={copy}
                  style={{
                    width: width > 900 ? 32 : 24,
                    height: width > 900 ? 32 : 24,
                    cursor: 'pointer',
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div
            className="video-intro__text"
            dangerouslySetInnerHTML={{ __html: video?.text }}
          ></div>
          {video?.author && (
            <div className="post-content__block">
              <div className="post-content__block-img">
                <img
                  src={video?.author?.src.replaceAll('admin.', '') || ''}
                  alt={video?.author?.alt || ''}
                />
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
                <img src={b.icon.replaceAll('admin.', '')} alt={video.title} />
              </a>
            ))}
            <img
              src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1647_68132)'%3E%3Ccircle cx='16' cy='16' r='12' fill='%230033CC' /%3E%3Cpath d='M15.5584 11.5806L17.1052 10.0338C17.4244 9.71439 17.8033 9.46095 18.2204 9.288C18.6376 9.11505 19.0847 9.02598 19.5362 9.02588C19.9878 9.02577 20.4349 9.11464 20.8521 9.28739C21.2693 9.46014 21.6484 9.7134 21.9677 10.0327C22.287 10.352 22.5403 10.7311 22.713 11.1483C22.8858 11.5655 22.9746 12.0126 22.9745 12.4642C22.9744 12.9157 22.8854 13.3628 22.7124 13.78C22.5395 14.1971 22.286 14.576 21.9666 14.8952L19.7569 17.1049C19.4377 17.4241 19.0587 17.6773 18.6417 17.8501C18.2246 18.0228 17.7776 18.1117 17.3262 18.1117C16.8748 18.1117 16.4278 18.0228 16.0107 17.8501C15.5937 17.6773 15.2147 17.4241 14.8955 17.1049' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Cpath d='M16.4415 20.4195L14.8947 21.9663C14.5756 22.2858 14.1966 22.5392 13.7795 22.7121C13.3624 22.8851 12.9152 22.9742 12.4637 22.9743C12.0121 22.9744 11.565 22.8855 11.1478 22.7128C10.7306 22.54 10.3515 22.2867 10.0322 21.9674C9.71291 21.6482 9.45966 21.2691 9.2869 20.8519C9.11415 20.4347 9.02529 19.9875 9.02539 19.536C9.0255 19.0844 9.11457 18.6373 9.28751 18.2202C9.46046 17.8031 9.7139 17.4241 10.0333 17.105L12.2431 14.8952C12.5623 14.576 12.9412 14.3228 13.3583 14.1501C13.7753 13.9773 14.2223 13.8884 14.6737 13.8884C15.1252 13.8884 15.5721 13.9773 15.9892 14.1501C16.4063 14.3228 16.7852 14.576 17.1044 14.8952' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Ccircle cx='16' cy='16' r='13' stroke='%230033CC' stroke-width='6' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1647_68132'%3E%3Crect width='32' height='32' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
              onClick={copy}
              style={{
                width: width > 900 ? 32 : 24,
                height: width > 900 ? 32 : 24,
                cursor: 'pointer',
              }}
              loading="lazy"
            />
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
