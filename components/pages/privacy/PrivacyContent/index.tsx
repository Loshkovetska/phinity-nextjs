import { observer } from 'mobx-react'
import { useEffect } from 'react'
import Vector from '../../../../assets/home-area.svg'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import ContentStore from '../../../../stores/ContentStore'
import GlobalState from '../../../../stores/GlobalState'
import PageLinks from '../../../common/PageLinks'

const PrivacyContent = observer(() => {
  const content = useContentState()
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  // useEffect(() => {
  //   setTimeout(() => {
  //     const smooth = document.querySelector('.smooth')

  //     if (!smooth) return
  //     const issues = smooth!.querySelector('.privacy')
  //     const title = smooth!.querySelector('.privacy__title')
  //     const items = smooth!.querySelectorAll(
  //       '.privacy  p, .privacy ul, .privacy  ol ',
  //     )

  //     issues?.classList.add('animated')
  //     setTimeout(() => {
  //       title?.classList.add('animated')
  //     }, 300)
  //     setTimeout(() => {
  //       items.forEach((i, id) => {
  //         i?.classList.add('animated')
  //         ;(i as HTMLElement).style.transitionDelay = `${id / 4 + 0.5}`
  //       })
  //     }, 1500)
  //   }, 1000)
  // }, [content.privacy])

  useEffect(() => {
    setTimeout(() => {
      if (width <= 768) return
      const container = document.querySelector('.privacy')
      const vect = document.querySelector('.privacy__vector')
      const smooth = document.querySelector('.smooth')
      if (!smooth || !container) return

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom = elemRect.bottom - elemRect.height / 2

      if (scrollY >= offset && scrollY <= offsetBottom) {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0)`
      }
    }, 1000)
  }, [content.privacy, width, scrollY])

  let main = ''
  const { links: linksL } = useContentState()
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link
  }

  const { privacy } = content

  return (
    <section className="privacy">
      <PageLinks
        links={[
          { title: privacy.mainPageTitle, link: main },
          { title: privacy.pageTitle, link: '/privacy' },
        ]}
      />

      <Vector className="privacy__vector" />
      <div className="privacy__container">
        <div style={{ overflow: 'hidden' }}>
          <h1
            className="privacy__title"
            dangerouslySetInnerHTML={{ __html: privacy.title }}
          ></h1>
        </div>
        <div
          className="privacy__content"
          dangerouslySetInnerHTML={{ __html: privacy.content }}
        ></div>
      </div>
    </section>
  )
})

export default PrivacyContent
