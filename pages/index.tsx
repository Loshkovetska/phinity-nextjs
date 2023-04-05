import HomePage from '../components/mains/HomePage'
import { DOMAIN } from '../mocks/doman'
import getHome from './api/getHome'
import {
  getReviews,
  getVideos,
  getPosts,
  getIssues,
  getServices,
  getTherapists,
  getVacancies,
} from '../stores/DBStore'
import { getCookieContent, getSeo } from '../stores/ContentStore'
import Head from 'next/head'
import { getReviewsIO } from '../stores/GlobalState'
import { getPlugins } from '../stores/ContentStore'
import { useEffect } from 'react'
import HeaderSeo from '../components/common/HeaderSeo'
import fetch from 'node-fetch'
import Script from 'next/script'
// import fs from 'fs'

var FormData = require('form-data')

const Home = ({ dt }: { dt: any }) => {
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
      {dt && (
        <HomePage
          home={dt.home}
          posts={dt.posts}
          therapists={dt.therapists}
          reviews={dt.reviews}
          videos={dt.videos}
          menu={dt.menu}
        />
      )}
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

export default Home

// const generateSiteMap = (
//   links: any,
//   videos: any,
//   posts: any,
//   issues: any,
//   services: any,
//   therapists: any,
//   vacancies: any,
// ) => {
//   const newDomain = DOMAIN.replaceAll('admin.', '')
//   let html = `<?xml version="1.0" encoding="UTF-8"?>
//    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//      <url>
//        <loc>https://jsonplaceholder.typicode.com</loc>
//      </url>
//      <url>
//        <loc>https://jsonplaceholder.typicode.com/guide</loc>
//      </url>
//      ${links
//        .filter((l: any) => ![4475, 650, 780, 16, 626].includes(l.id))
//        .map((li: any) => {
//          if (li.id == 644) {
//            return `
//         <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//         </url>
//            ${videos
//              .map(
//                (vi: any) =>
//                  `<url>
//                     <loc>${newDomain}${li.link.replaceAll('/', '')}/${
//                    vi.link
//                  }</loc>
//                  </url>`,
//              )
//              .join('')}`
//          }
//          if (li.id == 272) {
//            return `
//        <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//       </url>
//            ${posts
//              .map(
//                (vi: any) =>
//                  `<url>
//                     <loc>${newDomain}${vi.link}</loc>
//                  </url>`,
//              )
//              .join('')}`
//          }
//          if (li.id == 264) {
//            return `
//        <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//       </url>
//            ${services
//              .map(
//                (vi: any) =>
//                  ` <url>
//                     <loc>${newDomain}${li.link.replaceAll('/', '')}/${
//                    vi.link
//                  }</loc>
//                  </url>`,
//              )
//              .join('')}
//      `
//          }
//          if (li.id == 266) {
//            return `
//        <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//       </url>
//            ${issues
//              .map(
//                (vi: any) =>
//                  `<url>
//                       <loc>${newDomain}${li.link.replaceAll('/', '')}/${
//                    vi.link
//                  }</loc>
//                  </url>`,
//              )
//              .join('')}
//      `
//          }
//          if (li.id == 268) {
//            return `
//        <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//       </url>
//            ${therapists
//              .map(
//                (vi: any) =>
//                  ` <url>
//                     <loc>${newDomain}${li.link.replaceAll('/', '')}/${
//                    vi.link
//                  }</loc>
//                  </url>`,
//              )
//              .join('')}
//      `
//          }
//          if (li.id == 262) {
//            return `
//        <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//       </url>
//            ${vacancies
//              .map(
//                (vi: any) =>
//                  ` <url>
//                     <loc>${newDomain}${li.link.replaceAll('/', '')}/${
//                    vi.link
//                  }</loc>
//                  </url>`,
//              )
//              .join('')}
//      `
//          }
//          return `
//        <url>
//            <loc>${newDomain}${li.link.replaceAll('/', '')}</loc>
//        </url>
//      `
//        })
//        .join('')}
//    </urlset>
//  `
//   fs.writeFileSync('/sitemap.xml', html)
// }

export async function getStaticProps() {
  const fd = new FormData()
  fd.append('status', 'linkPage')
  const request = await fetch(DOMAIN + 'react', {
    method: 'POST',
    body: fd,
  })

  //issues - 266, vacancies-262, therapists - 268, services-264, videos - 644
  const response = await request.json()

  let result = null
  result = await getHome()
  const reviews = await getReviews()
  const cookie = await getCookieContent()
  const metas = await getSeo(2)
  const reviewIO = await getReviewsIO()
  const plugins = await getPlugins()

  const fetchR = await fetch(`https://admin.phinitytherapy.com/`)
  const resF = await fetchR.text()

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
      dt: result,
    },
  }
}
