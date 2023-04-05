import { observer } from 'mobx-react'
import Intro from '../pages/services/Intro'
import Reviews from '../pages/home/Reviews'
import ContactContent from '../pages/contact/ContactContent'
import Location from '../pages/contact/Location'
import Contact from '../pages/about/Contact'
import { useWindowDimensions } from '../../hooks/getWindowDimensions'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import Subscribe from '../common/Subscribe'
const ContactPage = observer(({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions()
  const { links } = useContentState()
  let main = '',
    vacanc = ''
  if (links) {
    main = links.find((l: any) => l.id == 2)?.link
    vacanc = links.find((l: any) => l.id == 262)?.link
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
        <Subscribe />
      </Layout>
    </>
  )
})

export default ContactPage
