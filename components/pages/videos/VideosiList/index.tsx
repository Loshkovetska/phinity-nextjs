import { observer } from 'mobx-react'
import Button from '../../../common/Button'
import DBStore from '../../../../stores/DBStore'
import { VideoComponent } from '../../blog/Videos'
import { useEffect, useMemo, useState } from 'react'
import Close from '../../../../assets/close.svg'
import classNames from 'classnames'
import { Video } from '../../../../api/mocks/videos'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import Pagination from '../../../common/Pagination'

const VideosList = observer(({ videos }: { videos: any }) => {
  const [cat, setCat] = useState('')
  const [showCats, setShowCats] = useState(false)
  const [showFilter, setFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItems, setCurrentItems] = useState<Array<Video>>(Array())
  const reset = () => {
    setCat('')
    setCurrentPage(1)
  }

  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const content = useContentState()

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

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 6
    const lastPageIndex = firstPageIndex + 6
    return currentItems?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, currentItems])

  useEffect(() => {
    if (!DBStore.videos) return
    if (!cat.length) {
      setCurrentItems(DBStore.videos)
    }

    if (cat.length) {
      setCurrentItems([
        ...DBStore.videos?.filter(
          (p: Video) =>
            p?.category?.toLocaleLowerCase() === cat.toLocaleLowerCase(),
        ),
      ])
    }

    setTimeout(() => {
      document
        .querySelectorAll('.blog-content .blogs__item')
        .forEach((b) => b.classList.add('animated'))
    }, 300)
  }, [cat, DBStore.videos, currentPage])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const items = smooth!.querySelectorAll('.videos-list .videos__item')

    if (!items) return
    setTimeout(() => {
      Array.from(items).forEach((i: any, id: number) => {
        i?.classList.add('animated')
        ;(i as HTMLDivElement).style.transitionDelay = `${id / 6 + 0.5}s`
      })
    }, 300)
  }, [cat, currentTableData])

  

  return (
    <section className="videos-list">
      <div className="videos-list__container">
        <div className="videos-list__left">
          <div className="videos-list__top"></div>
          <div className="videos-list__list">
            {currentTableData?.map((vi: any, i: number) => (
              <VideoComponent item={vi} key={i} />
            ))}
          </div>

          {/* {showBottom && (
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
        )} */}
        </div>
        <div
          className={classNames('blog-content__aside', showFilter && 'show')}
        >
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
                    setCurrentPage(1)

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
              {!showCats ? 'See All' : 'Hide'}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={(value) => {
          setCurrentPage(value)
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }}
        data={currentItems as any}
        itemsPerPage={6}
      />
    </section>
  )
})

export default VideosList
