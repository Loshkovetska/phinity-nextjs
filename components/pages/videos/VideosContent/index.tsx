import { observer } from 'mobx-react'
import Vector from '../../../../assets/home-area.svg'
import Triangle from '../../../../assets/triangle.svg'

import PageLinks from '../../../common/PageLinks'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const VideosContent = observer(({ videosC }: { videosC: any }) => {
  const [link, setLink] = useState('')
  const { width } = useWindowDimensions()

  useEffect(() => {
    if (!videosC) return
    document.querySelector('.videos-content')?.classList.add('animated')

    setTimeout(() => {
      document
        .querySelector('.videos-content__title')
        ?.classList.add('animated')
      document.querySelector('.videos-content__text')?.classList.add('animated')
    }, 500)

    setTimeout(() => {
      document.querySelector('.videos-content__anim')?.classList.add('animated')
      const items = document.querySelectorAll('.videos-content__item')
      items.forEach((i, id) => {
        i?.classList.add('animated')
        ;(i as HTMLElement).style.transitionDelay = `${id / 6}s`
      })
    }, 2000)
  }, [videosC])

  useEffect(() => {
    if (!videosC) return

    if (!videosC.list) return
    setTimeout(() => {
      const container = document.querySelector('.videos-content')
      const vect = document.querySelector('.videos-content__vector')
      const smooth = document.querySelector('.smooth')

      if (!smooth || !vect) return
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom = elemRect.bottom - elemRect.height / 2

      window.addEventListener('scroll', (args: any) => {
        if (window.scrollY >= offset && window.scrollY <= offsetBottom) {
          requestAnimationFrame(() => {
            if (window.innerWidth > 480) {
              ;(vect as HTMLElement).style.transform = `translate3d(0, ${
                window.scrollY - offset
              }px, 0)`
            } else {
              ;(vect as HTMLElement).style.transform = `translate3d(0, ${
                window.scrollY - offset
              }px, 0) scale(0.7)`
            }
          })
        }
      })
    }, 1000)
  }, [videosC])

  useEffect(() => {
    if (!videos) return
    if (window.innerWidth > 1120) {
      const cols = document.querySelectorAll('.videos-content__col')
      const images = document.querySelectorAll('.videos-content__img img')

      if (!cols || !images) return

      cols.forEach((c, i) => {
        const observer = new window.IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              images.forEach((c) => {
                c.classList.remove('active')
              })
              images[i].classList.add('active')
            }
          },
          {
            root: null,
            threshold: 0.8,
          },
        )

        observer.observe(c)
      })
    }
  }, [videosC])
  useEffect(() => {
    if (!videos) return
    if (window.innerWidth <= 768) return
    setTimeout(() => {
      const container = document.querySelector('.videos-content__anim')
      const vect = document.querySelector('.videos-content__img')
      const images = document.querySelectorAll('.videos-content__img img')
      const scrollArea = document.querySelector('.videos-content__scroll')
      const smooth = document.querySelector('.smooth')

      if (!smooth || !vect || !scrollArea || !images) return

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        scrollRect = scrollArea!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom = elemRect.bottom

      window.addEventListener('scroll', (args: any) => {
        if (window.scrollY < offset) {
          ;(scrollArea as HTMLElement).classList.add('visible')
          ;(vect as HTMLElement).style.top = `${
            (window.innerHeight - images[0].getBoundingClientRect().height) / 2
          }px`
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            ((window.innerHeight - images[0].getBoundingClientRect().height) /
              2) *
            -1
          }px, 0)`
        }
        if (
          window.scrollY >=
            offset -
              (window.innerHeight - images[0].getBoundingClientRect().height) /
                2 &&
          window.scrollY <=
            offsetBottom -
              images[0].getBoundingClientRect().height -
              (window.innerHeight - images[0].getBoundingClientRect().height) /
                2
        ) {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            window.scrollY - offset
          }px, 0)`

          scrollArea.classList.add('visible')
        }
      })
    }, 1000)
  }, [videosC])

  const { links } = useContentState()
  let videos = '',
    main = ''
  if (links) {
    videos = links.find((l: any) => l.id == 644)?.link
    main = links.find((l: any) => l.id == 2)?.link
  }
  return (
    <section className="videos-content">
      <Vector className="videos-content__vector" />
      <PageLinks
        links={[
          { title: videosC?.mainPageTitle, link: main },
          { title: videosC?.pageTitle, link: videos },
        ]}
      />
      <div className="videos-content__container">
        <div style={{ overflow: 'hidden' }}>
          <h1
            className="videos-content__title"
            dangerouslySetInnerHTML={{
              __html: videosC?.content.title,
            }}
          ></h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="videos-content__text"
            dangerouslySetInnerHTML={{
              __html: videosC?.content.text,
            }}
          ></div>
        </div>
        {width <= 1120 ? (
          <div className="videos-content__list">
            {videosC?.list?.map((v: any, i: number) => (
              <div className="videos-content__item" key={i}>
                <a
                  href={`${videos}/${v.link}`}
                  className="videos-content__poster"
                >
                  <img src={v.poster.replaceAll('admin.', '')} alt={v?.alt} loading="lazy" />
                </a>
                <div className="videos-content__col">
                  <div className="videos-content__col-title">{v.title}</div>
                  <div className="videos-content__col-text">{v.text}</div>
                  <a className="about__video" href={`${videos}/${v.link}`}>
                    <div className="about__video-play">
                      <Triangle />
                    </div>
                    <span>Watch video</span>
                    <div className="about__video-cont"></div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="videos-content__anim">
            <div className="videos-content__anim-img">
              <a className="videos-content__img" href={link}>
                {videosC?.list?.map((vi: any, id: number) => (
                  <img
                    src={vi.poster.replaceAll('admin.', '')}
                    alt={vi?.title}
                    key={id}
                    className={classNames(!id && 'active')}
                    onMouseEnter={() => {
                      setLink(`${videos}/${vi.link}`)
                    }}
                  />
                ))}
              </a>
            </div>
            <div className="videos-content__scroll">
              {videosC?.list?.map((v: any, i: number) => (
                <div className="videos-content__col" key={i}>
                  <div className="videos-content__col-title">{v.title}</div>
                  <div className="videos-content__col-text">{v.text}</div>
                  <a href={`${videos}/${v.link}`} className="about__video">
                    <div className="about__video-play">
                      <Triangle />
                    </div>
                    <span>Watch video</span>
                    <div className="about__video-cont"></div>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  )
})

export default VideosContent
