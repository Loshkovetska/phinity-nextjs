import { useEffect, useRef, useState } from 'react'
import Reviews from '../pages/home/Reviews'
import AboutContent from '../pages/about/AboutContent'
import AboutPhinity from '../pages/about/AboutPhinity'
import OurTeam from '../pages/about/OutTeam'
import Phylosophy from '../pages/about/Phylosophy'
import PhinityAdvantages from '../pages/services/PhitityAdvantages'
import ChooseUs from '../pages/about/ChooseUs'
import OurClinic from '../pages/about/OurClinic'
import Contact from '../pages/about/Contact'
import { observer } from 'mobx-react'
import Layout from '../common/Layout'

const AboutPage = observer(
  ({ dt: { dt, reviews, menu, book } }: { dt: any }) => {
    const [loading, setLoading] = useState(false)
    const ref = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!loading) {
        if (typeof window === 'undefined' || !window.document) {
          return
        }
      }
    }, [loading])

    

    return (
      <>
        <Layout withVideo={false}>
          <AboutContent
            about={{
              ...dt.intro,
              mainPageTitle: dt.mainPageTitle,
              pageTitle: dt.pageTitle,
            }}
          />
          <AboutPhinity phinity={dt.phinity} />
          <OurTeam team={dt.team} />
          <Phylosophy phylosophy={dt.phylosophy} />
          <OurClinic clinic={dt.clinic} />
          <PhinityAdvantages dt={dt.advantages} />
          <ChooseUs chooseUs={dt.chooseUs} />
          <Reviews dt={dt.reviews} />
          <Contact dt={dt.contact} />
        </Layout>
      </>
    )
  },
)

export default AboutPage
