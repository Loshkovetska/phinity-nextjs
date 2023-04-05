import { DOMAIN } from '../mocks/doman'
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
import { getReviewsIO } from '../stores/GlobalState'
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
import { getPlugins } from '../stores/ContentStore'
import parse from 'html-react-parser'
import HeaderSeo from '../components/common/HeaderSeo'
import Script from 'next/script'

var FormData = require('form-data')

const Page = ({ dt, currentPage }: { dt: any; currentPage: any }) => {
  useEffect(() => {
    if (!dt) {
      return
    }

    if (dt?.reviews) {
      runInAction(() => {
        DBStore.reviews = dt.reviews
      })
    }

    if (dt?.menu) {
      runInAction(() => {
        ContentStore.menu = dt.menu
      })
    }

    if (dt?.book) {
      runInAction(() => {
        ContentStore.book = dt.book
      })
    }
  }, [dt])

  useEffect(() => {
    if (dt.plugins) {
      document.head.insertAdjacentHTML(
        'beforeend',
        dt.plugins.replaceAll('admin.', ''),
      )
      document.querySelector('html')?.setAttribute('lang', 'en')
    }
  }, [dt.plugins])

  return (
    <>
      <Script
        id="header-script2"
        async
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5V7NB5P');`,
        }}
      />
      <noscript
        id="header-script3"
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5V7NB5P"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      {dt && (
        <Head>
          <title>{dt.metas?.title}</title>
          <HeaderSeo metas={dt.metas} plugins={dt.plugins} />
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
      {dt && currentPage == 266 && <IssuesPage dt={dt} />}
      {dt && currentPage == 264 && <ServicesPage dt={dt} />}
      {dt && currentPage == 262 && <WorkPage dt={dt} />}
      {dt && currentPage == 268 && <TherapistsPage dt={dt} />}
      {dt && currentPage == 644 && <VideosPage dt={dt} />}
      <Script
        id="header-script"
        dangerouslySetInnerHTML={{
          __html: `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3327223,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <Script
        id="header-pixel"
        dangerouslySetInnerHTML={{
          __html: `  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '739420027638558');
  fbq('track', 'PageView');`,
        }}
      />
      <Script
        id="plug-1"
        defer
        dangerouslySetInnerHTML={{
          __html: `(function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,234388,251050);`,
        }}
      />
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
    ?.filter((e: any) => ![16, 626, 650, 2, 4475, 780].includes(+e.id))
    ?.map((l: any) => {
      return { params: { page: l.link.replaceAll('/', ''), path: l.link } }
    })

  return {
    paths: paths,
    fallback: false,
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

  let res = response?.find((r: any) => r.link == '/' + params.page)
  let result = null
  let idPage = 0
  if (res) {
    switch (+res.id) {
      case 2:
        result = await getHome()
        idPage = +res.id
        break
      case 259:
        result = await getAbout()
        idPage = +res.id

        break
      case 601:
        result = await get404()
        idPage = +res.id

        break
      case 635:
        result = await getThanksC()
        idPage = +res.id

        break
      case 274:
        result = await getContact()
        idPage = +res.id

        break
      case 775:
        result = await getCook()
        idPage = +res.id

        break
      case 507:
        result = await getFaq()
        idPage = +res.id

        break
      case 270:
        result = await getFee()
        idPage = +res.id

        break
      case 3:
        result = await getPolicy()
        idPage = +res.id

        break
      case 591:
        result = await getTermsC()
        idPage = +res.id

        break
      case 272:
        result = await getBlog()
        idPage = +res.id

        break
      case 266:
        result = await getIssuesC()
        idPage = +res.id

        break
      case 264:
        result = await getServicesC()
        idPage = +res.id

        break
      case 262:
        result = await getWorkC()
        idPage = +res.id

        break
      case 644:
        result = await getVideosC()
        idPage = +res.id

        break
      case 268:
        result = await getTherapistsC()
        idPage = +res.id
        break
    }
  } else {
    const errs = response?.find((r: any) => r.id == 601)

    return {
      notFound: true,
    }
  }

  const reviews = await getReviews()
  const cookie = await getCookieContent()

  const metas = await getSeo(idPage, res ? undefined : 'post')
  const reviewIO = await getReviewsIO()
  const plugins = await getPlugins()

  result = {
    ...result,
    reviews,
    cookieCont: cookie,
    metas,
    reviewIO,
    links: response,
    plugins,
  }

  return {
    props: {
      currentPage: res ? res.id : 9999999999,
      dt: result,
    },
  }
}
