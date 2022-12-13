import CustomSlider from '../../../common/CustomSlider'
import Star from '../../../../assets/ic_star.svg'
import Check from '../../../../assets/check.svg'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import DBStore from '../../../../stores/DBStore'
import ArrowSquareOut from '../../../../assets/ex/ArrowSquareOut.svg'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import { useRouter } from 'next/router'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const Reviews = observer(({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()

  const getStars = (count: number) => {
    return new Array(Math.ceil(count)).fill(0, 0)
  }

  const { pathname } = useRouter()

  useEffect(() => {
    if (pathname.includes('issue') && !pathname.includes('issues')) {
      const smooth = document.querySelector('.smooth')
      if (!smooth) return
      const all = smooth!.querySelectorAll('.reviews *')
      all.forEach((a) => a.classList.add('animated'))
    }
  }, [pathname])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const issues = smooth!.querySelector('.reviews')
    const title = smooth!.querySelector('.reviews__title')
    const text = smooth!.querySelector('.reviews__text')
    const items = smooth!.querySelectorAll('.reviews__item')
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = issues!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top
    if (scrollY > offset - 1000) {
      issues?.classList.add('animated')
    }
    if (scrollY > offset - 700) {
      title?.classList.add('animated')
      text?.classList.add('animated')

      if (width > 768) {
        items.forEach((i, id) => {
          setTimeout(() => {
            i?.classList.add('animated')
          }, (id / 6 + 0.5) * 100)
        })
      } else {
        items.forEach((i, id) => {
          setTimeout(() => {
            i?.classList.add('animated')
          }, (id / 6 + 0.5) * 100)
        })
      }
      setTimeout(() => {
        document
          .querySelector('.reviews .slick-dots')
          ?.classList.add('animated')
      }, 1000)
    }
  }, [scrollY, width])

  const { reviews }: any = useContentState()

  return (
    <section className="reviews">
      <div style={{ overflow: 'hidden' }}>
        <div
          className="reviews__title"
          dangerouslySetInnerHTML={{ __html: dt?.title }}
        ></div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div
          className="reviews__text"
          dangerouslySetInnerHTML={{ __html: dt?.text }}
        ></div>
      </div>
      <CheckerItemsInsideCont
        countOfChidlren={reviews?.length || 0}
        child=".reviews__item"
        container=".reviews"
        slider={
          <div className="reviews__list">
            <CustomSlider
              autoPlay
              variableWidth={true}
              countItems={reviews?.length || 0}
              slidesToShow={width >= 1440 ? 3 : width < 1024 ? 1 : 2}
              slidesToScroll={width >= 1440 ? 3 : width < 1024 ? 1 : 2}
            >
              {reviews?.map((i: any, id: number) => (
                <a
                  className="reviews__item"
                  key={id}
                  href="https://www.reviews.co.uk/company-reviews/store/phinity-therapy?utm_source=phinity-therapy&utm_medium=widget&utm_campaign=text-banner"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <div className="reviews__item-title">{i.title}</div>
                  <div className="reviews__item-sub">{i.sub}</div>
                  <div className="reviews__item-rating">
                    {getStars(i.rating).map((s, si) => (
                      <Star key={si} />
                    ))}
                  </div>
                  <div
                    className="reviews__item-text"
                    dangerouslySetInnerHTML={{ __html: i.text }}
                  ></div>
                  <div
                    className="reviews__item-read"
                    onClick={() =>
                      window.open(
                        'https://www.reviews.co.uk/company-reviews/store/phinity-therapy?utm_source=phinity-therapy&utm_medium=widget&utm_campaign=text-banner',
                        '__blank',
                      )
                    }
                  >
                    Read More <ArrowSquareOut />
                  </div>
                  <div className="reviews__item-status">
                    <div>
                      <Check />
                    </div>
                    Verified
                  </div>
                </a>
              ))}
            </CustomSlider>
          </div>
        }
        list={
          <div className="reviews__list reviews-list">
            {reviews?.map((i: any, id: number) => (
              <a
                className="reviews__item"
                key={id}
                href="https://www.reviews.co.uk/company-reviews/store/phinity-therapy?utm_source=phinity-therapy&utm_medium=widget&utm_campaign=text-banner"
                target={'_blank'}
                rel="noreferrer"
              >
                <div className="reviews__item-title">{i.title}</div>
                <div className="reviews__item-sub">{i.sub}</div>
                <div className="reviews__item-rating">
                  {getStars(i.rating).map((s, si) => (
                    <Star key={si} />
                  ))}
                </div>
                <div
                  className="reviews__item-text"
                  dangerouslySetInnerHTML={{ __html: i.text }}
                ></div>
                <div
                  className="reviews__item-read"
                  onClick={() =>
                    window.open(
                      'https://www.reviews.co.uk/company-reviews/store/phinity-therapy?utm_source=phinity-therapy&utm_medium=widget&utm_campaign=text-banner',
                      '__blank',
                    )
                  }
                >
                  Read More <ArrowSquareOut />
                </div>
                <div className="reviews__item-status">
                  <div>
                    <Check />
                  </div>
                  Verified
                </div>
              </a>
            ))}
          </div>
        }
      />
    </section>
  )
})

export default Reviews
