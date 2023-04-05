import Reviews from '../pages/home/Reviews'
import BookBlock from '../pages/home/BookBlock'
import Videos from '../pages/blog/Videos'
import PostContent from '../pages/post/PostContent'
import RelatedPosts from '../pages/post/RelatedPosts'
import { observer } from 'mobx-react'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import Blogs from '../pages/home/Blogs'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Subscribe from '../common/Subscribe'
import { getSinglePost } from '../../stores/ContentStore'

const PostPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  const ref = useRef<any>(false)
  const { query } = useRouter()

  useEffect(() => {
    if (ref.current || !query) return
    getSinglePost((query as any)?.sub)
    ref.current = true
  }, [query])
  return (
    <Layout>
      <PostContent />
      <RelatedPosts title={content.postC.relatedTitle || ''} />
      <Videos arr={content.videos} dt={content.postC.video} />
      <Blogs arr={content.posts} dt={content.home.blog} />
      <Reviews dt={(content.postC as any).reviews} />
      <BookBlock />
      <Subscribe />
    </Layout>
  )
})

export default PostPage
