import { observer } from 'mobx-react'
import DBStore from '../../../../stores/DBStore'
import Vector from '../../../../assets/home-area.svg'
import PageLinks from '../../../common/PageLinks'
import { useEffect } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const VacancyContent = observer(() => {
  const content = useContentState()
  const { path, width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const { job: vacancy } = content
  const { jobC: job } = content
  // useEffect(() => {
  //   document.querySelector('.vacancy-content')?.classList.add('animated')

  //   setTimeout(() => {
  //     document
  //       .querySelector('.vacancy-content__title')
  //       ?.classList.add('animated')
  //     document
  //       .querySelector('.vacancy-content__subtitle')
  //       ?.classList.add('animated')
  //     document
  //       .querySelector('.vacancy-content__social')
  //       ?.classList.add('animated')
  //   }, 500)
  //   setTimeout(() => {
  //     document
  //       .querySelector('.vacancy-content__content')
  //       ?.classList.add('animated')
  //   }, 1200)
  // }, [vacancy])

  useEffect(() => {
    const container = document.querySelector('.vacancy-content')
    const vect = document.querySelector('.vacancy-content__vector')
    const smooth = document.querySelector('.smooth')

    if (!smooth || !vect) return
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = container!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = elemRect.bottom - elemRect.height / 2

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        if (window.innerWidth > 480) {
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
  }, [vacancy, scrollY, width])

  // useEffect(() => {
  //   const container = document.querySelector('.vacancy-content')
  //   const smooth = document.querySelector('.smooth')
  //   if (!smooth || !container) return
  //   var bodyRect = smooth!.getBoundingClientRect(),
  //     elemRect = container!.getBoundingClientRect(),
  //     offset = elemRect.top - bodyRect.top

  //     if (scrollY > offset - 700) {
  //       document
  //         .querySelector('.vacancy-content__skills .vacancy-content__title')
  //         ?.classList.add('animated')
  //       setTimeout(() => {
  //         document
  //           .querySelector('.vacancy-content__skills-list')
  //           ?.classList.add('animated')
  //       }, 1000)
  //     }
    
  //   const benefits = document.querySelector('.vacancy-content__benefits')

  //   elemRect = benefits!.getBoundingClientRect()
  //   const offsetBenefit = elemRect.top - bodyRect.top
  //     if (scrollY > offsetBenefit - 500) {
  //       document
  //         .querySelector('.vacancy-content__benefits .vacancy-content__title')
  //         ?.classList.add('animated')
  //       setTimeout(() => {
  //         document
  //           .querySelectorAll('.vacancy-content__benefits-item')
  //           .forEach((li, id) => {
  //             li.classList.add('animated')
  //             ;(li as HTMLElement).style.transitionDelay = `${id / 6}s`
  //           })
  //       }, 1000)
  //     }
    
  // }, [vacancy, scrollY])

  let main = '',
    vacanc = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
    vacanc = linksL.find((l: any) => l.id == 262).link
  }
  return (
    <section className="vacancy-content">
      <Vector className="vacancy-content__vector" />
      <div className="vacancy-content__container">
        <PageLinks
          links={[
            { title: job.mainPageTitle, link: main },
            { title: job.pageTitle, link: vacanc },
            { title: vacancy.title, link: `${vacanc}/${vacancy.id}` },
          ]}
        />

        <div className="vacancy-content__top">
          <div className="vacancy-content__top-col">
            <div style={{ overflow: 'hidden' }}>
              <h1 className="vacancy-content__title">{vacancy?.title}</h1>
            </div>
            <div className="vacancy-content__subtitle">{vacancy.location}</div>
          </div>
          <div className="vacancy-content__social">
            <div className="vacancy-content__social-title">
              {job?.shareTitle}
            </div>
            <div className="vacancy-content__social-list">
              {job?.shareList?.map((b: any, i: number) => (
                <a
                  key={i}
                  href={b.link + path}
                  target="__blank"
                >
                  <img src={b.icon} alt={path} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="vacancy-content__row">
          <div className="vacancy-content__row-col">
            <div
              className="vacancy-content__row-title"
              dangerouslySetInnerHTML={{
                __html: job.company.title,
              }}
            ></div>
            <div
              className="vacancy-content__text"
              dangerouslySetInnerHTML={{
                __html: vacancy.are!,
              }}
            ></div>
          </div>
          <div className="vacancy-content__row-col">
            <div
              className="vacancy-content__row-title"
              dangerouslySetInnerHTML={{
                __html: job.descriptionTitle,
              }}
            ></div>
            <div
              className="vacancy-content__text"
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
            ></div>
          </div>
        </div>
        <div className="vacancy-content__skills">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="vacancy-content__title"
              dangerouslySetInnerHTML={{
                __html: job.qualification.title,
              }}
            ></div>
          </div>
          <div
            className="vacancy-content__skills-list"
            dangerouslySetInnerHTML={{
              __html: vacancy.asc!,
            }}
          ></div>

   
        </div>
        <div className="vacancy-content__benefits">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="vacancy-content__title"
              dangerouslySetInnerHTML={{
                __html: job.benefits.title,
              }}
            ></div>
          </div>

          <div className="vacancy-content__benefits-list">
            {vacancy.offers?.map((vi: any, id: number) => (
              <div className="vacancy-content__benefits-item" key={id}>
                <div className="vacancy-content__benefits-num">
                  {id + 1}/{vacancy.offers?.length}
                </div>
                <div className="vacancy-content__benefits-text">{vi.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="vacancy-content__bottom">
          <div className="vacancy-content__bottom-col">
            <div
              className="vacancy-content__row-title"
              dangerouslySetInnerHTML={{
                __html: job.info.title,
              }}
            ></div>
            <div
              className="vacancy-content__text"
              dangerouslySetInnerHTML={{
                __html: job.info.text,
              }}
            ></div>
            <div
              className="vacancy-content__row-title mt56"
              dangerouslySetInnerHTML={{
                __html: job.info.closingTitle,
              }}
            ></div>
            <div
              className="vacancy-content__text"
              dangerouslySetInnerHTML={{
                __html: job.info.closingText,
              }}
            ></div>
            <div
              className="vacancy-content__text mt56"
              dangerouslySetInnerHTML={{
                __html: job.info.closingSubText,
              }}
            ></div>
          </div>
          <div className="vacancy-content__social">
            <div className="vacancy-content__social-title">
              {job?.shareTitle}
            </div>
            <div className="vacancy-content__social-list">
              {job?.shareList?.map((b: any, i: number) => (
                <a key={i} href={b.link + path} target={'__blank'}>
                  <img src={b.icon} alt={path} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default VacancyContent
