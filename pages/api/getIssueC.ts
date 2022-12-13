import {
  getBookBlock,
  getHome,
  getIssueContent,
  getMenu,
  getTherapistContent,
} from '../../stores/ContentStore'
import {
  getIssue,
  getPopularPosts,
  getPopularVideos,
  getTherapist,
  getTherapists,
} from '../../stores/DBStore'

export const getIssueC = async (slug: string) => {
  const issueC = await getIssueContent(slug)
  const menu = await getMenu()
  const book = await getBookBlock(),
    issue = await getIssue(slug),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    therapists = await getTherapists(),
    home = await getHome()
  return {
    home,
    issueC,
    menu,
    book,
    issue,
    therapists,
    popvideos,
    popposts,
  }
}
