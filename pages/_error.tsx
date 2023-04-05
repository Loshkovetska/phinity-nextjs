import Head from 'next/head'
import NoFound from '../components/mains/404'
import { getCookieContent, getPlugins, getSeo } from '../stores/ContentStore'
import get404 from './api/get404'
import HeaderSeo from '../components/common/HeaderSeo'
import { useEffect } from 'react'
import Script from 'next/script'

const Page404 = ({ dt }: { dt: any }) => {
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

      {dt && <NoFound dt={dt} />}
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

export default Page404

export async function getStaticProps() {
  let result: any = await get404()
  const cookie = await getCookieContent()
  const metas = await getSeo(601)
  const plugins = await getPlugins()

  result = { ...result, cookieCont: cookie, metas, plugins }
  return {
    props: {
      dt: result,
    },
  }
}
