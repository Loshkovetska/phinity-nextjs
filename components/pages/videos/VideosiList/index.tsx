import { observer } from 'mobx-react'
import Button from '../../../common/Button'
import DBStore from '../../../../stores/DBStore'
import { VideoComponent } from '../../blog/Videos'
import { useEffect, useState } from 'react'
import Close from '../../../../assets/close.svg'
import classNames from 'classnames'
import { Video } from '../../../../api/mocks/videos'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'

const VideosList = observer(({ videos }: { videos: any }) => {
  const [cat, setCat] = useState('')
  const [showCats, setShowCats] = useState(false)
  const [showFilter, setFilter] = useState(false)
  const [show, setShow] = useState(1)
  const [showBottom, setShowBottom] = useState(false)
  const [currentItems, setItems] = useState<Array<Video>>(Array())
  const reset = () => {
    setCat('')
    setShow(1)
  }

  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const content = useContentState()

  useEffect(() => {
    setTimeout(() => {
      setShowBottom(true)
    }, 1000)
  }, [])
  useEffect(() => {
    if (showFilter) {
      document.querySelector('body')?.classList.add('filter')
      window.scrollTo(0, 0)
    } else {
      document.querySelector('body')?.classList.remove('filter')
    }
  }, [showFilter])

  const getCount = (cat: string) => {
    return DBStore.videos?.filter(
      (p) => p.category?.toLocaleLowerCase() == cat.toLocaleLowerCase(),
    ).length
  }

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const videos = smooth!.querySelector('.videos-list')
    const title = smooth!.querySelector('.videos-list__top')
    const items = smooth!.querySelectorAll('.videos-list .videos__item')

    const itemsAside = smooth!.querySelectorAll('.blog-content__aside *')

    setTimeout(() => {
      itemsAside.forEach((i, id) => {
        setTimeout(() => {
          i?.classList.add('animated')
        }, 700)
      })
    }, 1000)

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = videos!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top

    if (scrollY > offset - 2000) {
      videos?.classList.add('animated')
      title?.classList.add('animated')
    }

    if (width <= 768) {
      const btn = smooth!.querySelector('.videos .button')
      if (btn) {
        elemRect = btn!.getBoundingClientRect()
        offset = elemRect.top - bodyRect.top
        if (scrollY > offset - 500) {
          btn?.classList.add('animated')
        }
      }
    }
  }, [DBStore.videos, width, scrollY])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const items = smooth!.querySelectorAll('.videos-list .videos__item')

    if (!items) return
    setTimeout(() => {
      Array.from(items)
        .slice(show * 6 - 6, show * 6 + 1)
        .forEach((i: any, id: number) => {
          i?.classList.add('animated')
          ;(i as HTMLDivElement).style.transitionDelay = `${id / 6 + 0.5}s`
        })
    }, 300)
  }, [show, cat, currentItems])

  useEffect(() => {
    if (!DBStore.videos) return
    if (cat.length) {
      const uts = DBStore.videos.filter((f) => f.category == cat)
      setItems(uts)
    } else setItems(DBStore.videos)
  }, [cat, DBStore.videos])

  return (
    <section className="videos-list">
      <div className="videos-list__left">
        <div className="videos-list__top"></div>
        <div className="videos-list__list">
          {currentItems?.slice(0, show * 6)?.map((vi: any, i: number) => (
            <VideoComponent item={vi} key={i} />
          ))}
        </div>
        {showBottom && (
          <div className="videos-list__bottom">
            <div className="videos-list__shown">
              Showing{' '}
              {show * 6 > currentItems?.length
                ? currentItems?.length
                : show * 6}{' '}
              of {currentItems?.length}
            </div>
            {show * 6 < currentItems.length && (
              <Button
                text={'Load more'}
                click={() => {
                  setShow(show + 1)
                }}
                classname="black-border p11p24 f14"
              />
            )}
          </div>
        )}
      </div>
      <div className={classNames('blog-content__aside', showFilter && 'show')}>
        <Close
          onClick={() => setFilter(false)}
          className="blog-content__aside-close"
        />
        <span className="new-videos__subtitle">
          {DBStore.videos?.length}{' '}
          {!DBStore.videos?.length || DBStore.videos?.length > 1
            ? 'videos'
            : 'video'}
        </span>
        <div className="blog-content__aside-title cat">
          {content?.videosC.categoryTitle}
          <span onClick={reset}> Clear</span>
        </div>
        <div className="blog-content__aside-list">
          {content.filters?.list
            ?.slice(0, showCats ? content.filters?.list?.length : 7)
            .map((c: any, i: number) => (
              <div
                className={classNames(
                  'blog-content__aside-text',
                  cat == c && 'active',
                )}
                key={i}
                onClick={() => {
                  setCat(c)
                  setShow(1)

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                  setFilter(false)
                }}
              >
                {c} <span>({getCount(c)})</span>
              </div>
            ))}
        </div>
        {content.filters.list?.length > 7 ? (
          <div
            className="blog-content__aside-all"
            onClick={() => {
              if (showCats) {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }

              setShowCats(!showCats)
            }}
          >
            {!showCats ? 'See all' : 'Hide'}
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
})

export default VideosList
