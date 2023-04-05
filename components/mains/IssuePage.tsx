import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { Service } from '../../api/mocks/services'
import References from '../common/References'
import BookBlock from '../pages/home/BookBlock'
import Reviews from '../pages/home/Reviews'
import Therapists from '../pages/home/Therapists'
import CanHelp from '../pages/issue/CanHelp'
import Services from '../pages/issue/Services'
import Symptoms from '../pages/issue/Symptoms'
import AboutService from '../pages/service/AboutService'
import TherapyHelp from '../pages/service/TherapyHelp'
import Intro from '../pages/services/Intro'
import PopularPosts from '../pages/video/PopularPosts'
import PopularVideos from '../pages/videos/PopularVideos'
import GlobalState from '../../stores/GlobalState'
import { useWindowDimensions } from '../../hooks/getWindowDimensions'
import Layout from '../common/Layout'
import { getTherapists } from '../../stores/DBStore'
import { useContentState } from '../../hooks/RootStoreProvider'
import Subscribe from '../common/Subscribe'

const IssuePage = observer(({ data }: { data: any }) => {
  const { width } = useWindowDimensions()
  const { links: linksL } = useContentState()
  const [dt, setDt] = useState([])
  useEffect(() => {
    getTherapists().then((res) => {
      setDt(res)
    })
  }, [])

  let main = '',
    issuesL = ''
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link
    issuesL = linksL.find((l: any) => l.id == 266)?.link
  }

  const links = [
    {
      title: data.issueC.intro.mainPageTitle,
      link: main,
    },
    {
      title: data.issueC.intro.pageTitle,
      link: issuesL,
    },
    {
      title: `${data.issue?.title}`,
      link: '/',
    },
  ]

  let services: Array<Service> = []

  if (data.issueC.services) {
    services = JSON.parse(JSON.stringify(data.issueC.services))
    services = services.sort((a, b) => a.title.localeCompare(b.title))
  }
  return (
    <>
      <Layout withScroll isTranslate>
        <Intro
          dt={{
            ...data.issueC.intro,
            title: data.issue?.title,
          }}
          links={links}
          classname="service-page"
        />
        <AboutService
          classname="issue"
          dt={data.issueC.about}
          service={data.issueC}
        />
        <Symptoms />
        <CanHelp />
        <Services title={data.issueC.serviceTitle} dt={data.issueC.services} />
        <TherapyHelp dt={data.issueC.therapyHelp} home={data.home} />
        <Therapists
          dt={dt}
          therapist={data.issueC.therapist}
          therapists={data.issueC.therapists}
        />
        <Reviews dt={data.issueC.reviews} />
        <PopularPosts
          content={{
            title: data.issueC.blogTitle,
            buttonTitle: data.issueC.blogButton,
          }}
        />
        <PopularVideos content={data.issueC.video} />
        <References dt={data.issueC.refs} />
        <BookBlock />
        <Subscribe />
      </Layout>
    </>
  )
})

export default IssuePage
