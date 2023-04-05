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
  getPlugins,
  getSeo,
} from '../../stores/ContentStore'
import DBStore, {
  getIssues,
  getPosts,
  getReviews,
  getServices,
  getTherapists,
  getVacancies,
  getVideos,
} from '../../stores/DBStore'
import { getReviewsIO } from '../../stores/GlobalState'
import { getIssueC } from '../api/getIssueC'
import getJobC from '../api/getJobC'
import { getServiceC } from '../api/getServiceC'
import { getTherapistC } from '../api/getTherapistC'
import { getVideoC } from '../api/getVideoC'
import parse from 'html-react-parser'
import HeaderSeo from '../../components/common/HeaderSeo'
import { getPostC } from '../api/getPostC'
import PostPage from '../../components/mains/PostPage'
import Script from 'next/script'

var FormData = require('form-data')

const SubPage = ({ dt, currentPage }: { dt: any; currentPage: any }) => {
  useEffect(() => {
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
  useEffect(() => {
    if (dt.plugins) {
      document.head.insertAdjacentHTML(
        'beforeend',
        dt.plugins.replaceAll('admin.', ''),
      )
      document.querySelector('html')?.setAttribute('lang', 'en')
    }
  }, [dt.plugins])

  if (!dt) return <></>
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
          {currentPage == 272 && (
            <>
              <meta
                property="article:publisher"
                content="https://www.facebook.com/phinitytherapy"
              ></meta>
            </>
          )}
          <HeaderSeo
            metas={dt.metas}
            plugins={dt.plugins}
            page={currentPage == 272 ? 'post' : 'page'}
            canonical={`https://phinitytherapy.com/blog/${dt.postC?.link}/`}
          />
        </Head>
      )}
      {dt && currentPage == 268 && <TherapistPage dt={dt} />}
      {dt && currentPage == 266 && <IssuePage data={dt} />}
      {dt && currentPage == 264 && <ServicePage data={dt} />}
      {dt && currentPage == 644 && <VideoPage data={dt} />}
      {dt && currentPage == 262 && <JobPage data={dt} />}
      {dt && currentPage == 272 && <PostPage dt={dt} />}
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
    vacancies = await getVacancies(),
    posts = await getPosts()

  const paths: any = []

  response
    ?.filter(
      (l: any) =>
        l.id == 266 ||
        l.id == 262 ||
        l.id == 268 ||
        l.id == 264 ||
        l.id == 644 ||
        l.id == 272,
    )
    ?.forEach((l: any) => {
      if (l.id == 266) {
        issues?.forEach((is: any) => {
          paths.push({
            params: { page: l.link.replaceAll('/', ''), sub: is.link },
          })
        })
      }
      if (l.id == 272) {
        posts?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll('/', ''),
              sub: is.link,
              path: l.link + '/' + is.link,
            },
          })
        })
      }
      if (l.id == 262) {
        vacancies?.forEach((is: any) => {
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
        therapists?.forEach((is: any) => {
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
        services?.forEach((is: any) => {
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
        videos?.forEach((is: any) => {
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
    fallback: false,
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

  let res = response?.find((r: any) => r.link.includes('/' + params.page))
  let idPage = 0
  let result: any = {}
  let page = ''

  if (res) {
    switch (+res.id) {
      case 266:
        result = await getIssueC(params.sub)
        idPage = +(result as any).issueC.id
        page = 'issues'
        break
      case 264:
        result = await getServiceC(params.sub)
        idPage = +(result as any).serviceC.id
        page = 'services'
        break
      case 262:
        result = await getJobC(params.sub)
        idPage = +(result as any).job.id
        page = 'vacancies'

        break
      case 644:
        result = await getVideoC(params.sub)
        idPage = +(result as any).videoC.id
        page = 'videos'

        break
      case 268:
        result = await getTherapistC(params.sub)
        idPage = +(result as any).therapistC.id
        page = 'therapists'
        break
      case 272:
        result = await getPostC(params.sub)
        page = 'blog'
        if (!result.post) {
          const errs = response?.find((r: any) => r.id == 601)
          return {
            redirect: {
              source: params.page + '/' + params.sub,
              destination: errs.link,
              permanent: true,
            },
          }
        }
        idPage = +result?.postC.id

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
  const metas = await getSeo(idPage, page)
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
      currentPage: res.id,
      dt: result,
    },
  }
}
