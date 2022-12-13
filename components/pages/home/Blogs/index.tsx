import Arrow from '../../../../assets/caret-right.svg'
import { outputDate } from '../../../../methods/output'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import Vector from '../../../../assets/Vector 7.svg'
import { Post } from '../../../../api/mocks/posts'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import CustomSlider from '../../../common/CustomSlider'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import BlogItem from '../../../common/BlogItem'

const Blogs = observer(
  ({ dt, arr }: { dt: any; arr: Array<Post> | null | undefined }) => {
    const { width } = useWindowDimensions()
    const { scrollY } = useWindowScroll()
    useEffect(() => {
      if (width <= 480) {
        const container = document.querySelector('.blogs')
        const vect = document.querySelector(`.blogs__vector`)
        const smooth = document.querySelector('.smooth')
        if (!vect) return
        var bodyRect = smooth!.getBoundingClientRect(),
          elemRect = vect!.getBoundingClientRect(),
          contRect = container!.getBoundingClientRect(),
          offset = contRect.top - bodyRect.top,
          offsetBottom = contRect.top + contRect.height / 2

        if (scrollY >= offset && scrollY <= offsetBottom) {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0)`
        }
      }
    }, [arr, scrollY, width])

    if (!arr || !arr.length) return <></>
    const posts = arr.slice(0, arr.length)

    const links = GlobalState.links
    let blog = ''
    if (links) {
      blog = links.find((l: any) => l.id == 272).link
    }

    return (
      <section className="blogs">
        <Vector className="blogs__vector" />
        <div className="blogs__container">
          <div className="blogs__top">
            <div
              className="blogs__title"
              dangerouslySetInnerHTML={{ __html: dt.title }}
            ></div>
            {width > 1024 && (
              <a href={blog} className="button black-border p18p40">
                <div className="button__text">
                  {dt.buttonTitle} <Arrow />
                </div>
              </a>
            )}
          </div>
          <CheckerItemsInsideCont
            container=".blogs"
            child={'.blogs__item'}
            slider={
              <div className="blogs__list slider-blogs">
                <CustomSlider
                  autoPlay
                  countItems={dt.length}
                  block="videos"
                  slidesToShow={width >= 900 ? 2 : 1}
                  slidesToScroll={width >= 900 ? 2 : 1}
                >
                  {posts
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                    )
                    .slice(0, 20)
                    .map((b: any, i: number) => (
                      <BlogItem b={b} key={i} arr={arr} />
                    ))}
                </CustomSlider>
              </div>
            }
            list={
              <div className="blogs__list">
                {posts
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
                  )
                  .slice(0, 20)
                  .map((b: any, i: number) => (
                    <BlogItem b={b} key={i} arr={arr} />
                  ))}
              </div>
            }
            countOfChidlren={dt.length}
          />
          {width <= 1024 && (
            <a href={blog} className="button black-border p18p40">
              <div className="button__text">
                {dt.buttonTitle} <Arrow />
              </div>
            </a>
          )}
        </div>
      </section>
    )
  },
)

export default Blogs
