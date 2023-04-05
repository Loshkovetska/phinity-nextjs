import classNames from 'classnames'
import { observer } from 'mobx-react'

import GlobalState, { changeMenuState } from '../../../stores/GlobalState'

import Arrow from '../../../assets/caret-right.svg'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'
import ImageComponent from '../ImageComponent'
import { useContentState } from '../../../hooks/RootStoreProvider'

const Navigation = observer(() => {
  const { width } = useWindowDimensions()
  const { pathname } = useRouter()
  const { menu, therapists, links } = useContentState()

  useEffect(() => {
    if (GlobalState.isMenuOpen) {
      document.body.classList.add('hidden')
    } else document.body.classList.remove('hidden')
  }, [GlobalState.isMenuOpen])

  let therapist = ''
  if (links) {
    therapist = links?.find((l: any) => l.id == 268).link
  }
  return (
    <nav className={classNames('navigation', GlobalState.isMenuOpen && 'open')}>
      {(menu as any)?.list?.map((m: any, i: number) => (
        <a
          key={i}
          href={
            m.link.includes(therapist)
              ? therapist + '/' + therapists[0].link
              : m.link
          }
          className={classNames(
            'navigation__link',
            pathname.trim() == m.link.trim() && 'active',
            i + 1 == menu.list.length && 'last',
          )}
          onClick={() => {
            window.innerWidth <= 1120 && changeMenuState()
          }}
        >
          {m.title} <Arrow />
        </a>
      ))}
      <div className="navigation__socials">
        <div className="navigation__title">Follow us</div>
        {(menu as any)?.follow?.map((f: any, i: number) => (
          <div
            key={i}
            className="navigation__social"
            onClick={() => window.open(f.link, '__blank')}
          >
            <span>
              <ImageComponent src={f.icon} alt={f.alt} />
            </span>
            {f.title}
          </div>
        ))}
      </div>
      <div className="navigation__contacts">
        <div className="navigation__title">Contact Us</div>
        <div
          className="navigation__contact"
          onClick={() => (window.location.href = `tel:${(menu as any)?.phone}`)}
        >
          {(menu as any)?.phone}
        </div>
        <div
          className="navigation__contact"
          onClick={() =>
            (window.location.href = `mailto:${(menu as any)?.email}`)
          }
        >
          {(menu as any)?.email}
        </div>
      </div>
      <a
        href={(menu as any)?.bookLink}
        className="black-border p15p40 button"
        target={'__blank'}
      >
        <div className="button__text">{(menu as any)?.bookTitle}</div>
      </a>
    </nav>
  )
})

export default Navigation
