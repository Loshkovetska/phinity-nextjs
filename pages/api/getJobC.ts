import {
  getFaqContent,
  getHome,
  getJobContent,
  getMenu,
  getNoFound,
} from '../../stores/ContentStore'
import { getFaqs, getTherapists, getVacancy } from '../../stores/DBStore'

const getJobC = async (slug: string) => {
  const response = await getJobContent()
  const menu = await getMenu(),
    job = await getVacancy(slug),
    home = await getHome(),
          therapists = await getTherapists()


  return {
    jobC: response,
    job,
    menu,
    home,therapists
  }
}
export default getJobC
