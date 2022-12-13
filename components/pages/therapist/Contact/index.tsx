import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import GlobalState from '../../../../stores/GlobalState'
import CustomLink from '../../../common/CustomLink'
import Map from '../../../common/Map'

const Contact = observer(({ therapist }: { therapist: any }) => {
  const [tab, setTab] = useState(0)
  const { scrollY } = useWindowScroll()
  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const about = smooth!.querySelector('.therapist-contact')
    const title = smooth!.querySelector('.therapist-contact__title')
    const tabs = smooth!.querySelectorAll('.therapist-contact__tab')
    const items = smooth!.querySelectorAll('.therapist-contact__item')
    const map = smooth!.querySelector('.therapist-contact__map')

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = about!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top

    if (scrollY > offset - 700) {
      title?.classList.add('animated')
      tabs?.forEach((t) => t.classList.add('animated'))
      items.forEach((i, id) => {
        ;(i as any).classList.add('animated')
        ;(i as any).style.transitionDelay = `${id / 6 + 0.5}s`
      })
      map?.classList.add('animated')
    }
  }, [scrollY])

  if (!therapist.contact) return <></>
  return (
    <section className="therapist-contact">
      <div className="therapist-contact__container">
        <div className="therapist-contact__col">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="therapist-contact__title"
              dangerouslySetInnerHTML={{
                __html: '',
              }}
            ></div>
          </div>
          {therapist.contact?.clinics?.map((c: any, i: any) => (
            <div style={{ overflow: 'hidden' }} key={i}>
              <div
                className={classNames(
                  'therapist-contact__tab',
                  tab == i && 'active',
                )}
                onClick={() => setTab(i)}
              >
                {c.title}
              </div>
            </div>
          ))}
          <div className="therapist-contact__col-block">
            <div style={{ overflow: 'hidden' }}>
              <div className="therapist-contact__item">
                <div
                  className="therapist-contact__item-title"
                  dangerouslySetInnerHTML={{
                    __html: therapist.contact?.addressTitle,
                  }}
                ></div>
                <div
                  className="therapist-contact__item-text"
                  dangerouslySetInnerHTML={{
                    __html: therapist.contact.clinics[tab]?.address,
                  }}
                ></div>
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="therapist-contact__item">
                <div
                  className="therapist-contact__item-title"
                  dangerouslySetInnerHTML={{
                    __html: therapist.contact?.sheduleTitle,
                  }}
                ></div>
                <div
                  className="therapist-contact__item-text"
                  dangerouslySetInnerHTML={{
                    __html: therapist.contact.clinics[tab]?.shedule,
                  }}
                ></div>
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="therapist-contact__item">
                <div
                  className="therapist-contact__item-title"
                  dangerouslySetInnerHTML={{
                    __html: therapist.contact.phoneTitle,
                  }}
                ></div>
                <div className="therapist-contact__item-text">
                  <CustomLink
                    type="phone"
                    text={therapist.contact.clinics[tab]?.phone}
                  >
                    <div
                      className="therapist-contact__item-text"
                      dangerouslySetInnerHTML={{
                        __html: therapist.contact.clinics[tab]?.phone,
                      }}
                    ></div>
                  </CustomLink>
                </div>
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="therapist-contact__item">
                <div
                  className="therapist-contact__item-title"
                  dangerouslySetInnerHTML={{
                    __html: therapist.contact.emailTitle,
                  }}
                ></div>
                <CustomLink
                  type="email"
                  text={therapist.contact.clinics[tab]?.email}
                >
                  <div className="therapist-contact__item-text">
                    {therapist.contact.clinics[tab]?.email}
                  </div>
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
        <div className="therapist-contact__map">
          <Map
            link={therapist.contact.clinics[tab]?.maplink}
            location={therapist.contact.location}
            zoom={+therapist.contact.zoom || 18}
          />
        </div>
      </div>
    </section>
  )
})

export default Contact
