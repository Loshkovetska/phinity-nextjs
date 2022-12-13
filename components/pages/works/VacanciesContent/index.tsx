import { observer } from 'mobx-react'
import PageLinks from '../../../common/PageLinks'
import Vector from '../../../../assets/home-area.svg'
import { useEffect, useState } from 'react'
import GlobalState, {
  changeTheraFilterState,
} from '../../../../stores/GlobalState'
import ArrowRight from '../../../../assets/ArrowRight.svg'
import { Vacancy } from '../../../../api/mocks/vacancies'
import classNames from 'classnames'
import DBStore from '../../../../stores/DBStore'
import Button from '../../../common/Button'
import Setting from '../../../../assets/filter.svg'
import MSetting from '../../../../assets/mob-sett.svg'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const VacanciesContent = observer(({ works }: { works: any }) => {
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const content = useContentState()
  // useEffect(() => {
  //   if (!DBStore.vacancies?.length) return
  //   document.querySelector('.vacancies')?.classList.add('animated')
  //   setTimeout(() => {
  //     setTimeout(() => {
  //       document
  //         .querySelectorAll('.vacancies__title')
  //         ?.forEach((c) => c.classList.add('animated'))
  //     }, 300)

  //     setTimeout(() => {
  //       document
  //         .querySelector('.vacancies__subtitle')
  //         ?.classList.add('animated')
  //     }, 600)
  //     const items = document.querySelectorAll('.vacancies__text')

  //     setTimeout(() => {
  //       items.forEach((i, id) => {
  //         i.classList.add('animated')
  //         ;(i as HTMLDivElement).style.transitionDelay = `${id / 4 + 1}s`
  //       })
  //     }, 900)

  //     setTimeout(() => {
  //       const items = document.querySelectorAll('.vacancies__item')
  //       items.forEach((i, id) => {
  //         setTimeout(() => {
  //           i?.classList.add('animated')
  //         }, (id / 6) * 1000)
  //       })
  //     }, 1200)
  //   }, 1000)
  // }, [DBStore.vacancies, works])

  useEffect(() => {
    const container = document.querySelector('.vacancies')
    const vect = document.querySelector('.vacancies__vector')
    const smooth = document.querySelector('.smooth')
    if (!smooth || !vect) return
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = container!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = elemRect.bottom - elemRect.height / 2

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        if (width > 480) {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0)`
        } else {
          ;(vect as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0) scale(0.7)`
        }
      })
    }
  }, [DBStore.vacancies, works, scrollY, width])

  if (!works) return <></>

  let vacancies: Array<Vacancy> = []

  if (DBStore.vacancies) {
    vacancies = JSON.parse(JSON.stringify(DBStore.vacancies))
    vacancies = vacancies.sort((a, b) => a.title.localeCompare(b.title))
  }

  const links = GlobalState.links
  let main = ''
  if (links) {
    main = links.find((l: any) => l.id == 2).link
  }

  return (
    <section className="vacancies">
      <Vector className="vacancies__vector" />
      <div className="vacancies__container">
        <PageLinks
          links={[
            { title: works.mainPageTitle, link: main },
            { title: works.pageTitle, link: '/jobs' },
          ]}
        />
        <div style={{ overflow: 'hidden' }}>
          <h1
            className="vacancies__title"
            dangerouslySetInnerHTML={{
              __html: works.title,
            }}
          ></h1>
        </div>
        <div className="vacancies__row">
          <div style={{ overflow: 'hidden' }}>
            {' '}
            <div
              className="vacancies__subtitle"
              dangerouslySetInnerHTML={{
                __html: works.subtitle,
              }}
            ></div>
          </div>
          <div className="vacancies__col">
            <div style={{ overflow: 'hidden' }}>
              {' '}
              <div
                className="vacancies__text"
                dangerouslySetInnerHTML={{
                  __html: works.p1,
                }}
              ></div>
            </div>
            <div style={{ overflow: 'hidden' }} className="mt56">
              {' '}
              <div
                className="vacancies__text "
                dangerouslySetInnerHTML={{
                  __html: works.p2,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="vacancies__top">
          <div style={{ overflow: 'hidden' }}>
            <div className="vacancies__title">Our Vacancies</div>
          </div>
          <Button
            text={
              <>
                {width > 768 ? <Setting /> : <MSetting />}
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
        <div className="vacancies__list">
          {vacancies?.map((vi, id) => (
            <VacancyItem item={vi} key={id} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default VacanciesContent

const VacancyItem = ({ item }: { item: Vacancy }) => {
  const links = GlobalState.links
  let vacancies = ''
  if (links) {
    vacancies = links.find((l: any) => l.id == 262).link
  }

  return (
    <a
      className={classNames('vacancies__item')}
      href={`${vacancies}/${item.link}`}
    >
      <div className="vacancies__item-col">
        <div className="vacancies__item-top">
          Job title{' '}
          <span className="vacancies__item-date">
            {new Date(item.publicationDate).toLocaleDateString('en')}
          </span>
        </div>
        <div className="vacancies__item-title">
          {item.title}{' '}
          {item.location.length ? <span>({item.location})</span> : <></>}
        </div>
      </div>
      <ArrowRight className="vacancies__item-arrow" />
    </a>
  )
}
