import { observer } from 'mobx-react'

import Vector9 from '../../../../assets/Vector 9.svg'
import { useEffect } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
const TherapistBlock = observer(({ therapist }: { therapist: any }) => {
  const { scrollY } = useWindowScroll()
  const { width } = useWindowDimensions()

  useEffect(() => {
    const smooth = document.querySelector('.smooth'),
      block = document.querySelector('.therapist-block')

    setTimeout(() => {
      block?.classList.add('animated')
      const prev = block?.previousElementSibling,
        main = document.querySelector('.therapist-block__main'),
        sub = document.querySelector('.therapist-block__sub'),
        items2 = document.querySelectorAll('.therapist-block__item')

      ;(main as any).classList.add('animated')

      items2.forEach((i, id) => {
        i?.classList.add('animated')
        ;(i as HTMLElement).style.transitionDelay = `${id / 6 + 0.5}s`
      })
      ;(sub as any).classList.add('animated')
    }, 1000)
  }, [therapist.block])

  useEffect(() => {
    if (width > 768) {
      const container = document.querySelector('.therapist-block')
      const vect = document.querySelector('.therapist-block__vector')
      const smooth = document.querySelector('.smooth')
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom =
          elemRect.bottom - vect!.getBoundingClientRect().height / 2

      if (scrollY >= offset && scrollY <= offsetBottom) {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0)`
      }
    }
  }, [therapist.block, scrollY, width])
  return (
    <section className="therapist-block">
      <Vector9 className="therapist-block__vector" />
      <div className="therapist-block__container">
        <div style={{ overflow: 'hidden' }}>
          <p
            className="therapist-block__main up"
            dangerouslySetInnerHTML={{
              __html: therapist.block.mainText,
            }}
          ></p>
        </div>
        <div className="therapist-block__list">
          {therapist.block.list.map((bl: any, i: number) => (
            <div className="therapist-block__item" key={i}>
              <div className="therapist-block__item-num">0{i + 1}</div>
              <div
                className="therapist-block__item-title"
                dangerouslySetInnerHTML={{ __html: bl.title }}
              ></div>
              <div
                className="therapist-block__item-text"
                dangerouslySetInnerHTML={{ __html: bl.text }}
              ></div>
            </div>
          ))}
        </div>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            className="therapist-block__sub up"
            dangerouslySetInnerHTML={{
              __html: therapist.block.subText,
            }}
          ></div>
        </div>
      </div>
    </section>
  )
})

export default TherapistBlock
