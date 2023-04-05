import { observer } from 'mobx-react'
import Vector from '../../../../assets/home-area.svg'
import PageLinks from '../../../common/PageLinks'
import ArrowRight from '../../../../assets/ArrowRight.svg'
import { Faq } from '../../../../api/mocks/faqs'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import GlobalState from '../../../../stores/GlobalState'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
const FaqList = observer(() => {
  const content = useContentState()
  const { scrollY } = useWindowScroll()
  const { width } = useWindowDimensions()
  // useEffect(() => {
  //   if (!content?.faqs) return
  //   const smooth = document.querySelector('.smooth')
  //   const issues = smooth!.querySelector('.faq-list')
  //   const title = smooth!.querySelector('.faq-list__title')
  //   const items = smooth!.querySelectorAll('.faq-list__item')
  //   if (!issues || !title || !items.length) return

  //   var bodyRect = smooth!.getBoundingClientRect(),
  //     elemRect = issues!.getBoundingClientRect(),
  //     offset = elemRect.top - bodyRect.top

  //   setTimeout(() => {
  //     issues?.classList.add('animated')
  //     title?.classList.add('animated')
  //   }, 500)

  //   setTimeout(() => {
  //     items.forEach((i, id) => {
  //       setTimeout(() => {
  //         i?.classList.add('animated')
  //       }, (id / 6 + 0.5) * 1000)
  //     })
  //   }, 1000)
  // }, [content?.faqs])

  useEffect(() => {
    const container = document.querySelector('.faq-list')
    const vect = document.querySelector('.faq-list__vector')
    const smooth = document.querySelector('.smooth')

    if (!vect) return
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.bottom - contRect.height / 2
    if (scrollY >= offset && scrollY <= offsetBottom) {
      ;(vect as HTMLElement).style.transform = `translate3d(0, ${
        scrollY - offset
      }px, 0)`
    }
  }, [content.faqs, width, scrollY])

  let main = ''
  const { links: linksL } = useContentState()
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link
  }

  return (
    <section className="faq-list">
      <PageLinks
        links={[
          { title: content?.faq?.mainPageTitle, link: main },
          { title: content?.faq?.pageTitle, link: 'faq' },
        ]}
      />
      <Vector className="faq-list__vector" />
      <div className="faq-list__container">
        <div style={{ overflow: 'hidden' }}>
          {' '}
          <h1 className="faq-list__title">{content?.faq?.title}</h1>
        </div>

        <div className="faq-list__list">
          {content?.faqs?.map((f: any, ind: number) => (
            <FaqItem key={ind} f={f} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default FaqList

const FaqItem = ({ f }: { f: Faq }) => {
  const [active, setActive] = useState(false)
  const ref = useRef<any>(null)
  useEffect(() => {
    if (active) {
      ref.current && ref.current.classList.add('active')
    } else ref.current && ref.current.classList.remove('active')
  }, [active])

  return (
    <div className={classNames('faq-list__item')} ref={ref}>
      <div className="faq-list__item-top" onClick={() => setActive(!active)}>
        <div className="faq-list__item-title">{f.title}</div>
        <ArrowRight
          className={classNames('faq-list__item-icon', active && 'active')}
        />
      </div>
      <div
        className="faq-list__item-text"
        dangerouslySetInnerHTML={{ __html: f.text }}
      ></div>
    </div>
  )
}
