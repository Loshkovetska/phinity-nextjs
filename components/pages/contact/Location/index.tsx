import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import Map from '../../../common/Map'
import VectorDesk from '../../../../assets/Vector 9.svg'
import VectorMobile from '../../../../assets/Vector 4.svg'
import classNames from 'classnames'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const Location = observer(() => {
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const [coords, setCoords] = useState<any>(null)
  const content = useContentState()

  useEffect(() => {
    const container = document.querySelector('.location')
    const vect = document.querySelector(
      `.location__vector.${width > 768 ? 'desk' : 'mob'}`,
    )
    const smooth = document.querySelector('.smooth')
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.bottom - contRect.height / 2

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0)`
      })
    }
  }, [width, scrollY])

  useEffect(() => {
    if (!content.contact.location?.list) return
    setCoords({
      lat: content.contact.location?.list[0].lat,
      lng: content.contact.location?.list[0].lng,
      maplink: content.contact.location?.list[0].maplink,
    })
  }, [content.contact.location?.list])

  const list = content.contact.location.list

  return (
    <section className="location">
      <VectorDesk className="location__vector desk" />
      <VectorMobile className="location__vector mob" />
      <div className="location__container">
        <div className="location__col">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="location__title"
              dangerouslySetInnerHTML={{
                __html: content?.contact.location.title,
              }}
            ></div>
          </div>
          <div className="location__col-block">
            {list &&
              coords &&
              list.map((l: any, i: number) => (
                <div style={{ overflow: 'hidden' }} key={i}>
                  <div
                    className="location__item"
                    onClick={() => {
                      document
                        .querySelector('.location__map')
                        ?.classList.add('hidden-map')

                      setTimeout(() => {
                        document
                          .querySelector('.location__map')
                          ?.classList.remove('hidden-map')
                      }, 700)
                      setCoords({ lat: l.lat, lng: l.lng, maplink: l.maplink })
                    }}
                  >
                    <div
                      className={classNames(
                        'location__col-title',
                        coords.lat == l.lat && coords.lng == l.lng && 'active',
                      )}
                      dangerouslySetInnerHTML={{
                        __html: l.subtitle,
                      }}
                    ></div>
                    <div
                      className="location__col-text"
                      dangerouslySetInnerHTML={{
                        __html: l.address,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="location__map">
          {coords ? (
            <Map
              link={coords.maplink}
              location={coords}
              zoom={+content?.contact.location.zoom || 18}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  )
})

export default Location
