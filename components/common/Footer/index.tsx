import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'
import ImageComponent from '../ImageComponent'

import Logo from '../../../assets/logo.svg'
import { useContentState } from '../../../hooks/RootStoreProvider'
const Footer = observer(() => {
  const { width } = useWindowDimensions()
  const { menu, therapists } = useContentState()

  useEffect(() => {
    setTimeout(() => {
      const footer = document.querySelector('.footer')

      if (!footer) return

      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ;(footer as any)?.classList.add('animated')
          } else {
          }
        },
        {
          root: null,
          threshold: 0.1,
        },
      )

      observer.observe(footer)
    }, 300)
  }, [])

  const { links } = useContentState()
  let main = '',
    therapist = ''
  if (links) {
    main = links?.find((l: any) => l.id == 2)?.link
    therapist = links?.find((l: any) => l.id == 268)?.link
  }

  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__col grow">
          <Logo
            className="footer__logo"
            onClick={() => (window.location.href = main)}
          />

          {width > 550 && (
            <>
              <div
                className="footer__text grey link"
                onClick={() => {
                  window.location.href = `tel:${(menu as any)?.phone}`
                }}
              >
                {(menu as any)?.phone}
              </div>
              <div
                className="footer__text grey"
                dangerouslySetInnerHTML={{
                  __html: (menu as any)?.location.text,
                }}
              ></div>
            </>
          )}
        </div>
        <div className="footer__col w50p mr0">
          <div className="footer__sub-title ">{(menu as any).navTitle}</div>
          {(menu as any).nav?.map((n: any, i: number) => (
            <a
              href={
                n.link.includes(therapist)
                  ? therapist + '/' + therapists[0].link
                  : n.link
              }
              className="footer__text link"
              key={i}
            >
              {n.title}
            </a>
          ))}
        </div>
        <div className="footer__col mr0 w50p">
          <div className="footer__sub-title">{(menu as any).infoTitle}</div>
          {}
          {(menu as any).info?.map((n: any, i: number) => (
            <a href={n.link} className="footer__text link" key={i}>
              {n.title}
            </a>
          ))}
        </div>
        <div className="footer__col mr0 grow">
          <div className="footer__sub-title">{(menu as any).followTitle}</div>
          {}
          <div className="footer__sub-socials">
            {(menu as any).follow?.map((f: any, i: number) => (
              <a
                key={i}
                className="footer__text social"
                href={f.link}
                target={'__blank'}
                rel="noreferrer"
                title={f.link}
              >
                <ImageComponent src={f.icon} alt={f.alt} />
              </a>
            ))}
          </div>
          {width > 550 && (
            <>
              <div className="footer__sub-title">
                {(menu as any)?.emailTitle}
              </div>

              <div
                className="footer__text link"
                onClick={() =>
                  (window.location.href = `mailto: ${(menu as any)?.email}`)
                }
              >
                {(menu as any)?.email}
              </div>
            </>
          )}
        </div>{' '}
        {width <= 550 && (
          <>
            <div className="footer__col w50p">
              <div className="footer__sub-title mb16">
                {(menu as any)?.phoneTitle}
              </div>
              {}
              <div
                className="footer__text link"
                onClick={() => {
                  window.location.href = `tel:${(menu as any)?.phone}`
                }}
              >
                {(menu as any)?.phone}
              </div>
            </div>
            <div className="footer__col w100p mr0">
              <div className="footer__sub-title">
                {(menu as any)?.emailTitle}
              </div>
              <div
                className="footer__text link"
                onClick={() =>
                  (window.location.href = `mailto: ${(menu as any)?.email}`)
                }
              >
                {(menu as any)?.email}
              </div>
            </div>

            <div className="footer__col w100p">
              <div className="footer__sub-title mb16">
                {(menu as any)?.sheduleTitle}
              </div>
              <div
                className="footer__text"
                dangerouslySetInnerHTML={{
                  __html: (menu as any)?.location.text,
                }}
              ></div>
            </div>
          </>
        )}
      </div>
      {width <= 550 && (
        <div className="footer__sub-title mb16">
          {(menu as any)?.locationTitle}
        </div>
      )}
      <div
        className="footer__text grey link-locat"
        dangerouslySetInnerHTML={{
          __html: (menu as any)?.shedule,
        }}
      ></div>

      <div className="footer__row last">
        <div className="footer__sub-text copy">
          Copyright © {new Date().getFullYear()} Phinity Therapy. All Rights
          Reserved.
        </div>
        <div className="footer__col">
          {(menu as any)?.bottomLinks?.map((c: any, i: any) => (
            <a
              href={c.link}
              className={classNames(
                'footer__sub-text link',
                i + 1 != (menu as any)?.bottomLinks.length && 'mr32',
              )}
              key={i}
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
})

export default Footer
