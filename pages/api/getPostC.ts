import {
  getBookBlock,
  getHome,
  getMenu,
  getSinglePost,
  getSubscribeBlock,
} from '../../stores/ContentStore'
import {
  getPopularPosts,
  getPopularVideos,
  getPosts,
  getTherapists,
  getVideos,
} from '../../stores/DBStore'

export const getPostC = async (slug: string) => {
  const menu = await getMenu(),
    home = await getHome(),
    book = await getBookBlock(),
    videos = await getVideos(),
    posts = await getPosts(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    postC = await getSinglePost(slug),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  const post = posts?.find((p: any) => p.link == slug)

  return {
    menu,
    book,
    posts,
    videos,
    post,
    postC,
    popvideos,
    popposts,
    therapists,
    home,subscribe
  }
}
