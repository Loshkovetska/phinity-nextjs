import {
  getBookBlock,
  getHome,
  getIssueContent,
  getMenu,
  getSingleService,
  getSubscribeBlock,
  getTherapistContent,
} from '../../stores/ContentStore'
import {
  getIssue,
  getPopularPosts,
  getPopularVideos,
  getPosts,
  getService,
  getTherapist,
  getTherapists,
  getVideos,
} from '../../stores/DBStore'

export const getServiceC = async (slug: string) => {
  const serviceC = await getSingleService(slug)
  const menu = await getMenu()
    const book = await getBookBlock(),
      service = await getService(slug),
      posts = await getPosts(),
      videos = await getVideos(),
      therapists = await getTherapists(),
      home = await getHome(),
      subscribe = await getSubscribeBlock();

  return {
    home,
    serviceC,
    menu,
    book,
    service,
    therapists,
    posts,
    videos,subscribe
  }
}
