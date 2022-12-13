import { observer } from 'mobx-react'
import PageLinks from '../../../common/PageLinks'
import Scroll from '../../../../assets/scroll.svg'
import { useEffect, useRef, useState } from 'react'
import Button from '../../../common/Button'
import Vector from '../../../../assets/home-area.svg'
import GlobalState from '../../../../stores/GlobalState'
import DBStore from '../../../../stores/DBStore'
import classNames from 'classnames'
import ScrollDown from '../../../../assets/post/arrow.svg'
import ReviewWidget from '../../../common/ReviewWidget'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'

const Intro = observer(
  ({ dt, links, classname }: { dt: any; links: any; classname: string }) => {
    const { width } = useWindowDimensions()

    useEffect(() => {
      const container = document.querySelector('.sub-intro')
      const vect = document.querySelector('.sub-intro__vector')
      const smooth = document.querySelector('.smooth')
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom = elemRect.bottom - elemRect.height / 2

      window.addEventListener('scroll', () => {
        if (window.scrollY >= offset && window.scrollY <= offsetBottom) {
          requestAnimationFrame(() => {
            if (window.innerWidth > 480) {
              ;(vect as HTMLElement).style.transform = `translate3d(0, ${
                window.scrollY - offset + 65
              }px, 0)`
            } else {
              ;(vect as HTMLElement).style.transform = `translate3d(0, ${
                window.scrollY - offset + 65
              }px, 0) scale(0.7)`
            }
          })
        }
      })
    }, [])

    return (
      <section className={classNames('sub-intro', classname)}>
        <Vector className="sub-intro__vector " />
        <div className="sub-intro__container">
          <PageLinks links={links} />
          <h1
            className="intro__title "
            dangerouslySetInnerHTML={{ __html: dt.title }}
          ></h1>
          { width > 768 && <ReviewWidget />}
          <div className="sub-intro__bottom">
            <div className={classNames('intro__bottom')}>
              <div className="intro__block ">
                <div
                  className="intro__text    "
                  dangerouslySetInnerHTML={{ __html: dt.text }}
                ></div>

                <a
                  rel="noreferrer"
                  className="blue p18p40 button "
                  href={dt.buttonLink}
                  target={'_blank'}
                >
                  <div className="button__text">
                    <>{dt.buttonText}</>
                  </div>
                </a>

                <div className="intro__block-row">
                  <ReviewWidget />
                  <div className="intro__scrolldown">
                    <ScrollDown />
                    <ScrollDown />
                    <ScrollDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)

export default Intro
