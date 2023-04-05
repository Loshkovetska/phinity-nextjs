import { observer } from 'mobx-react'
import { useEffect } from 'react'
import Vector from '../../../../assets/Vector 9.svg'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
const Benefits = observer(() => {
  const content = useContentState()
  const { scrollY } = useWindowScroll()
  const { width } = useWindowDimensions()
  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const about = smooth!.querySelector('.benefits')
    const title = smooth!.querySelector('.benefits__title')
    const text = smooth!.querySelector('.benefits__text')

    const items = smooth!.querySelectorAll('.benefits__item')
    const bodyTop = smooth!.getBoundingClientRect().top,
      elementTop = about!.getBoundingClientRect().top,
      offset = elementTop - bodyTop

    if (scrollY > offset - 500) {
      about?.classList.add('animated')
    }

    if (scrollY > offset - 200) {
      title?.classList.add('animated')
      text?.classList.add('animated')
      setTimeout(() => {
        items.forEach((i) => i?.classList.add('animated'))
      }, 2000)
    }
  }, [content.fees.benefits, scrollY])

  useEffect(() => {
    const container = document.querySelector('.benefits')
    const vect = document.querySelector(`.benefits__vector`)
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
        }px, 0) rotateX(180deg) rotateY(${width > 768 ? 180 : 0}deg)`
      })
    }
  }, [scrollY, width])

  if (!content.fees) return <></>

  const { fees }: any = content

  if (!fees.benefits) return <></>
  return (
    <section className="benefits">
      <Vector className="benefits__vector" />
      <div className="benefits__container">
        <div className="benefits__row center">
          {fees.benefits.cols.map((li: any, i: number) => (
            <div className="benefits__col" key={i}>
              <div style={{ overflow: 'hidden' }}>
                <div className="benefits__row-title">{li.title}</div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  className="benefits__row-text"
                  dangerouslySetInnerHTML={{ __html: li.text }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="benefits__row">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="benefits__title"
              dangerouslySetInnerHTML={{
                __html: fees.benefits.title,
              }}
            ></div>
          </div>
          <div className="benefits__list">
            {fees.benefits.list?.map((li: any, i: number) => (
              <div className="benefits__item" key={i}>
                <div className="benefits__item-num">
                  {i + 1}/{fees.benefits.list.length}
                </div>
                <div
                  className="benefits__item-text"
                  dangerouslySetInnerHTML={{ __html: li }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default Benefits
