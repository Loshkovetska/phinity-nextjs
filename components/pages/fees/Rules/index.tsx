import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import ContentStore from '../../../../stores/ContentStore'

const Rules = observer(() => {
  const content = useContentState()
  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const about = smooth!.querySelector('.rules')
    const title = smooth!.querySelector('.rules__title')
    const text = smooth!.querySelector('.rules__text')
    const items = smooth!.querySelectorAll('.rules__item')
    const bodyTop = smooth!.getBoundingClientRect().top,
      elementTop = about!.getBoundingClientRect().top,
      offset = elementTop - bodyTop

    setTimeout(() => {
      about?.classList.add('animated')
      title?.classList.add('animated')
      text?.classList.add('animated')
      items.forEach((i) => i?.classList.add('animated'))
    }, 100)
  }, [])
  if (!content.fees) return <></>

  const { fees }: any = content
  if (!fees.rules) return <></>

  return (
    <section className="rules">
      <div className="rules__top">
        <div style={{ overflow: 'hidden' }}>
          <div
            className="rules__title"
            dangerouslySetInnerHTML={{ __html: fees.rules.title }}
          ></div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="rules__text"
            dangerouslySetInnerHTML={{ __html: fees.rules.text }}
          ></div>
        </div>
      </div>

      <div className="rules__list">
        {fees.rules.list?.map((li: any, i: number) => (
          <div className="rules__item" key={i}>
            <div className="rules__item-num">
              {i + 1}/{fees.rules.list?.length}
            </div>
            <div className="rules__item-text">{li}</div>
          </div>
        ))}
      </div>
    </section>
  )
})

export default Rules
