import BookBlock from '../../components/pages/home/BookBlock'
import Reviews from '../../components/pages/home/Reviews'
import Issues from '../../components/pages/home/Issues'
import Intro from '../../components/pages/therapist/Intro'
import TherapistBlock from '../../components/pages/therapist/TherapistBlock'
import Services from '../../components/pages/issue/Services'
import Contact from '../../components/pages/therapist/Contact'
import { observer } from 'mobx-react'
import { Issue } from '../../api/mocks/issues'
import { Service } from '../../api/mocks/services'
import Layout from '../common/Layout'
import Subscribe from '../common/Subscribe'

const TherapistPage = observer(({ dt }: { dt: any }) => {
  let issues: Array<Issue> = [],
    services: Array<Service> = []
  if (dt.therapistC.issues.list) {
    issues = JSON.parse(JSON.stringify(dt.therapistC.issues.list))
  }
  if (dt.therapistC.services.list) {
    services = JSON.parse(JSON.stringify(dt.therapistC.services.list))
  }

  return (
    <Layout withVideo={false}>
      <Intro therapist={dt.therapistC} />
      <TherapistBlock therapist={dt.therapistC} />
      {services.length ? (
        <Services
          title={dt.therapistC.services.title}
          dt={services.sort((a: Service, b: Service) =>
            a.title.localeCompare(b.title),
          )}
        />
      ) : (
        <></>
      )}
      {issues.length ? (
        <Issues
          classname="therapist"
          dt={dt.therapistC.issues}
          arr={issues.sort((a: Issue, b: Issue) =>
            a.title.localeCompare(b.title),
          )}
        />
      ) : (
        <></>
      )}
      <Reviews dt={dt.therapistC.reviews} />
      <Contact therapist={dt.therapistC} />
      <BookBlock />
      <Subscribe />
    </Layout>
  )
})

export default TherapistPage
