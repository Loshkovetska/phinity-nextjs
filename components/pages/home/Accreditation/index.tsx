import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import VectorDesk from '../../../../assets/Vector 1.svg'
import VectorMob from '../../../../assets/Vector 5.svg'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import ImageComponent from '../../../common/ImageComponent'
const Accreditation = observer(({ accreditation }: { accreditation: any }) => {
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  useEffect(() => {
    const container = document.querySelector('.accreditation')
    const vect = document.querySelector(
      `.accreditation__vector.${width > 480 ? 'desk' : 'mob'}`,
    )
    const smooth = document.querySelector('.smooth')
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.top + contRect.height / 3

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0)`
      })
    }
  }, [scrollY, width])

  return (
    <section className="accreditation">
      <VectorDesk className="accreditation__vector desk" />
      <VectorMob className="accreditation__vector mob" />
      <div className="accreditation__container">
        <div className="accreditation__top">
          <div
            style={{
              overflow: 'hidden',
            }}
          >
            <div
              className="accreditation__title"
              dangerouslySetInnerHTML={{ __html: accreditation?.title }}
            ></div>
          </div>

          <div
            style={{
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              className="accreditation__text"
              dangerouslySetInnerHTML={{ __html: accreditation?.text }}
            ></div>
          </div>
        </div>
        <div className="accreditation__list">
          {accreditation?.imgs.map((i: any, id: number) => (
            <div className="accreditation__item" key={id}>
              <ImageComponent src={i.src} alt={i.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Accreditation
