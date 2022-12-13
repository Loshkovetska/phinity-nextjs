import { observer } from 'mobx-react'
import Setting from '../../../../assets/filter.svg'
import MobSetting from '../../../../assets/mob-sett.svg'
import Vector from '../../../../assets/Vector 7.svg'
import Button from '../../../common/Button'
import PageLinks from '../../../common/PageLinks'
import DBStore from '../../../../stores/DBStore'
import { useEffect } from 'react'
import GlobalState, {
  changeTheraFilterState,
} from '../../../../stores/GlobalState'

import ScrollDown from '../../../../assets/post/arrow.svg'
import ContentStore from '../../../../stores/ContentStore'
import ReviewWidget from '../../../common/ReviewWidget'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const Therapists = observer(() => {
  const content = useContentState()
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()

  useEffect(() => {
    if (width <= 768) {
      const smooth = document.querySelector('.smooth')
      const about = smooth!.querySelector('.all-therapists')
      about?.classList.add('animated')
    }
  }, [width])

  // useEffect(() => {
  //   setTimeout(() => {
  //     const smooth = document.querySelector('.smooth')

  //     const about = smooth!.querySelector('.all-therapists')
  //     const title = smooth!.querySelector('.all-therapists__title')
  //     const button = smooth!.querySelector('.all-therapists .button.filter')
  //     about?.classList.add('animated')
  //     title?.classList.add('animated')
  //     button?.classList.add('animated')
  //   }, 1000)
  // }, [])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const items = smooth!.querySelectorAll(
      '.all-therapists .therapists__item.small',
    )
    items.forEach((i, id) => {
      let elemRect = i!.getBoundingClientRect()
      let bodyRect = smooth!.getBoundingClientRect()
      let offset = elemRect.top - bodyRect.top
      if (scrollY > offset - 1000) {
        setTimeout(
          () => {
            ;(i as any).classList.add('animated')
          },
          window.innerWidth > 768 ? (id / 8) * 1000 : (id / 3 + 0.3) * 1000,
        )
      }
    })
  }, [scrollY])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const items = smooth!.querySelectorAll(
      '.all-therapists .therapists__item.small',
    )
    items.forEach((i, id) => {
      setTimeout(
        () => {
          ;(i as any).classList.add('animated')
        },
        width > 768 ? (id / 8) * 1000 : (id / 3 + 0.3) * 1000,
      )
    })
  }, [DBStore.therapists, width])

  useEffect(() => {
    setTimeout(() => {
      if (width > 768) {
        const cont = document.querySelector('.all-therapists')
        const next = cont?.nextElementSibling
        const list = document.querySelector('.all-therapists__list')
        const smooth = document.querySelector('.smooth')
        const v2 = document.querySelector('.all-therapists__vector')
        if (!v2 || !next || !list) return
        var bodyRect = smooth!.getBoundingClientRect(),
          listRect = list!.getBoundingClientRect(),
          nextRect = next!.getBoundingClientRect(),
          contRect = cont!.getBoundingClientRect()
        var offset = listRect.top - bodyRect.top,
          offsetBottom = nextRect.top - v2!.getBoundingClientRect().height

        if (scrollY >= offset && scrollY <= offsetBottom) {
          ;(v2 as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0) rotateY(180deg)`
        }
      }
    }, 1000)
  }, [width, scrollY])

  const { therapistsC: therapists } = content
  const linksL = GlobalState.links
  let therapistsL = '',
    main = ''
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
    therapistsL = linksL.find((l: any) => l.id == 268).link
  }

  const links = [
    {
      title: therapists.mainPageTitle,
      link: main,
    },
    {
      title: therapists.pageTitle,
      link: '/therapists',
    },
  ]

  return (
    <section className="all-therapists">
      <div className="all-therapists__container">
        <PageLinks links={links} />
        <div className="all-therapists__top">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="all-therapists__title"
              dangerouslySetInnerHTML={{
                __html: therapists.main.title,
              }}
            ></div>
          </div>

          <Button
            text={
              <>
                {width > 768 ? <Setting /> : <MobSetting />}
                {width > 768 && 'Filter'}
                {width > 768 && GlobalState.filterCount ? (
                  <span>({GlobalState.filterCount})</span>
                ) : (
                  <></>
                )}
              </>
            }
            click={changeTheraFilterState}
            classname="black-border p11p24 filter"
          />
        </div>
        <Vector className="all-therapists__vector" />

        <div className="all-therapists__list">
          {DBStore.therapists?.map((i, id) => (
            <a
              className="therapists__item small"
              key={id}
              href={`${therapistsL}/${i.link}`}
            >
              <div className="therapists__item-img">
                <img src={i.img} alt={i?.name} />
              </div>
              <div className="therapists__item-info">
                <div className="therapists__item-title">{i.name}</div>
                <div className="therapists__item-text">{i.position}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
})
export default Therapists
