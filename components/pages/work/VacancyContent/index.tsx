import { observer } from 'mobx-react'
import Vector from '../../../../assets/home-area.svg'
import PageLinks from '../../../common/PageLinks'
import { useEffect } from 'react'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const VacancyContent = observer(() => {
  const content = useContentState()
  const { path, width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const { job: vacancy } = content
  const { jobC: job } = content

  const copy = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
    }
  }

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

  let main = '',
    vacanc = ''
  const { links: linksL } = useContentState()
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link
    vacanc = linksL.find((l: any) => l.id == 262)?.link
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
                <a key={i} href={b.link + path} target="__blank">
                  <img src={b.icon.replaceAll('admin.', '')} alt={b.alt} loading="lazy" />
                </a>
              ))}
              <img
                src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1647_68132)'%3E%3Ccircle cx='16' cy='16' r='12' fill='%230033CC' /%3E%3Cpath d='M15.5584 11.5806L17.1052 10.0338C17.4244 9.71439 17.8033 9.46095 18.2204 9.288C18.6376 9.11505 19.0847 9.02598 19.5362 9.02588C19.9878 9.02577 20.4349 9.11464 20.8521 9.28739C21.2693 9.46014 21.6484 9.7134 21.9677 10.0327C22.287 10.352 22.5403 10.7311 22.713 11.1483C22.8858 11.5655 22.9746 12.0126 22.9745 12.4642C22.9744 12.9157 22.8854 13.3628 22.7124 13.78C22.5395 14.1971 22.286 14.576 21.9666 14.8952L19.7569 17.1049C19.4377 17.4241 19.0587 17.6773 18.6417 17.8501C18.2246 18.0228 17.7776 18.1117 17.3262 18.1117C16.8748 18.1117 16.4278 18.0228 16.0107 17.8501C15.5937 17.6773 15.2147 17.4241 14.8955 17.1049' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Cpath d='M16.4415 20.4195L14.8947 21.9663C14.5756 22.2858 14.1966 22.5392 13.7795 22.7121C13.3624 22.8851 12.9152 22.9742 12.4637 22.9743C12.0121 22.9744 11.565 22.8855 11.1478 22.7128C10.7306 22.54 10.3515 22.2867 10.0322 21.9674C9.71291 21.6482 9.45966 21.2691 9.2869 20.8519C9.11415 20.4347 9.02529 19.9875 9.02539 19.536C9.0255 19.0844 9.11457 18.6373 9.28751 18.2202C9.46046 17.8031 9.7139 17.4241 10.0333 17.105L12.2431 14.8952C12.5623 14.576 12.9412 14.3228 13.3583 14.1501C13.7753 13.9773 14.2223 13.8884 14.6737 13.8884C15.1252 13.8884 15.5721 13.9773 15.9892 14.1501C16.4063 14.3228 16.7852 14.576 17.1044 14.8952' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Ccircle cx='16' cy='16' r='13' stroke='%230033CC' stroke-width='6' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1647_68132'%3E%3Crect width='32' height='32' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                onClick={copy}
                style={{
                  width: 32,
                  height: 32,
                }}
                loading="lazy"
              />
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
                  <img src={b.icon.replaceAll('admin.', '')} alt={b.alt} />
                </a>
              ))}
              <img
                src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1647_68132)'%3E%3Ccircle cx='16' cy='16' r='12' fill='%230033CC' /%3E%3Cpath d='M15.5584 11.5806L17.1052 10.0338C17.4244 9.71439 17.8033 9.46095 18.2204 9.288C18.6376 9.11505 19.0847 9.02598 19.5362 9.02588C19.9878 9.02577 20.4349 9.11464 20.8521 9.28739C21.2693 9.46014 21.6484 9.7134 21.9677 10.0327C22.287 10.352 22.5403 10.7311 22.713 11.1483C22.8858 11.5655 22.9746 12.0126 22.9745 12.4642C22.9744 12.9157 22.8854 13.3628 22.7124 13.78C22.5395 14.1971 22.286 14.576 21.9666 14.8952L19.7569 17.1049C19.4377 17.4241 19.0587 17.6773 18.6417 17.8501C18.2246 18.0228 17.7776 18.1117 17.3262 18.1117C16.8748 18.1117 16.4278 18.0228 16.0107 17.8501C15.5937 17.6773 15.2147 17.4241 14.8955 17.1049' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Cpath d='M16.4415 20.4195L14.8947 21.9663C14.5756 22.2858 14.1966 22.5392 13.7795 22.7121C13.3624 22.8851 12.9152 22.9742 12.4637 22.9743C12.0121 22.9744 11.565 22.8855 11.1478 22.7128C10.7306 22.54 10.3515 22.2867 10.0322 21.9674C9.71291 21.6482 9.45966 21.2691 9.2869 20.8519C9.11415 20.4347 9.02529 19.9875 9.02539 19.536C9.0255 19.0844 9.11457 18.6373 9.28751 18.2202C9.46046 17.8031 9.7139 17.4241 10.0333 17.105L12.2431 14.8952C12.5623 14.576 12.9412 14.3228 13.3583 14.1501C13.7753 13.9773 14.2223 13.8884 14.6737 13.8884C15.1252 13.8884 15.5721 13.9773 15.9892 14.1501C16.4063 14.3228 16.7852 14.576 17.1044 14.8952' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Ccircle cx='16' cy='16' r='13' stroke='%230033CC' stroke-width='6' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1647_68132'%3E%3Crect width='32' height='32' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                onClick={copy}
                style={{
                  width: 32,
                  height: 32,
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default VacancyContent
