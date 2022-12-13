import { observer } from 'mobx-react'
import Vector from '../../../../assets/choose.svg'
import { useEffect } from 'react'
import GlobalState from '../../../../stores/GlobalState'

const ChooseUs = observer(({ chooseUs }: { chooseUs: any }) => {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const smooth = document.querySelector('.smooth')
      const issues = smooth!.querySelector('.choose-us')
      const items = smooth!.querySelectorAll('.choose-us__item')
      const title = smooth!.querySelector('.choose-us__title')
      const text = smooth!.querySelector('.choose-us__text')
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = issues!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top

      if (window.scrollY > offset - 1000) {
        issues?.classList.add('animated')
        title?.classList.add('animated')
        text?.classList.add('animated')

        items.forEach((i, id) => {
          i?.classList.add('animated')
          ;(i as any).style.transitionDelay = `${id / 5 + 1.9}s`
        })
      }
    })
  }, [])

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const smooth = document.querySelector('.smooth')
      const cont = document.querySelector('.choose-us')
      const next = cont?.nextElementSibling
      const v2 = document.querySelector(`.choose-us__vector`)
      var bodyRect = smooth!.getBoundingClientRect(),
        nextRect = next!.getBoundingClientRect(),
        contRect = cont!.getBoundingClientRect()
      var offset = contRect.top - bodyRect.top,
        offsetBottom = nextRect.top - v2!.getBoundingClientRect().height

      window.addEventListener('scroll', () => {
        if (window.scrollY >= offset && window.scrollY <= offsetBottom) {
          ;(v2 as HTMLElement).style.transform = `translate3d(0, ${
            window.scrollY - offset
          }px, 0)`
        }
      })
    }
  }, [])
  if (!chooseUs) return <></>
  return (
    <section className="choose-us">
      <Vector className="choose-us__vector" />
      <div className="choose-us__container">
        <div className="choose-us__top">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="choose-us__title"
              dangerouslySetInnerHTML={{
                __html: chooseUs.title,
              }}
            ></div>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div
              className="choose-us__text"
              dangerouslySetInnerHTML={{
                __html: chooseUs.text,
              }}
            ></div>
          </div>
        </div>

        <div className="choose-us__list">
          {chooseUs?.list.map((l: any, id: number) => (
            <div className="choose-us__item" key={id}>
              <div className="choose-us__item-num">
                {id + 1}/{chooseUs?.list.length}
              </div>
              <div className="choose-us__item-text">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default ChooseUs
