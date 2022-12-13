import { getFaqContent, getMenu, getNoFound } from '../../stores/ContentStore'
import { getFaqs, getTherapists } from '../../stores/DBStore'

const getFaq = async () => {
  const response = await getFaqContent()
  const menu = await getMenu()
  const faqs = await getFaqs(),
    therapists = await getTherapists()

  return {
    faq: response,
    faqs,
    menu,
    therapists,
  }
}
export default getFaq
