import PageLinks from '../../../common/PageLinks'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import Vector from '../../../../assets/home-area.svg'
import GlobalState from '../../../../stores/GlobalState'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'

const AboutContent = observer(({ about }: { about: any }) => {
  // const [isAnimate, setAnimate] = useState(false)

  // useEffect(() => {
  //   const els = document.querySelectorAll('.about-content *')
  //   if (isAnimate) {
  //     els.forEach((e) => e.classList.add('animated'))
  //   } else els.forEach((e) => e.classList.remove('animated'))
  // }, [isAnimate])

  // useEffect(() => {
  //   if (about) {
  //     setAnimate(true)
  //   }
  // }, [])

  useEffect(() => {
    if (!about) return
    const container = document.querySelector('.about-content')
    const vect = document.querySelector('.about-content__vector')
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
  }, [])

  const { width } = useWindowDimensions()

  let main = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
  }

  if (!about) return <></>

  return (
    <section className="about-content">
      <Vector className="about-content__vector" />

      <div className="about-content__container">
        <PageLinks
          links={[
            { title: about?.mainPageTitle, link: main },
            { title: about?.pageTitle, link: '/about' },
          ]}
        />
        <div style={{ overflow: 'hidden' }}>
          <h1
            className="about-content__title "
            dangerouslySetInnerHTML={{
              __html: about.title,
            }}
          ></h1>
        </div>
        <div
          className="about-content__text"
          dangerouslySetInnerHTML={{
            __html: about?.deskText,
          }}
        ></div>
    
      </div>
    </section>
  )
})

export default AboutContent
