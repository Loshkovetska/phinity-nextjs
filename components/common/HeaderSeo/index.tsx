import { observer } from 'mobx-react'
import Script from 'next/script'

const HeaderSeo = observer(
  ({
    metas,
    plugins,
    page = 'page',
    canonical,
  }: {
    metas: any
    plugins: any
    page?: string
    canonical?: string
  }) => {
    return (
      <>
        <meta name="description" content={metas?.og_description} />
        <meta name="author" content="Rehanna Kauser" />
        {page == 'page' ? (
          <link rel="canonical" href={metas?.og_url.replaceAll('admin.', '')} />
        ) : (
          <link rel="canonical" href={canonical} />
        )}
        <meta
          name="facebook-domain-verification"
          content="jss08330uin2f4ivw4ik104h3oz9cl"
        />
        <meta property="og:locale" content={metas?.og_locale} />
        <meta property="og:type" content={metas?.og_type} />
        <meta property="og:title" content={metas?.og_title} />
        <meta property="og:description" content={metas?.og_description} />
        <meta
          property="og:url"
          content={metas?.og_url.replaceAll('admin.', '')}
        />
        <meta property="og:site_name" content={metas?.og_site_name} />
        <link
          rel="stylesheet"
          href="https://a.omappapi.com/app/js/api.min.css"
          id="omapi-css"
          media="all"
        ></link>

        <Script />
      </>
    )
  },
)

export default HeaderSeo
