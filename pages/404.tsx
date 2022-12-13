import Head from 'next/head'
import NoFound from '../components/mains/404'
import { getCookieContent, getSeo } from '../stores/ContentStore'
import get404 from './api/get404'

const Page404 = ({ dt }: { dt: any }) => {
  return (
    <>
      {dt && (
        <Head>
          <link
            rel="icon"
            href="https://phinitytherapy.com/admin/wp-content/uploads/2022/06/Frame-32092.svg"
          />
          <title>{dt.metas.title || ''}</title>
          <meta name="description" content={dt.metas.description || ''} />
        </Head>
      )}

      {dt && <NoFound dt={dt} />}
    </>
  )
}

export default Page404

export async function getStaticProps() {
  let result: any = await get404()
  const cookie = await getCookieContent()
  const metas = await getSeo('error')

  result = { ...result, cookieCont: cookie, metas }
  return {
    props: {
      dt: result,
    },
  }
}
