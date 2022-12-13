import { DOMAIN } from '../mocks/doman'
import HomePage from '../components/mains/HomePage'
import getHome from './api/getHome'
import getAbout from './api/getAbout'
import AboutPage from '../components/mains/AboutPage'
import NoFound from '../components/mains/404'
import get404 from './api/get404'
import ThanksPage from '../components/mains/ThanksPage'
import getThanksC from './api/getThanks'
import { useEffect, useRef } from 'react'
import { runInAction } from 'mobx'
import ContentStore, { getCookieContent, getSeo } from '../stores/ContentStore'
import GlobalState, { getLinks, getReviewsIO } from '../stores/GlobalState'
import ContactPage from '../components/mains/ContactPages'
import getContact from './api/getContact'
import DBStore, { getPosts, getReviews } from '../stores/DBStore'
import CookiePage from '../components/mains/CookiePage'
import getCook from './api/getCook'
import getFaq from './api/getFaq'
import FaqPage from '../components/mains/FaqPage'
import FeesPage from '../components/mains/FeesPage'
import getFee from './api/getFee'
import PrivacyPage from '../components/mains/PrivacyPage'
import TermsPage from '../components/mains/TermsPage'
import { getPolicy, getTermsC } from './api/getPolicy'
import BlogPage from '../components/mains/BlogPage'
import { getBlog } from './api/getBlog'
import IssuesPage from '../components/mains/IssuesPage'
import { getIssuesC } from './api/getIssuesC'
import PostPage from '../components/mains/PostPage'
import { getPostC } from './api/getPostC'
import ServicesPage from '../components/mains/ServicesPage'
import { getServicesC } from './api/getServicesC'
import WorkPage from '../components/mains/WorkPage'
import { getWorkC } from './api/getWorkC'
import { getVideosC } from './api/getVideosC'
import VideosPage from '../components/mains/VideosPage'
import TherapistsPage from '../components/mains/TherapistsPage'
import { getTherapistsC } from './api/getTherapistsC'
import Head from 'next/head'
import { useRouter } from 'next/router'

var FormData = require('form-data')

const Page = ({ dt, currentPage }: { dt: any; currentPage: any }) => {
  const ref = useRef<any>(false)
  const navigate = useRouter()
  useEffect(() => {
    if (ref.current) return
    getLinks()
    ref.current = true
  }, [])
  useEffect(() => {
    if (!dt) return

    if (dt.reviews) {
      runInAction(() => {
        DBStore.reviews = dt.reviews
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
  }, [dt])

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
      {dt && currentPage == 601 && <NoFound dt={dt} />}
      {currentPage == 259 && dt && <AboutPage dt={dt} />}
      {dt && currentPage == 635 && <ThanksPage dt={dt} />}
      {dt && currentPage == 274 && <ContactPage dt={dt} />}
      {dt && currentPage == 775 && <CookiePage dt={dt} />}
      {dt && currentPage == 507 && <FaqPage dt={dt} />}
      {dt && currentPage == 270 && <FeesPage dt={dt} />}
      {dt && currentPage == 3 && <PrivacyPage dt={dt} />}
      {dt && currentPage == 591 && <TermsPage dt={dt} />}
      {dt && currentPage == 272 && <BlogPage dt={dt} />}
      {dt && currentPage == 9999999999 && <PostPage dt={dt} />}
      {dt && currentPage == 266 && <IssuesPage dt={dt} />}
      {dt && currentPage == 264 && <ServicesPage dt={dt} />}
      {dt && currentPage == 262 && <WorkPage dt={dt} />}
      {dt && currentPage == 268 && <TherapistsPage dt={dt} />}
      {dt && currentPage == 644 && <VideosPage dt={dt} />}
    </>
  )
}

export default Page

export async function getStaticPaths() {
  const fd = new FormData()
  fd.append('status', 'linkPage')
  const request = await fetch(DOMAIN + 'react', {
    method: 'POST',
    body: fd,
  })

  const posts = await getPosts()

  const response = await request.json()

  const paths = response
    .filter((e: any) => e.id != 16 && e.id != 626 && e.id != 650 && e.id != 2)
    .map((l: any) => {
      return { params: { page: l.link.replaceAll('/', ''), path: l.link } }
    })

  posts.forEach((p: any) => {
    paths.push({ params: { page: p.link, path: p.link } })
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const fd = new FormData()
  fd.append('status', 'linkPage')
  const request = await fetch(DOMAIN + 'react', {
    method: 'POST',
    body: fd,
  })

  const response = await request.json()

  let res = response.find((r: any) => r.link == '/' + params.page)
  let result = null

  if (res) {
    switch (+res.id) {
      case 2:
        result = await getHome()
        break
      case 259:
        result = await getAbout()
        break
      case 601:
        result = await get404()
        break
      case 635:
        result = await getThanksC()
        break
      case 274:
        result = await getContact()
        break
      case 775:
        result = await getCook()
        break
      case 507:
        result = await getFaq()
        break
      case 270:
        result = await getFee()
        break
      case 3:
        result = await getPolicy()
        break
      case 591:
        result = await getTermsC()
        break
      case 272:
        result = await getBlog()
        break
      case 266:
        result = await getIssuesC()
        break
      case 264:
        result = await getServicesC()
        break
      case 262:
        result = await getWorkC()
        break
      case 644:
        result = await getVideosC()
        break
      case 268:
        result = await getTherapistsC()
        break
    }
  } else result = await getPostC(params.page)

  const reviews = await getReviews()
  const cookie = await getCookieContent()
  const metas = await getSeo(params.page, res ? undefined : 'post')
  const reviewIO = await getReviewsIO()

  result = { ...result, reviews, cookieCont: cookie, metas, reviewIO }

  return {
    props: {
      currentPage: res ? res.id : 9999999999,
      dt: result,
    },
  }
}
