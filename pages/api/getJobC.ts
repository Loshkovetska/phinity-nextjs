import {
  getFaqContent,
  getHome,
  getJobContent,
  getMenu,
  getNoFound,
  getSubscribeBlock,
} from '../../stores/ContentStore'
import { getFaqs, getTherapists, getVacancy } from '../../stores/DBStore'

const getJobC = async (slug: string) => {
  const response = await getJobContent()
  const menu = await getMenu(),
    job = await getVacancy(slug),
    home = await getHome(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    jobC: response,
    job,
    menu,
    home,
    therapists,subscribe
  }
}
export default getJobC
