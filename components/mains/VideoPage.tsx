import Reviews from '../pages/home/Reviews'

import BookBlock from '../pages/home/BookBlock'
import { observer } from 'mobx-react'

import VideoIntro from '../pages/video/VideoIntro'
import PopularVideos from '../pages/videos/PopularVideos'
import PopularPosts from '../pages/video/PopularPosts'
import Layout from '../common/Layout'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { getVideoContent } from '../../stores/ContentStore'
import Subscribe from '../common/Subscribe'

const VideoPage = observer(({ data }: { data: any }) => {
  const ref = useRef<any>(false)
  const { query } = useRouter()

  useEffect(() => {
    if (ref.current || !query) return
    getVideoContent((query as any)?.sub)
    ref.current = true
  }, [query])
  if (!data) return <></>
  return (
    <>
      <Layout>
        <VideoIntro videoCont={data.videoC} />
        <PopularPosts
          content={{
            title: data.videoC.blogTitle,
            buttonTitle: data.videoC.blogButton,
          }}
        />
        <PopularVideos content={data.videoC.video} />
        <Reviews dt={data.videoC.reviews} />
        <BookBlock />
        <Subscribe />
      </Layout>
    </>
  )
})

export default VideoPage
