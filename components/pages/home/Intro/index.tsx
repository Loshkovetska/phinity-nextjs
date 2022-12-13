import ScrollDown from '../../../../assets/post/arrow.svg'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import Vector from '../../../../assets/home-area.svg'
import GlobalState from '../../../../stores/GlobalState'

import ReviewWidget from '../../../common/ReviewWidget'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const Intro = observer(({ intro }: { intro: any }) => {
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  useEffect(() => {
    document.querySelector('.intro')?.classList.add('animated')
  }, [])

  useEffect(() => {
    const container = document.querySelector('.intro')
    const vect = document.querySelector('.intro__vector')
    const smooth = document.querySelector('.smooth')
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = container!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = elemRect.bottom - elemRect.height / 2
    if (scrollY >= offset && scrollY <= offsetBottom) {
      if (window.innerWidth > 480) {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset + 65
        }px, 0)`
      } else {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset + 65
        }px, 0) scale(0.7)`
      }
    }
  }, [scrollY])
  return (
    <section className="intro">
      {/*  */}
      <Vector className="intro__vector " />

      <div className="intro__container">
        {/*  */}
        <div
          className="intro__sub-title "
          dangerouslySetInnerHTML={{ __html: intro?.sutitle }}
        ></div>
        {/*  */}
        <h1
          className="intro__title "
          dangerouslySetInnerHTML={{ __html: intro?.title }}
        ></h1>
        <div className="intro__bottom">
          <div className="intro__bottom-widget">
            {width > 768 && <ReviewWidget />}
          </div>
          {/*  */}
          <div className="intro__block ">
            <div
              className="intro__text "
              dangerouslySetInnerHTML={{ __html: intro.text }}
            ></div>
            {/*  */}
            <a
              href={intro.buttonLink}
              target="__blank"
              className="button blue p18p40   "
            >
              <div className="button__text">{intro.buttonText}</div>
            </a>

            <div className="intro__block-row">
              <ReviewWidget />
              <div className="intro__scrolldown ">
                <ScrollDown />
                <ScrollDown />
                <ScrollDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Intro
