import Reviews from '../pages/home/Reviews'
import BookBlock from '..//pages/home/BookBlock'
import BlogContent from '..//pages/blog/BlogContent'
import Accreditation from '..//pages/home/Accreditation'
import { observer } from 'mobx-react'
import PopularPosts from '..//pages/video/PopularPosts'
import PopularVideos from '..//pages/videos/PopularVideos'
import { useWindowDimensions } from '../../hooks/getWindowDimensions'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import { useEffect, useState } from 'react'

const BlogPage = observer(({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions()

  const [showBottom, setBottom] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setBottom(true)
    }, 1000)
  }, [])
  const content = useContentState()
  return (
    <Layout>
      <BlogContent />
      {showBottom && (
        <>
          <PopularPosts
            content={{
              title: content.blog?.blogTitle,
              buttonTitle: content.blog?.blogButton,
            }}
          />
          <PopularVideos content={content.blog?.video} />
          <Reviews dt={content.blog?.reviews} />
          {width > 1024 && <BookBlock />}
          <Accreditation accreditation={content.blog?.accreditation} />
          <div className="space-block"></div>
        </>
      )}
    </Layout>
  )
})
export default BlogPage
