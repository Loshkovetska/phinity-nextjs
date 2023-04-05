import Vector  from '../../../../assets/Vector 1.svg'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import GlobalState from '../../../../stores/GlobalState'
const PhinityAdvantages = observer(({ dt }: { dt: any }) => {
  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const items = smooth!.querySelectorAll('.phinity-adv__item')

    window.addEventListener('scroll', () => {
      const smooth = document.querySelector('.smooth')
      const about = smooth!.querySelector('.phinity-adv')
      const title = smooth!.querySelector('.phinity-adv__title')
      const list = smooth!.querySelector('.phinity-adv__list')
      const items = smooth!.querySelectorAll('.phinity-adv__item')

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = about!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top
      if (window.scrollY > offset - 800) {
        about?.classList.add('animated')
        title?.classList.add('animated')
        setTimeout(() => {
          items.forEach((i, id) => {
            i?.classList.add('animated')
            ;(i as HTMLElement).style.transitionDelay = `${id / 6 + 0.3}s`
          })
        }, 1000)
      }
    })
  }, [])

  useEffect(() => {
    if (window.innerWidth > 768) {
      const container = document.querySelector('.phinity-adv')
      const vect = document.querySelector('.phinity-adv__vector')
      const smooth = document.querySelector('.smooth')
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom =
          elemRect.bottom - vect!.getBoundingClientRect().height / 2

      window.addEventListener('scroll', () => {
        if (window.scrollY >= offset && window.scrollY <= offsetBottom) {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            window.scrollY - offset
          }px, 0) ${
            container?.classList.contains('clinic') ? 'rotate(180deg)' : ''
          }`
        }
      })
    }
  }, [])

  if (!dt) return <></>
  return (
    <section className="phinity-adv">
      <Vector className="phinity-adv__vector" />
      <div className="phinity-adv__container">
        <div style={{ overflow: 'hidden' }}>
          <div
            className="phinity-adv__title"
            dangerouslySetInnerHTML={{
              __html: dt.title,
            }}
          ></div>
        </div>

        <div className="phinity-adv__list">
          {dt.list.map((i: any, id: number) => (
            <div className="phinity-adv__item" key={id}>
              <img
                src={i.icon.replaceAll('admin.', '')}
                className="phinity-adv__item-img"
                alt={i.alt}
              />
              <div
                className="phinity-adv__item-title"
                dangerouslySetInnerHTML={{ __html: i.title }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default PhinityAdvantages
