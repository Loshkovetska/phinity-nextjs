import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { Issue } from '../../api/mocks/issues'
import References from '../common/References'
import Videos from '../pages/blog/Videos'
import Blogs from '../pages/home/Blogs'
import BookBlock from '../pages/home/BookBlock'
import Issues from '../pages/home/Issues'
import Therapists from '../pages/home/Therapists'
import AboutService from '../pages/service/AboutService'
import AboutSphere from '../pages/service/AboutSphere'
import TherapyHelp from '../pages/service/TherapyHelp'
import Intro from '../pages/services/Intro'
import DBStore, {
  getTherapists} from '../../stores/DBStore'
import GlobalState, { getReviewsIO } from '../../stores/GlobalState'
import { useWindowDimensions } from '../../hooks/getWindowDimensions'
import Layout from '../common/Layout'

const ServicePage = observer(({ data }: { data: any }) => {
  const { width } = useWindowDimensions()

  const [theraps, setDt] = useState([])
  useEffect(() => {
    getTherapists().then((res) => {
      setDt(res)
    })
  }, [])

  let main = '',
    servL = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
    servL = linksL.find((l: any) => l.id == 264).link
  }
  const links = [
    {
      title: data.serviceC.intro.mainPageTitle,
      link: main,
    },
    {
      title: data.serviceC.intro.pageTitle,
      link: servL,
    },
    {
      title: `${data.service.title}`,
      link: '/',
    },
  ]

  const dt = {
    title: data.serviceC.intro.title,
    text: data.serviceC.intro.text,
    buttonText: data.serviceC.intro.buttonText,
    buttonLink: data.serviceC.intro.buttonLink,
  }

  let issues: Array<Issue> = []
  if (data.serviceC.issues.list) {
    issues = JSON.parse(JSON.stringify(data.serviceC?.issues?.list))
  }
  return (
    <>
      <Layout withScroll isTranslate>
        <Intro dt={dt} links={links} classname="service-page" />
        <AboutService dt={data.serviceC.about} service={data.serviceC} />
        <AboutSphere />
        <Issues
          classname="service-page"
          dt={data.serviceC.issues}
          arr={issues.sort((a: Issue, b: Issue) =>
            a.title.localeCompare(b.title),
          )}
        />
        <TherapyHelp dt={data.serviceC.help} home={data.home} />
        <Therapists
          dt={theraps}
          therapist={data.serviceC.therapist}
          therapists={data.serviceC.therapists}
        />
        <Blogs
          arr={data.posts}
          dt={{
            title: data.serviceC.blogTitle,
            buttonTitle: data.serviceC.blogButton,
          }}
        />
        <Videos arr={data.videos} dt={data.serviceC.video} />
        <References dt={data.serviceC.refs} />
        <BookBlock />
      </Layout>
    </>
  )
})

export default ServicePage
