import { observer } from 'mobx-react'
import File from '../../../../assets/contact/Regular.svg'
import Warn from '../../../../assets/contact/warn.svg'
import User from '../../../../assets/contact/Component 95.svg'
import SMS from '../../../../assets/contact/Component 95 (1).svg'
import { useEffect, useState } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import Button from '../../../common/Button'
import CheckBox from '../../../common/CheckBox'
import { DOMAIN } from '../../../../mocks/doman'
import { useRouter } from 'next/router'
const CVForm = observer(({ job }: { job: any }) => {
  const { pathname } = useRouter()

  const [st, setState] = useState<any>({
    name: '',
    isNameFocus: false,
    file: null,
    email: '',
    msg: '',
    isCheck: false,
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  })

  const emailValidate = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  let thanks = ''
  const linksL = GlobalState.links
  if (linksL) {
    thanks = linksL.find((l: any) => l.id == 635).link
  }

  const submit = () => {
    if (!st.isCheck) return
    let errs = {
      name: st.name.length ? '' : 'Fill field',
      email: !st.email.length
        ? 'Fill field'
        : emailValidate(st.email)
        ? ''
        : 'Incorrect email',
    }
    if (errs.email.length || errs.name.length) {
      setErrors({ ...errors, ...errs })
      return
    }
    const fd = new FormData()
    fd.append('firstname', st.name)
    fd.append('email', st.email)
    fd.append('file', st.file, st.file.name)
    fd.append('message', st.msg)
    fd.append('link', pathname!.split('/').pop()!)
    fd.append('status', 'mail2')
    setErrors({ ...errors, ...errs })
    fetch(DOMAIN + 'react/', {
      method: 'POST',
      body: fd,
    }).then(() => {
      window.location.href = thanks
    })
  }
  const fileLoad = (e: any) => {
    var reader = new FileReader()
    var url = reader.readAsDataURL(e.target.files[0])
    setState({
      ...st,
      file: e.target.files[0],
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', (args: any) => {
      const smooth = document.querySelector('.smooth')
      if (!smooth) return
      const issues = smooth!.querySelector('.cv-form')

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = issues!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top

      if (window.scrollY > offset - 800) {
        issues?.classList.add('animated')
      }
    })
  }, [job])

  const links = GlobalState.links
  let privacy = '',
    terms = ''
  if (links) {
    privacy = links.find((l: any) => l.id == 3).link
    terms = links.find((l: any) => l.id == 591).link
  }

  if (!job) return <></>
  return (
    <section className="cv-form">
      <div className="cv-form__container">
        <form className="cv-form__form" onSubmit={(e) => e.preventDefault()}>
          <div
            className="cv-form__subtitle"
            dangerouslySetInnerHTML={{ __html: job.form.subtitle }}
          ></div>
          <div
            className="cv-form__title"
            dangerouslySetInnerHTML={{ __html: job.form.title }}
          ></div>
          <div className="contact-block__col full">
            <div className="contact-block__col-input">
              <User />
              <input
                className="input"
                placeholder="Name"
                onChange={(e) => setState({ ...st, name: e.target.value })}
              />
            </div>
            <div className="contact-block__error">
              {errors.name.length ? <Warn /> : ''}
              {errors.name}
            </div>
          </div>
          <div className="contact-block__col full">
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
          <div className="contact-block__col full">
            <div className="contact-block__col-input">
              <textarea
                className="input big"
                placeholder="Enter your message"
                onChange={(e) => setState({ ...st, msg: e.target.value })}
              />
            </div>
          </div>
          <div className="cv-form__file">
            <label>
              <File />
              <input
                type={'file'}
                className="input-file"
                onChange={fileLoad}
                accept=".doc,.docx,.pdf"
              />
              <div className="cv-form__file-title cursor">Attach Your CV</div>
              <div className="cv-form__file-text">(Word Document or PDF)</div>
            </label>
            {st.file && (
              <div className="cv-form__file-title mt12 capitalize">
                {st.file?.name} is attached
              </div>
            )}
          </div>
          <label className="cv-form__apply">
            <div className="cv-form__checkbox">
              <CheckBox
                text={
                  <>
                    By Checking This Box You Confirm That You Have Read And
                    Accept Our <a href={terms}> Terms of Use </a> And{' '}
                    <a href={privacy}> Privacy Policy </a>
                  </>
                }
                change={(value) => setState({ ...st, isCheck: value })}
                ischeck={st.isCheck}
              />
            </div>
          </label>
          <Button
            classname="light-blue"
            text={'Send'}
            click={submit}
            type="submit"
          />
        </form>
        <div className="cv-form__col">
          <div
            className="cv-form__col-text"
            dangerouslySetInnerHTML={{ __html: job.form.p1 }}
          ></div>
          <div
            className="cv-form__col-title"
            dangerouslySetInnerHTML={{
              __html: job.form.emailTitle,
            }}
          ></div>
          <div
            className="cv-form__link mb56"
            onClick={() =>
              (window.location.href = `mailto:${job.form.email}`)
            }
          >
            {job.form.email}
          </div>
        </div>
      </div>
    </section>
  )
})

export default CVForm
