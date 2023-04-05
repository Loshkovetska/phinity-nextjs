import Arrow from '../../../../assets/caret-right.svg'
import './Therapists.module.scss'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import CustomSlider from '../../../common/CustomSlider'
import Vector from '../../../../assets/Vector 1.svg'
import { Therapist } from '../../../../api/mocks/therapists'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import ImageComponent from '../../../common/ImageComponent'
import { useContentState } from '../../../../hooks/RootStoreProvider'
const Therapists = observer(
  ({
    therapist,
    therapists,
    dt,
  }: {
    therapist: any
    therapists: any
    dt: Array<Therapist> | null | undefined
  }) => {
    const { width } = useWindowDimensions()
    const { scrollY } = useWindowScroll()
    useEffect(() => {
      setTimeout(() => {
        const smooth = document.querySelector('.smooth')
        const therapists = smooth!.querySelector('.therapists')
        const title = smooth!.querySelector(
          dt!.length > 1
            ? '.therapists__container.two .therapists__title'
            : '.therapists__container.one .therapists__title',
        )

        const button = smooth!.querySelector('.therapists .button')
        const text = smooth!.querySelector('.therapists__text')
        const bottom = smooth!.querySelector('.therapists__bottom')
        const items = smooth!.querySelectorAll('.therapists__item')
        const list = smooth!.querySelector('.therapists__list')
        var bodyRect = smooth!.getBoundingClientRect(),
          elemRect = therapists!.getBoundingClientRect(),
          offset = elemRect.top - bodyRect.top
        if (scrollY > offset - 1000) {
          therapists?.classList.add('animated')
          title?.classList.add('animated')
          text?.classList.add('animated')
          button?.classList.add('animated')
          bottom?.classList.add('animated')
        }
        if (list) {
          if (scrollY > offset - 800) {
            items.forEach((i, id) => {
              i?.classList.add('animated')
              ;(i as HTMLDivElement).style.transitionDelay = `${id / 8 + 0.5}s`
            })
            setTimeout(() => {
              smooth!
                .querySelector('.therapists .slick-dots')
                ?.classList.add('animated')
            }, 300)
          }
        }
      }, 0)
    }, [dt, scrollY])

    useEffect(() => {
      if (width <= 480) {
        const container = document.querySelector('.therapists')
        const vect = document.querySelector('.therapists__vector')
        const smooth = document.querySelector('.smooth')
        var bodyRect = smooth!.getBoundingClientRect(),
          elemRect = vect!.getBoundingClientRect(),
          contRect = container!.getBoundingClientRect(),
          offset = contRect.top - bodyRect.top,
          offsetBottom = contRect.top + contRect.height / 3

        if (scrollY >= offset && scrollY <= offsetBottom) {
          requestAnimationFrame(() => {
            ;(vect as HTMLElement).style.transform = `translate3d(0, ${
              scrollY - offset
            }px, 0) rotateY(180deg)`
          })
        }
      }
    }, [width, scrollY])

    if (!dt) return <></>

    const { links: linksL } = useContentState()
    let therapistsL = ''
    if (linksL) {
      therapistsL = linksL.find((l: any) => l.id == 268)?.link
    }

    return (
      <section className="therapists">
        <Vector className="therapists__vector" />
        {dt?.length == 1 ? (
          <div className="therapists__container one">
            {width <= 768 && (
              <div style={{ overflow: 'hidden' }}>
                <div
                  className="therapists__title"
                  dangerouslySetInnerHTML={{
                    __html: therapist.title,
                  }}
                ></div>
              </div>
            )}

            <a
              className="therapists__item big"
              href={`${therapistsL}/${dt[0].link}`}
            >
              <div className="therapists__item-img">
                <ImageComponent src={dt[0].img} alt={dt[0].alt || ''} />
              </div>
              <div className="therapists__item-info">
                <div className="therapists__item-title">{dt[0].name}</div>
                <div className="therapists__item-text">{dt[0].position}</div>
              </div>
            </a>
            <div className="therapists__block">
              {width > 768 && (
                <div
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                  }}
                >
                  <div
                    className="therapists__title"
                    dangerouslySetInnerHTML={{
                      __html: therapist.title,
                    }}
                  ></div>
                </div>
              )}
              <div
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: width > 768 ? 'flex-start' : 'center',
                }}
              >
                <div
                  className="therapists__text"
                  dangerouslySetInnerHTML={{
                    __html: therapist.text,
                  }}
                ></div>
              </div>
              <div className="therapists__bottom">
                <a
                  rel="noreferrer"
                  className=" button blue p18p40"
                  target={'_blank'}
                  href={therapists.buttonLinkOne}
                >
                  <div className="button__text">
                    {therapists.buttonTitleOne}
                  </div>
                </a>
                <a
                  href={`${therapistsL}/${dt![0].link}`}
                  className="therapists__more"
                >
                  Read More <Arrow />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="therapists__container two">
            <div className="therapists__container-top">
              <div className="therapists__container-col">
                <div>
                  <div
                    className="therapists__title"
                    dangerouslySetInnerHTML={{
                      __html: therapists.title,
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: width <= 768 ? 'flex-start' : 'center',
                  }}
                >
                  <div
                    className="therapists__text"
                    dangerouslySetInnerHTML={{
                      __html: therapists.text,
                    }}
                  ></div>
                </div>
              </div>
              {width >= 1024 && (
                <a
                  href={therapists.buttonLink}
                  className="p18p40 black-border button"
                >
                  <div className="button__text">
                    {therapists.buttonTitle} <Arrow />
                  </div>
                </a>
              )}
            </div>
            <CheckerItemsInsideCont
              container=".therapists"
              child={'.therapists__item'}
              slider={
                <div className="therapists__list">
                  <CustomSlider
                    autoPlay
                    countItems={dt.length}
                    block="therapists"
                    slidesToShow={
                      width >= 1440
                        ? 4
                        : width <= 1024 && width > 768
                        ? 2
                        : width <= 768
                        ? 1
                        : 3
                    }
                    slidesToScroll={
                      width >= 1440
                        ? 4
                        : width <= 1024 && width > 768
                        ? 2
                        : width <= 768
                        ? 1
                        : 3
                    }
                  >
                    {dt.map((i, id) => (
                      <a
                        className="therapists__item small"
                        key={id}
                        href={
                          dt.length == 1
                            ? `${therapistsL}/${dt![0].link}`
                            : therapists.buttonLink
                        }
                      >
                        <div className="therapists__item-img">
                          <ImageComponent src={i.img} alt={i.alt||""} />
                        </div>
                        <div className="therapists__item-info">
                          <div className="therapists__item-title">{i.name}</div>
                          <div className="therapists__item-text">
                            {i.position}
                          </div>
                        </div>
                      </a>
                    ))}
                  </CustomSlider>
                </div>
              }
              list={
                <div className="therapists__list list-row">
                  {dt.map((i, id) => (
                    <a
                      className="therapists__item small"
                      key={id}
                      href={`${therapistsL}/${i.link}`}
                    >
                      <div className="therapists__item-img">
                        <ImageComponent src={i.img} alt={i.alt||""} />
                      </div>
                      <div className="therapists__item-info">
                        <div className="therapists__item-title">{i.name}</div>
                        <div className="therapists__item-text">
                          {i.position}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              }
              countOfChidlren={dt.length}
            />
            {width <= 1024 && (
              <a
                href={therapists.buttonLink}
                className="p18p40 black-border button"
              >
                <div className="button__text">
                  {therapists.buttonTitle} <Arrow />
                </div>
              </a>
            )}
          </div>
        )}
      </section>
    )
  },
)

export default Therapists
