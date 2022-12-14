import './Issues.module.scss'
import Arrow from '../../../../assets/caret-right.svg'
import ArrowRight from '../../../../assets/ArrowRight.svg'
import Vector1 from '../../../../assets/issues/Vector 10.svg'
import Vector3 from '../../../../assets/issues/Vector 11 (1).svg'
import Vector4 from '../../../../assets/issues/Vector 11 (2).svg'
import Vector2 from '../../../../assets/issues/Vector 11.svg'
import Vector5 from '../../../../assets/issues/Vector 12.svg'
import Vector6 from '../../../../assets/issues/Vector 13.svg'
import VectorScroll from '../../../../assets/Vector 5.svg'
import VectorServiceScroll from '../../../../assets/Vector 4.svg'
import { useEffect, useState } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { Issue } from '../../../../api/mocks/issues'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const Vector = ({ id }: { id: number }) => {
  const vectors = [
    <Vector1 className="issues__item-vector" key={0} />,
    <Vector2 className="issues__item-vector" key={1} />,
    <Vector3 className="issues__item-vector" key={2} />,
    <Vector4 className="issues__item-vector" key={3} />,
    <Vector5 className="issues__item-vector" key={4} />,
    <Vector6 className="issues__item-vector" key={5} />,
  ]
  return vectors[
    id >= vectors.length ? Math.floor(id / vectors.length) - 1 : id
  ]
}

const Issues = observer(
  ({
    classname,
    dt,
    arr,
  }: {
    classname?: string
    dt: any
    arr: Array<Issue> | null | undefined
  }) => {
    const { width } = useWindowDimensions()
    const { scrollY } = useWindowScroll()
    useEffect(() => {
      if (width <= 480 && !classname?.includes('service-page')) {
        const container = document.querySelector('.issues')
        const vect = document.querySelector('.issues__vector')
        const smooth = document.querySelector('.smooth')
        var bodyRect = smooth!.getBoundingClientRect(),
          elemRect = vect!.getBoundingClientRect(),
          contRect = container!.getBoundingClientRect(),
          offset = contRect.top - bodyRect.top,
          offsetBottom = contRect.bottom - contRect.height / 2

        if (scrollY >= offset && scrollY <= offsetBottom) {
          requestAnimationFrame(() => {
            ;(vect as HTMLElement).style.transform = `translate3d(0, ${
              scrollY - offset
            }px, 0)`
          })
        }
      }
      if (width > 480 && classname?.includes('service-page')) {
        const container = document.querySelector('.issues.service-page')
        const vect = document.querySelector('.issues__vector')
        const smooth = document.querySelector('.smooth')
        var bodyRect = smooth!.getBoundingClientRect(),
          elemRect = vect!.getBoundingClientRect(),
          contRect = container!.getBoundingClientRect(),
          offset = contRect.top - bodyRect.top,
          offsetBottom = contRect.bottom - contRect.height / 2

        if (scrollY >= offset && scrollY <= offsetBottom) {
          requestAnimationFrame(() => {
            ;(vect as HTMLElement).style.transform = `translate3d(0, ${
              scrollY - offset
            }px, 0)`
          })
        }
      }
    }, [scrollY, width])

    const links = GlobalState.links
    let issues = ''
    if (links) {
      issues = links.find((l: any) => l.id == 266).link
    }
    let subarr: any = []

    if (arr) {
      const ar = JSON.parse(JSON.stringify(arr))
      subarr = ar.sort((a: Issue, b: Issue) => a.title.localeCompare(b.title))
    }

    return (
      <section className={classNames('issues', classname)}>
        {!classname?.includes('service-page') && (
          <VectorScroll className="issues__vector" />
        )}
        {classname?.includes('service-page') && (
          <VectorServiceScroll className="issues__vector" />
        )}
        <div className="issues__container">
          <div className="issues__top">
            <div className="issues__col">
              <div style={{ overflow: 'hidden' }}>
                <div
                  className="issues__title"
                  dangerouslySetInnerHTML={{
                    __html: dt.title,
                  }}
                ></div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  className="issues__text"
                  dangerouslySetInnerHTML={{
                    __html: dt.text,
                  }}
                ></div>
              </div>
            </div>
            {width > 768 && (
              <a href={issues} className="button p18p40 black-border">
                <div className="button__text">
                  See All <Arrow />
                </div>
              </a>
            )}
          </div>

          <div className="issues__list">
            {subarr?.map((is: any, i: number) => (
              <a className="issues__item" key={i} href={`${issues}/${is.link}`}>
                <Vector id={i} />
                <div
                  className="issues__item-title"
                  dangerouslySetInnerHTML={{ __html: is.title }}
                ></div>
                <div
                  className="issues__item-text"
                  dangerouslySetInnerHTML={{ __html: is.text }}
                ></div>
                <ArrowRight className="issues__item-arrow" />
              </a>
            ))}
          </div>
          {width <= 768 && (
            <a href={issues} className="button p18p40 black-border">
              <div className="button__text">
                See All <Arrow />
              </div>
            </a>
          )}
        </div>
      </section>
    )
  },
)
export default Issues
