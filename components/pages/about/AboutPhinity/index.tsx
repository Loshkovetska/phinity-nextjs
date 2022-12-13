import { observer } from 'mobx-react'
import { useEffect } from 'react'

const AboutPhinity = observer(({phinity}:{phinity:any}) => {
  // useEffect(() => {
  //     const smooth = document.querySelector('.smooth')
  //     const images = smooth!.querySelector('.about-phinity__col.images')
  //     setTimeout(() => {
  //       images?.classList.add('animated')
  //     }, 1000)
  //     setTimeout(() => {
  //       window.addEventListener('scroll', () => {
  //         const issues = smooth!.querySelector('.about-phinity')

  //         const title = smooth!.querySelector('.about-phinity__title')
  //         const text = smooth!.querySelector('.about-phinity__text')

  //         var bodyRect = smooth!.getBoundingClientRect(),
  //           elemRect = issues!.getBoundingClientRect(),
  //           offset = elemRect.top - bodyRect.top

  //         if (window.scrollY > offset - 1000) {
  //           title?.classList.add('animated')
  //           text?.classList.add('animated')

  //           if (window.innerWidth <= 768) {
  //             const btn = smooth!.querySelector('.about-phinity .button')
  //             btn?.classList.add('animated')
  //           }
  //         }
  //       })
  //     }, 1000)
  // }, [])

  if (!phinity) return <></>

  return (
    <section className="about-phinity">
      <div className="about-phinity__col images">
        <img
          src={phinity.img1}
          className="about-phinity__img left"
          alt={phinity.title}
        />
        <img
          src={phinity.img2}
          className="about-phinity__img right"
          alt={phinity.title}
        />
      </div>
      <div className="about-phinity__col">
        <div style={{ overflow: 'hidden' }}>
          <div className="about-phinity__title">
            {phinity.title}
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="about-phinity__text"
            dangerouslySetInnerHTML={{
              __html: phinity.text,
            }}
          ></div>
        </div>
     
      </div>
    </section>
  )
})

export default AboutPhinity
