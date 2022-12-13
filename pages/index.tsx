import HomePage from '../components/mains/HomePage'
import { DOMAIN } from '../mocks/doman'
import getHome from './api/getHome'
import { getReviews } from '../stores/DBStore'
import { getCookieContent, getSeo } from '../stores/ContentStore'
import Head from 'next/head'
import { useEffect } from 'react'
import { getLinks, getReviewsIO } from '../stores/GlobalState'
var FormData = require('form-data')

const Home = ({ dt }: { dt: any }) => {
  useEffect(() => {
    getLinks()
  }, [])
  return (
    <>
      {dt && (
        <Head>
          <title>{dt.metas.title || ''}</title>
          <link
            rel="icon"
            href="https://phinitytherapy.com/admin/wp-content/uploads/2022/06/Frame-32092.svg"
          />
          <meta name="description" content={dt.metas.description || ''} />
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
    </>
  )
}

export default Home

export async function getStaticProps() {
  let result = null
  result = await getHome()
  const reviews = await getReviews()
  const cookie = await getCookieContent()
  const metas = await getSeo('main')
  const reviewIO = await getReviewsIO();

  result = { ...result, reviews, cookieCont: cookie, metas, reviewIO }
  return {
    props: {
      dt: result,
    },
  }
}
