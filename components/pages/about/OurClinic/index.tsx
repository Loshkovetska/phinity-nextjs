import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import VectorDesk from '../../../../assets/Vector 4.svg'

import Vector from '../../../../assets/clinic.svg'
import CustomSlider from '../../../common/CustomSlider'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'

const OurClinic = observer(({ clinic }: { clinic: any }) => {
  const { width } = useWindowDimensions()
  useEffect(() => {
    document.querySelector('.phinity-adv')?.classList.add('clinic')
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const smooth = document.querySelector('.smooth')
      const issues = smooth!.querySelector('.our-clinic')
      const items = smooth!.querySelectorAll('.our-clinic__item')
      const title = smooth!.querySelector('.our-clinic__title')
      const text = smooth!.querySelector('.our-clinic__text')
      const btn = smooth!.querySelector('.our-clinic .slick-dots')
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = issues!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top

      if (window.scrollY > offset - 1000) {
        issues?.classList.add('animated')
        title?.classList.add('animated')
        text?.classList.add('animated')

        items.forEach((i, id) => {
          i?.classList.add('animated')
          ;(i as any).style.transitionDelay = `${id / 5 + 1}s`
        })

        setTimeout(() => {
          btn?.classList.add('animated')
        }, 300)
      }
    })
  }, [])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const cont = document.querySelector('.our-clinic')
    const next = cont?.nextElementSibling
    const v2 = document.querySelector(
      `.our-clinic__vector.${window.innerWidth > 768 ? 'desk' : 'mob'}`,
    )
    var bodyRect = smooth!.getBoundingClientRect(),
      nextRect = next!.getBoundingClientRect(),
      contRect = cont!.getBoundingClientRect()
    var offset = contRect.top - bodyRect.top,
      offsetBottom = nextRect.top - v2!.getBoundingClientRect().height

    window.addEventListener('scroll', () => {
      if (window.scrollY >= offset && window.scrollY <= offsetBottom) {
        ;(v2 as HTMLElement).style.transform = `translate3d(0, ${
          window.scrollY - offset
        }px, 0) ${window.innerWidth > 768 ? 'rotate(180deg)' : ''}`
      }
    })
  }, [])

  if (!clinic) return <></>
  return (
    <section className="our-clinic">
      <VectorDesk className="our-clinic__vector desk" />
      <Vector className="our-clinic__vector mob" />
      <div className="our-clinic__container">
        <div className="our-clinic__top">
          <div style={{ overflow: 'hidden' }}>
            <div
              className="our-clinic__title"
              dangerouslySetInnerHTML={{
                __html: clinic.title,
              }}
            ></div>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div
              className="our-clinic__text"
              dangerouslySetInnerHTML={{
                __html: clinic.text,
              }}
            ></div>
          </div>
        </div>

        <CheckerItemsInsideCont
          child=".our-clinic__item"
          container=".our-clinic"
          countOfChidlren={clinic.images?.length || 0}
          slider={
            <div className="our-clinic__list">
              <CustomSlider
                slidesToShow={width > 1024 ? 2 : 1}
                slidesToScroll={1}
                variableWidth={true}
                countItems={clinic.images?.length}
                block="clinic"
              >
                {clinic.images?.map((l: any, id: number) => (
                  <div className="our-clinic__item" key={id}>
                    <img
                      src={l.src?.replaceAll('admin.', '')}
                      alt={l.alt}
                      loading="lazy"
                    />
                  </div>
                ))}
              </CustomSlider>
            </div>
          }
          list={
            <div className="our-clinic__list our-clinic__list-center">
              {clinic.images?.map((l: any, id: number) => (
                <div className="our-clinic__item" key={id}>
                  <img src={l.src?.replaceAll('admin.', '')} alt={l.alt} loading="lazy" />
                </div>
              ))}
            </div>
          }
        />
      </div>
    </section>
  )
})
export default OurClinic
