import {
  getBookBlock,
  getIssuesContent,
  getMenu,
  getSubscribeBlock,
} from '../../stores/ContentStore'
import {
  getIssues,
  getIssuesFilters,
  getPosts,
  getTherapists,
  getVideos,
} from '../../stores/DBStore'

export const getIssuesC = async () => {
  const menu = await getMenu(),
    filters = await getIssuesFilters(),
    videos = await getVideos(),
    posts = await getPosts(),
    book = await getBookBlock(),
    issuesC = await getIssuesContent(),
    issues = await getIssues(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    issuesC,
    menu,
    filters,
    videos,
    posts,
    book,
    issues,
    therapists,subscribe
  }
}
