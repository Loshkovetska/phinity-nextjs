import { observer } from 'mobx-react'
import Deskvector from '../../../../assets/serv.svg'
import Mobvector from '../../../../assets/Vector 4.svg'
import { useEffect } from 'react'
import ContentStore from '../../../../stores/ContentStore'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const Symptoms = observer(() => {
  const { scrollY } = useWindowScroll()
  const { width } = useWindowDimensions()
  const content = useContentState()
  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const about = smooth!.querySelector('.symptoms')
    const items = smooth!.querySelectorAll('.symptoms__item')

    const title = smooth!.querySelector('.symptoms__title')

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = about!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top

    let start = width > 768 ? 1000 : 800
    let startDelay = width > 768 ? 1 : 1
    if (scrollY > offset - start) {
      about?.classList.add('animated')
      title?.classList.add('animated')
      items.forEach((i, id) => {
        i.classList.add('animated')
        ;(i as HTMLDivElement).style.transitionDelay = `${id / 6 + startDelay}s`
      })
    }
  }, [content.issueC, scrollY, width])

  useEffect(() => {
    const container = document.querySelector('.symptoms')
    const smooth = document.querySelector('.smooth')
    const vect = document.querySelector(
      `.symptoms__vector.${width > 650 ? 'desk' : 'mob'}`,
    )
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = container!.getBoundingClientRect(),
      vectRect = vect?.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = elemRect.bottom - vectRect!.height

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0) ${width > 650 ? 'rotateY(180deg)' : 'rotateY(0)'}`
      })
    }
  }, [content.issueC, width, scrollY])

  let symptoms: any = []
  if (content.issueC.symptoms) {
    symptoms = JSON.parse(JSON.stringify(content.issueC.symptoms))
    symptoms = symptoms.sort((a: any, b: any) => a.title.localeCompare(b.title))
  }

  return (
    <section className="symptoms">
      <div className="symptoms__container">
        <div style={{ overflow: 'hidden' }}>
          <div
            className="symptoms__title"
            dangerouslySetInnerHTML={{
              __html: content.issueC.symptomsTitle,
            }}
          ></div>
        </div>
        <div className="symptoms__list">
          {(symptoms as any)?.map((s: any, i: number) => (
            <div className="symptoms__item" key={i}>
              <div className="symptoms__item-title">{s.title}</div>
              <div
                className="symptoms__item-text"
                dangerouslySetInnerHTML={{ __html: s.text }}
              ></div>
            </div>
          ))}
          <Mobvector className="symptoms__vector mob" />
        </div>
      </div>
      <Deskvector className="symptoms__vector desk" />
    </section>
  )
})
export default Symptoms
