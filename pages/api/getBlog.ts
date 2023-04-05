import {
  getBlogContent,
  getBookBlock,
  getMenu,
} from '../../stores/ContentStore'
import {
  getBlogCategories,
  getPopularPosts,
  getPopularVideos,
  getPosts,
  getTherapists,
  getVideos,
} from '../../stores/DBStore'

export const getBlog = async () => {
  const menu = await getMenu(),
    book = await getBookBlock(),
    videos = await getVideos(),
    categories = await getBlogCategories(),
    posts = await getPosts(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    blog = await getBlogContent(),
    therapists = await getTherapists()

  return {
    blog,
    menu,
    book,
    videos,
    categories,
    posts,
    popvideos,
    popposts,
    therapists,
  }
}
