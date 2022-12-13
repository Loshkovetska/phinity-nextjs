import { observer } from 'mobx-react'
import { useEffect } from 'react'
import Vector from '../../../../assets/Vector 3.svg'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const Offers = observer(({ offers }: { offers: any }) => {
  const { scrollY } = useWindowScroll()
  useEffect(() => {
    if (offers) {
      const smooth = document.querySelector('.smooth')
      const offers = smooth!.querySelector('.offers')
      const title = smooth!.querySelector('.offers__title')
      const items = smooth!.querySelectorAll('.offers__item')

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = offers!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top
      if (scrollY > offset - 700) {
        offers?.classList.add('animated')
        title?.classList.add('animated')
      }

      if (scrollY > offset - 500) {
        items.forEach((i, id) => {
          i.classList.add('animated')
          ;(i as HTMLDivElement).style.transitionDelay = `${id / 8}s`
        })
      }
    }
  }, [scrollY])

  useEffect(() => {
    if (window.innerWidth <= 480) {
      const container = document.querySelector('.offers')
      const vect = document.querySelector('.offers__vector')
      const smooth = document.querySelector('.smooth')
      var bodyRect = smooth!.getBoundingClientRect(),
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
  }, [scrollY])

  if (!offers) return <></>
  return (
    <section className="offers">
      <div className="offers__container">
        <div className="offers__wrapper">
          <div
            className="offers__title"
            dangerouslySetInnerHTML={{ __html: offers.title }}
          ></div>
        </div>
        <div className="offers__wrapper list">
          <div className="offers__list">
            {offers.list?.map((o: any, i: number) => (
              <div className={`offers__item offers__item${i}`} key={i}>
                <div
                  className="offers__item-title"
                  dangerouslySetInnerHTML={{ __html: o.title }}
                ></div>
                <div
                  className="offers__item-text"
                  dangerouslySetInnerHTML={{ __html: o.text }}
                ></div>
              </div>
            ))}

            <Vector className="offers__vector " />
          </div>
        </div>
      </div>
    </section>
  )
})

export default Offers
