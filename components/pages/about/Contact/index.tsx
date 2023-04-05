import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import Button from '../../../common/Button'
import Warn from '../../../../assets/contact/warn.svg'
import User from '../../../../assets/contact/Component 95.svg'
import SMS from '../../../../assets/contact/Component 95 (1).svg'
import Tel from '../../../../assets/contact/Component 95 (2).svg'
import { DOMAIN } from '../../../../mocks/doman'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const Contact = observer(({ dt }: { dt: any }) => {
  const [st, setState] = useState({
    name: '',
    isNameFocus: false,
    lastname: '',
    email: '',
    phone: '',
    msg: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
  })

  const emailValidate = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  const { links: linksL } = useContentState()
  let thanks = ''
  if (linksL) {
    thanks = linksL.find((l: any) => l.id == 635)?.link
  }
  const submit = () => {
    let errs = {
      name: st.name.length ? '' : 'Fill field',
      lastname: st.lastname.length ? '' : 'Fill field',
      email: !st.email.length
        ? 'Fill field'
        : emailValidate(st.email)
        ? ''
        : 'Incorrect email',
      phone:
        st.phone.length && isNaN(+st.phone.replaceAll(' ', ''))
          ? 'Incorrect number'
          : !st.phone.length
          ? 'Fill field'
          : '',
    }
    if (
      errs.email.length ||
      errs.name.length ||
      errs.phone.length ||
      errs.lastname.length
    ) {
      setErrors({ ...errors, ...errs })
      return
    }
    const fd = new FormData()
    fd.append('firstname', st.name)
    fd.append('lastname', st.lastname)
    fd.append('email', st.email)
    fd.append('phone', st.phone)
    fd.append('message', st.msg)
    fd.append('status', 'mail')
    fetch(DOMAIN + 'react/', {
      method: 'POST',
      body: fd,
    }).then(() => (window.location.href = thanks))
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const smooth = document.querySelector('.smooth')
      if (!smooth) return

      const issues = smooth!.querySelector('.contact-block')
      if (!issues) return

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = issues!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top

      if (window.scrollY > offset - 1000) {
        issues?.classList.add('animated')
      }
    })
  }, [])

  const { links } = useContentState()
  let term = ''
  if (links) {
    term = links.find((l: any) => l.id == 591)?.link
  }

  if (!dt) return <></>

  return (
    <section className="contact-block">
      <div className="contact-block__container">
        <div
          className="contact-block__title"
          dangerouslySetInnerHTML={{ __html: dt.title }}
        ></div>
        <div
          className="contact-block__text"
          dangerouslySetInnerHTML={{ __html: dt.text }}
        ></div>
        <form
          className="contact-block__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="contact-block__row">
            <div className="contact-block__col mr20">
              <div className="contact-block__col-input">
                <User />
                <input
                  className="input"
                  placeholder="First Name"
                  onChange={(e) => setState({ ...st, name: e.target.value })}
                />
              </div>
              <div className="contact-block__error">
                {errors.name.length ? <Warn /> : ''}
                {errors.name}
              </div>
            </div>
            <div className="contact-block__col">
              <div className="contact-block__col-input">
                <User />
                <input
                  className="input"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setState({ ...st, lastname: e.target.value })
                  }
                />
              </div>
              <div className="contact-block__error">
                {errors.lastname.length ? <Warn /> : ''}
                {errors.lastname}
              </div>
            </div>
          </div>
          <div className="contact-block__row">
            <div className="contact-block__col mr20">
              <div className="contact-block__col-input">
                <SMS />
                <input
                  placeholder="Email"
                  className="input"
                  type="email"
                  onChange={(e) => setState({ ...st, email: e.target.value })}
                />
              </div>
              <div className="contact-block__error">
                {errors.email.length ? <Warn /> : ''}
                {errors.email}
              </div>
            </div>
            <div className="contact-block__col">
              <div className="contact-block__col-input">
                <Tel />
                <input
                  type={'text'}
                  placeholder="000 0000 0000"
                  className="input"
                  onChange={(e) => {
                    setState({ ...st, phone: e.target.value })
                  }}
                />
              </div>
              <div className="contact-block__error">
                {errors.phone.length ? <Warn /> : ''}
                {errors.phone}
              </div>
            </div>
          </div>
          <div className="contact-block__row">
            <div className="contact-block__col full">
              <div className="contact-block__col-input">
                <textarea
                  className="input big"
                  placeholder="Enter your message"
                  onChange={(e) => setState({ ...st, msg: e.target.value })}
                />
              </div>
            </div>
          </div>
          <p className="contact-block__sub-text">
            To View Our Terms {'&'} Conditions Of Booking Sessions,{' '}
            <a href={term}>Click Here.</a>
          </p>
          <Button
            classname="light-blue"
            text={'Submit'}
            click={submit}
            type="submit"
          />
        </form>
      </div>
    </section>
  )
})

export default Contact
