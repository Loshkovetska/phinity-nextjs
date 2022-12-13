import Reviews from '../pages/home/Reviews'
import BookBlock from '../pages/home/BookBlock'
import Videos from '../pages/blog/Videos'
import PostContent from '../pages/post/PostContent'
import RelatedPosts from '../pages/post/RelatedPosts'
import { observer } from 'mobx-react'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'

const PostPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  return (
    <Layout>
      <PostContent />
      <RelatedPosts title={content.postC.relatedTitle || ''} />
      <Videos arr={content.videos} dt={content.postC.video} />
      <Reviews dt={(content.postC as any).reviews} />
      <BookBlock />
    </Layout>
  )
})

export default PostPage
