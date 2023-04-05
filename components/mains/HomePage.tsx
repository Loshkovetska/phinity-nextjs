import { useEffect, useState } from 'react'
import Intro from '../../components/pages/home/Intro'
import Offers from '../../components/pages/home/Offers'
import About from '../../components/pages/home/About'
import Issues from '../../components/pages/home/Issues'
import Accreditation from '../../components/pages/home/Accreditation'
import Reviews from '../../components/pages/home/Reviews'
import Servives from '../../components/pages/home/Services'
import Therapists from '../../components/pages/home/Therapists'
import Blogs from '../../components/pages/home/Blogs'
import BookBlock from '../../components/pages/home/BookBlock'
import { observer } from 'mobx-react'
import Videos from '../../components/pages/blog/Videos'
import Layout from '../common/Layout'
import { getTherapists } from '../../stores/DBStore'
import Subscribe from '../common/Subscribe'
const HomePage = observer(
  ({
    home,
    posts,
    therapists,
    reviews,
    videos,
    menu,
  }: {
    home: any
    posts: any
    therapists: any
    reviews: any
    videos: any
    menu: any
  }) => {
    const [dt, setDt] = useState([])
    useEffect(() => {
      getTherapists().then((res) => {
        setDt(res)
      })
    }, [])

    return (
      <Layout withScroll>
        <Intro intro={home.intro} />
        <Offers offers={home.offers} />
        <About about={home.about} />
        <Issues dt={home.issues} arr={home.issues.list} />
        <Therapists
          dt={dt}
          therapist={home.therapist}
          therapists={home.therapists}
        />
        <Accreditation accreditation={home.accreditation} />
        <Reviews dt={home.reviews} />
        <Servives dt={home.services} />
        <Blogs arr={posts} dt={home.blog} />
        <Videos arr={videos} dt={home.video} />
        <BookBlock />
        <Subscribe />
      </Layout>
    )
  },
)

export default HomePage
