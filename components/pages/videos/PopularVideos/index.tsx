import { observer } from 'mobx-react'
import { useEffect } from 'react'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import CustomSlider from '../../../common/CustomSlider'
import { VideoComponent } from '../../blog/Videos'
import Arrow from '../../../../assets/caret-right.svg'
import GlobalState from '../../../../stores/GlobalState'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const PopularVideos = observer(({ content }: { content: any }) => {
  const { width } = useWindowDimensions()
  const dt = useContentState()
  useEffect(() => {
    if (!dt.popvideos?.length) return

    if (dt.popvideos.length > 0) {
      setTimeout(() => {
        const items = document.querySelectorAll('.popular-videos .videos__item')
        if (!items) return

        items.forEach((element) => {
          element.classList.add('animated')
        })
      }, 1000)
    }
  }, [dt.popvideos])

  const links = GlobalState.links
  let videos = ''
  if (links) {
    videos = links.find((l: any) => l.id == 644).link
  }

  if (!dt.popvideos?.length) return <></>
  return (
    <section className="popular-videos">
      <div className="popular-videos__top">
        <div>
          <div
            className="popular-videos__title"
            dangerouslySetInnerHTML={{ __html: content.title }}
          ></div>
          <div style={{ overflow: 'hidden' }}>
            <div
              className="popular-videos__text"
              dangerouslySetInnerHTML={{ __html: content.text }}
            ></div>
          </div>
        </div>
        <a href={videos} className="button p18p40 black-border">
          <div className="button__text">
            {' '}
            <>
              {content.buttonTitle} <Arrow />
            </>
          </div>
        </a>
      </div>

      <CheckerItemsInsideCont
        container=".popular-videos"
        child=".popular-videos .videos__item"
        slider={
          <div className="popular-videos__list">
            <CustomSlider
              countItems={dt.popvideos?.length}
              slidesToShow={width > 900 ? 3 : width > 660 ? 2 : 1}
              slidesToScroll={width > 900 ? 2 : 1}
              autoPlay
            >
              {dt.popvideos?.map((vi: any, i: number) => (
                <VideoComponent item={vi} key={i} />
              ))}
            </CustomSlider>
          </div>
        }
        countOfChidlren={dt.popvideos?.length || 0}
        list={
          <div className="popular-videos__list popular-videos__inline">
            {dt.popvideos?.map((vi: any, i: number) => (
              <VideoComponent item={vi} key={i} />
            ))}
          </div>
        }
      />
      {width <= 1120 && (
        <a href={videos} className="button p18p40 black-border">
          <div className="button__text">
            {' '}
            <>
              {content.buttonTitle} <Arrow />
            </>
          </div>
        </a>
      )}
    </section>
  )
})

export default PopularVideos
