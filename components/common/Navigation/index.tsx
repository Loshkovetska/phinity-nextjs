import classNames from 'classnames'
import { observer } from 'mobx-react'
import GlobalState, { changeMenuState } from '../../../stores/GlobalState'

import Arrow from '../../../assets/caret-right.svg'
import ArrowRight from '../../../assets/arrow-right.svg'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'
import ImageComponent from '../ImageComponent'
import { useContentState } from '../../../hooks/RootStoreProvider'

const Navigation = observer(() => {
  const { menu, therapists, links } = useContentState()

  useEffect(() => {
    if (GlobalState.isMenuOpen) {
      document.body.classList.add('hidden')
      document.querySelector('html')?.classList.add('hidden')
    } else {
      document.querySelector('html')?.classList.remove('hidden')
      document.body.classList.remove('hidden')
    }
  }, [GlobalState.isMenuOpen])

  let therapist = ''
  if (links) {
    therapist = links?.find((l: any) => l.id == 268).link
  }
  
  return (
    <nav className={classNames('navigation', GlobalState.isMenuOpen && 'open')}>
      {(menu as any)?.list?.map((m: any, i: number) => {
        return (
          <NavigationItem m={{
          ...m, link: m.link.includes(therapist)
              ? therapist + '/' + therapists[0].link
              : m.link
          }}
            i={i}
            menu={menu}
            key={i} />
      )
      })}
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


const NavigationItem = ({ m, i, menu }: { m: any, i:number, menu:any }) => {
  const { pathname } = useRouter()
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--height-list',(isOpen? ref.current.scrollHeight+32:0)+'px')
  }, [isOpen])
  
  return   <div className={classNames('navigation__item', isOpen && 'open',  i + 1 == menu.list.length && 'last',)} onClick={()=>setOpen(!isOpen)}>
         {m.list?.length > 0? <div className='navigation__link'>
            {m.title} <Arrow />
          </div>: <a
          href={m.link}
          className={classNames(
            'navigation__link',
            pathname.trim() == m.link.trim() && 'active',
           
          )}
          onClick={() => {
            window.innerWidth <= 1120 && changeMenuState()
          }}
        >
          {m.title} 
          </a>}
         
          {
      m.list?.length > 0 && <div className={classNames('navigation__submenu')}
        ref={ref}
        onClick={(e) => e.stopPropagation()}>
              <div className='navigation__submenu-cont'>
                  { m.list?.map((c: any, id: number) => (
                    <a
                      key={id}
                      href={c.link}
                      className={classNames(
                        'navigation__but',
                      )}
                      onClick={() => {
                        window.innerWidth <= 1120 && changeMenuState()
                      }}
                    >
                    {c.title}  <ArrowRight/>
                  </a>
            ))}
           </div>
            </div>
           
          }
      </div>
}