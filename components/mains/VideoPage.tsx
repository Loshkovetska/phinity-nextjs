import Reviews from '../pages/home/Reviews'

import BookBlock from '../pages/home/BookBlock'
import { observer } from 'mobx-react'

import VideoIntro from '../pages/video/VideoIntro'
import PopularVideos from '../pages/videos/PopularVideos'
import PopularPosts from '../pages/video/PopularPosts'
import Layout from '../common/Layout'

const VideoPage = observer(({ data }: { data: any }) => {
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
      </Layout>
    </>
  )
})

export default VideoPage
