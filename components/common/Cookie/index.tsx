import { observer } from 'mobx-react'
import Button from '../Button'
import '../../../styles/cookie.module.scss'
import Close from '../../../assets/close.svg'
import Candies from '../../../assets/ex/Frame 32101 (1).svg'
import { useEffect, useState } from 'react'
import GlobalState from '../../../stores/GlobalState'
import { getCookieContent } from '../../../stores/ContentStore'
import Cookies from 'js-cookie'
import { useContentState } from '../../../hooks/RootStoreProvider'

const Cookie = observer(() => {
  const [isShow, setShow] = useState(false)
  const { cookieCont } = useContentState()
  useEffect(() => {
    if (!cookieCont) return
    if (!Cookies.get('hideModal')) {
      setTimeout(() => {
        setShow(true)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (isShow) {
      document.querySelector('.cookie')?.classList.add('anim')
    } else {
      document.querySelector('.cookie')?.classList.remove('anim')
    }
  }, [isShow])

  const accept = () => {
    document.querySelector('.cookie')?.classList.remove('anim')
    if (document.cookie.length) {
      Cookies.set('hideModal', 'true', { expires: 7 })
    } else {
      Cookies.set('hideModal', 'true', { expires: 7 })
    }
    setShow(false)
  }

  const linksL = GlobalState.links
  let cookie = ''
  if (linksL) {
    cookie = linksL.find((l: any) => l.id == 775).link
  }

  return (
    <section className="cookie">
      <div className="cookie__container">
        <div className="cookie__top">
          <Close className="cookie__close" onClick={() => setShow(false)} />
        </div>
        <div className="cookie__content">
          <Candies className="cookie__icon" />
          <div
            className="cookie__title"
            dangerouslySetInnerHTML={{ __html: cookieCont?.title }}
          ></div>
          <div
            className="cookie__text"
            dangerouslySetInnerHTML={{ __html: cookieCont?.text }}
          ></div>
          <Button
            classname="black-border p15p40"
            click={accept}
            text={cookieCont?.buttonText}
          />
          <a className="cookie__link" href={cookie}>
            Read Cookie Policy
          </a>
        </div>
      </div>
    </section>
  )
})

export default Cookie
