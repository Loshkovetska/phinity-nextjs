import { observer } from 'mobx-react'
import Intro from '../pages/services/Intro'
import Reviews from '../pages/home/Reviews'
import ContactContent from '../pages/contact/ContactContent'
import Location from '../pages/contact/Location'
import Contact from '../pages/about/Contact'
import GlobalState from '../../stores/GlobalState'
import { useWindowDimensions } from '../../hooks/getWindowDimensions'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
const ContactPage = observer(({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions()

  let main = '',
    vacanc = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
    vacanc = linksL.find((l: any) => l.id == 262).link
  }

  const content = useContentState()

  return (
    <>
      <Layout withScroll withVideo={false}>
        <Intro
          classname="services-page contact"
          dt={{
            ...content.contact.intro,
            buttonText: content.contact.intro.buttonText,
            buttonLink: content.contact.intro.buttonLink,
          }}
          links={[
            { title: content.contact.mainPageTitle, link: main },
            { title: content.contact.pageTitle, link: '/contacts' },
          ]}
        />
        <ContactContent />
        <Location />
        <Reviews dt={content.contact.reviews} />
        <Contact dt={content.about.contact} />
      </Layout>
    </>
  )
})

export default ContactPage
