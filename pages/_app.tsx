import "../styles/index.scss";
import { RootStoreProvider } from "../hooks/RootStoreProvider";
import { useEffect, useRef } from "react";
import { getReviewsIODynamic } from "../stores/GlobalState";
import Script from "next/script";

function MyApp({ Component, pageProps }: any) {
  const ref = useRef<any>(false);
  useEffect(() => {
    if (ref.current) return;
    getReviewsIODynamic();
    ref.current = true;
    // console.clear();
    document.querySelector("head")?.insertAdjacentHTML(
      "beforeend",
      ` <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />`
    );
  }, []);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    const s = document.querySelector("body");
    if (!s) return;
    (s as any).style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", function (e) {
      let vh = window.innerHeight * 0.01;
      const s = document.querySelector("body");
      if (!s) return;
      (s as any).style.setProperty("--vh", `${vh}px`);
    });
  }, []);
  return (
    <RootStoreProvider hydrationData={pageProps?.dt}>
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
      <Component {...pageProps} />
      <noscript
        id="header-script3"
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5V7NB5P"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
    </RootStoreProvider>
  );
}

export default MyApp;
