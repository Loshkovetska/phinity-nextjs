import { observer } from 'mobx-react'
import PageLinks from '../../../common/PageLinks'
import DBStore from '../../../../stores/DBStore'
import GlobalState from '../../../../stores/GlobalState'
import { useEffect, useState } from 'react'
import ReviewWidget from '../../../common/ReviewWidget'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import ImageComponent from '../../../common/ImageComponent'
const Intro = observer(({ therapist }: { therapist: any }) => {
  const content = useContentState()
  const { width } = useWindowDimensions()

  let main = '',
    thera = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
    thera = linksL.find((l: any) => l.id == 268).link
    if (content.therapists.length == 1) {
      thera = thera + '/' + content.therapists[0].link
    }
  }

  const links = [
    {
      title: therapist.mainPageTitle,
      link: main,
    },
    {
      title: therapist.pageTitle,
      link: thera,
    },
    {
      title: `${content.therapist?.name}`,
      link: '/',
    },
  ]

  return (
    <section className="therapist-intro  ">
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w31"
      />
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w25"
      />
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w71"
      />
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w72"
      />
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w120"
      />
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w185"
      />
      <img
        src="/Ellipse 67.svg"
        alt={content.therapist?.name}
        className="therapist-intro__vector w254"
      />
      <div className="therapist-intro__container">
        <PageLinks links={links} />
        <div className="therapist-intro__content">
          <div className="therapist-intro__col">
            <h1 className="therapist-intro__title ">
              {content.therapist?.name.split(' ').map((s: any, i: number) => (
                <span key={i}>{s}</span>
              ))}
            </h1>
            <div className="therapist-intro__position ">
              {content.therapist?.position}
            </div>
            <ReviewWidget />
            <div className="therapist-intro__col-bottom">
              <a
                rel="noreferrer"
                className="button blue p18p40  "
                href={therapist.buttonLink}
                target="_blank"
              >
                <div className="button__text">{therapist.buttonTitle}</div>
              </a>
            </div>
            <ReviewWidget />
          </div>
          <div className="therapist-intro__img ">
            <ImageComponent
              src={content.therapist?.img}
              alt={content.therapist?.name}
            />
            <img
              src="/ther-vectors.svg"
              alt={content.therapist?.name}
              className="therapist-intro__vectors"
            />
          </div>{' '}
        </div>
      </div>
    </section>
  )
})

export default Intro
