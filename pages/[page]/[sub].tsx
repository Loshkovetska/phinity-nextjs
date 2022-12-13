import { runInAction } from 'mobx'
import Head from 'next/head'
import { useEffect } from 'react'
import IssuePage from '../../components/mains/IssuePage'
import JobPage from '../../components/mains/JobPage'
import ServicePage from '../../components/mains/ServicePage'
import TherapistPage from '../../components/mains/TherapistPage'
import VideoPage from '../../components/mains/VideoPage'
import { DOMAIN } from '../../mocks/doman'
import ContentStore, {
  getCookieContent,
  getSeo,
} from '../../stores/ContentStore'
import DBStore, {
  getIssues,
  getReviews,
  getServices,
  getTherapists,
  getVacancies,
  getVideos,
} from '../../stores/DBStore'
import { getLinks, getReviewsIO } from '../../stores/GlobalState'
import { getIssueC } from '../api/getIssueC'
import getJobC from '../api/getJobC'
import { getServiceC } from '../api/getServiceC'
import { getTherapistC } from '../api/getTherapistC'
import { getVideoC } from '../api/getVideoC'

var FormData = require('form-data')

const SubPage = ({ dt, currentPage }: { dt: any; currentPage: any }) => {
  useEffect(() => {
    getLinks()

    if (!dt) return

    if (dt.reviews) {
      runInAction(() => {
        DBStore.reviews = dt.reviews
      })
    }
    if (dt.therapists) {
      runInAction(() => {
        DBStore.therapists = dt.therapists
      })
    }
    if (dt.menu) {
      runInAction(() => {
        ContentStore.menu = dt.menu
      })
    }

    if (dt.book) {
      runInAction(() => {
        ContentStore.book = dt.book
      })
    }
    if (dt.faqs) {
      runInAction(() => {
        DBStore.faqs = dt.faqs
      })
    }
    if (dt.videos) {
      runInAction(() => {
        DBStore.videos = dt.videos
      })
    }
    if (dt.posts) {
      runInAction(() => {
        DBStore.posts = dt.posts
      })
    }
    if (dt.popvideos) {
      runInAction(() => {
        DBStore.popularVideos = dt.popvideos
      })
    }
    if (dt.popposts) {
      runInAction(() => {
        DBStore.popularPosts = dt.popposts
      })
    }
    if (dt.vacancies) {
      runInAction(() => {
        DBStore.vacancies = dt.vacancies
      })
    }
  }, [dt])
  if (!dt) return <></>
  return (
    <>
      {dt && (
        <Head>
          <title>{dt.metas?.title || ''}</title>
          <meta name="description" content={dt.metas?.description || ''} />
          <link
            rel="icon"
            href="https://phinitytherapy.com/admin/wp-content/uploads/2022/06/Frame-32092.svg"
          />
        </Head>
      )}
      {dt && currentPage == 268 && <TherapistPage dt={dt} />}
      {dt && currentPage == 266 && <IssuePage data={dt} />}
      {dt && currentPage == 264 && <ServicePage data={dt} />}
      {dt && currentPage == 644 && <VideoPage data={dt} />}
      {dt && currentPage == 262 && <JobPage data={dt} />}
    </>
  )
}

export default SubPage

export async function getStaticPaths() {
  const fd = new FormData()
  fd.append('status', 'linkPage')
  const request = await fetch(DOMAIN + 'react', {
    method: 'POST',
    body: fd,
  })

  //issues - 266, vacancies-262, therapists - 268, services-264, videos - 644
  const response = await request.json()

  const issues = await getIssues(),
    services = await getServices(),
    therapists = await getTherapists(),
    videos = await getVideos(),
    vacancies = await getVacancies()

  const paths: any = []
  response
    .filter(
      (l: any) =>
        l.id == 266 || l.id == 262 || l.id == 268 || l.id == 264 || l.id == 644,
    )
    .forEach((l: any) => {
      if (l.id == 266) {
        issues.forEach((is: any) => {
          paths.push({
            params: { page: l.link.replaceAll('/', ''), sub: is.link },
          })
        })
      }
      if (l.id == 262) {
        vacancies.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll('/', ''),
              sub: is.link,
              path: l.link + '/' + is.link,
            },
          })
        })
      }
      if (l.id == 268) {
        therapists.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll('/', ''),
              sub: is.link,
              path: l.link + '/' + is.link,
            },
          })
        })
      }
      if (l.id == 264) {
        services.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll('/', ''),
              sub: is.link,
              path: l.link + '/' + is.link,
            },
          })
        })
      }

      if (l.id == 644) {
        videos.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll('/', ''),
              sub: is.link,
              path: l.link + '/' + is.link,
            },
          })
        })
      }
    })

  return {
    paths: paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const fd = new FormData()
  fd.append('status', 'linkPage')
  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })

  const response = await request.json()

  let res = response.find((r: any) => r.link.includes('/' + params.page))
  let result = {}
  let type = ''
  if (res) {
    switch (+res.id) {
      case 266:
        result = await getIssueC(params.sub)
        break
      case 264:
        result = await getServiceC(params.sub)
        break
      case 262:
        result = await getJobC(params.sub)
        break
      case 644:
        result = await getVideoC(params.sub)
        break
      case 268:
        result = await getTherapistC(params.sub)
        break
      default:
        break
    }
  }

  const reviews = await getReviews()
  const cookie = await getCookieContent()
  const metas = await getSeo(params.sub, params.page)
  const reviewIO = await getReviewsIO()

  result = { ...result, reviews, cookieCont: cookie, metas, reviewIO }
  return {
    props: {
      currentPage: res.id,
      dt: result,
    },
  }
}
