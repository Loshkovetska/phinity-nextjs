import { observer } from 'mobx-react'
import Vector from '../../../../assets/Vector 3.svg'
import { useEffect } from 'react'
import classNames from 'classnames'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import ImageComponent from '../../../common/ImageComponent'
const AboutService = observer(
  ({
    classname = '',
    dt,
    service,
  }: {
    classname?: string
    dt: any
    service: any
  }) => {
    const { width } = useWindowDimensions()
    const { scrollY } = useWindowScroll()
    useEffect(() => {
      if (width <= 480) {
        const container = document.querySelector('.about-service')
        const smooth = document.querySelector('.smooth')
        const vect = document.querySelector(`.about-service__vector`)
        var bodyRect = smooth!.getBoundingClientRect(),
          elemRect = container!.getBoundingClientRect(),
          vectRect = vect?.getBoundingClientRect(),
          offset = elemRect.top - bodyRect.top,
          offsetBottom = elemRect.bottom - vectRect!.height

        if (scrollY >= offset && scrollY <= offsetBottom) {
          requestAnimationFrame(() => {
            ;(vect as HTMLElement).style.transform = `translate3d(0, ${
              scrollY - offset
            }px, 0)`
          })
        }
      }
    }, [width, scrollY])

    if (!service.about) return <></>

    return (
      <section className={classNames('about-service', classname)}>
        <Vector className="about-service__vector" />
        <div className="about-service__container">
          <div className="about-service__row">
            <div className="about-service__col">
              <div
                className="about-service__title"
                dangerouslySetInnerHTML={{
                  __html: dt.title,
                }}
              ></div>
              <div
                className="about-service__text"
                dangerouslySetInnerHTML={{
                  __html: dt.text,
                }}
              ></div>
            </div>
            <div className="about-service__img">
              <div className="about-service__mask">
                <ImageComponent src={dt.img} alt={dt.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)

export default AboutService
