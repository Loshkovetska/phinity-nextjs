import { observer } from 'mobx-react'
import Arrow from '../../../../assets/caret-right.svg'
import GlobalState from '../../../../stores/GlobalState'
import { useEffect, useRef, useState } from 'react'
import Video from '../../../../assets/video.svg'
import { Video as VideoType } from '../../../../api/mocks/videos'
import RightClickCatcher from '../../../common/RightClickCatcher'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import CustomSlider from '../../../common/CustomSlider'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import VideoPreload from '../../../common/VideoPreload'
import ImageComponent from '../../../common/ImageComponent'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import Link from 'next/link'

const Videos = observer(
  ({ arr, dt }: { arr: Array<VideoType> | null; dt: any }) => {
    const { width } = useWindowDimensions()
    const { scrollY } = useWindowScroll()
    useEffect(() => {
      const smooth = document.querySelector('.smooth')
      const videos = smooth!.querySelector('.videos')
      const title = smooth!.querySelector('.videos__title')
      const text = smooth!.querySelector('.videos__text')
      const items = smooth!.querySelectorAll('.videos__item')

      if (!smooth || !videos) return

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = videos!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top

      if (scrollY > offset - 1000) {
        videos?.classList.add('animated')
        const btn = smooth!.querySelector('.videos .button')
        title?.classList.add('animated')
        text?.classList.add('animated')

        if (window.innerWidth > 768) {
          btn?.classList.add('animated')
        }

        items.forEach((i, id) => {
          i?.classList.add('animated')
          ;(i as HTMLDivElement).style.transitionDelay = `${id / 8 + 0.5}s`
        })
      }

      if (width <= 768) {
        const btn = smooth!.querySelector('.videos .button')
        if (btn) {
          elemRect = btn!.getBoundingClientRect()
          offset = elemRect.top - bodyRect.top
          if (scrollY > offset - 700) {
            btn?.classList.add('animated')
          }
        }
      }
    }, [arr, scrollY, width])

    if (!arr || !arr.length) return <></>

    const { links: linksL } = useContentState()
    let videos = ''
    if (linksL) {
      videos = linksL.find((l: any) => l.id == 644)?.link
    }

    return (
      <section className="videos">
        <div className="videos__top">
          <div className="videos__col">
            <div style={{ overflow: 'hidden' }}>
              <div
                className="videos__title"
                dangerouslySetInnerHTML={{
                  __html: dt.title,
                }}
              ></div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                className="videos__text"
                dangerouslySetInnerHTML={{
                  __html: dt.text,
                }}
              ></div>
            </div>
          </div>
          {width > 768 && (
            <a className="button p18p40 black-border" href={videos}>
              <div className="button__text">
                <>
                  {dt.buttonTitle} <Arrow />
                </>
              </div>
            </a>
          )}
        </div>
        <CheckerItemsInsideCont
          container=".videos"
          child={'.videos__item'}
          slider={
            <div className="videos__list slider-videos">
              <CustomSlider
                autoPlay
                countItems={dt.length}
                block="videos"
                slidesToShow={
                  width >= 1440
                    ? 3
                    : width <= 1024 && width > 768
                    ? 2
                    : width <= 768
                    ? 1
                    : 3
                }
                slidesToScroll={
                  width >= 1440
                    ? 3
                    : width <= 1024 && width > 768
                    ? 2
                    : width <= 768
                    ? 1
                    : 3
                }
              >
                {arr?.slice(0, 5)?.map((v, ind) => (
                  <VideoComponent item={v} key={ind} />
                ))}
              </CustomSlider>
            </div>
          }
          list={
            <div className="videos__list">
              {arr?.slice(0, 5)?.map((v, ind) => (
                <VideoComponent item={v} key={ind} />
              ))}
            </div>
          }
          countOfChidlren={dt.length}
        />

        {width <= 768 && (
          <a className="button p18p40 black-border" href={videos}>
            <div className="button__text">
              <>
                {dt.buttonTitle} <Arrow />
              </>
            </div>
          </a>
        )}
      </section>
    )
  },
)

export default Videos

export const VideoComponent = observer(({ item }: { item: any }) => {
  const { links } = useContentState()
  let videos = ''
  if (links) {
    videos = links.find((l: any) => l.id == 644)?.link
  }

  return (
    <Link href={`${videos}/${item.link}`} className="videos__item">
      <div className="videos__item-img">
        <ImageComponent src={item.poster} alt={item.alt} />
        <RightClickCatcher
          children={
            <VideoPreload
              classStr={`#video${item.id}`}
              src={item.src}
              poster={item.poster}
            />
          }
        />
        <Video className="videos__item-icon" />
      </div>
      <div
        className="videos__item-title"
        dangerouslySetInnerHTML={{ __html: item.title }}
      ></div>
      <div
        className="videos__item-desc"
        dangerouslySetInnerHTML={{ __html: item.text }}
      ></div>
    </Link>
  )
})
