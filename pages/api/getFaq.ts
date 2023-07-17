import { getFaqContent, getMenu, getNoFound, getSubscribeBlock } from '../../stores/ContentStore'
import { getFaqs, getTherapists } from '../../stores/DBStore'

const getFaq = async () => {
  const response = await getFaqContent()
  const menu = await getMenu()
  const faqs = await getFaqs(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    faq: response,
    faqs,
    menu,
    therapists,subscribe
  }
}
export default getFaq
