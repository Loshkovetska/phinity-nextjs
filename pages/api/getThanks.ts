import { getMenu, getSubscribeBlock, getThanks } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const getThanksC = async () => {
  const response = await getThanks()
  const menu = await getMenu(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    thanks: response,
    menu,therapists, subscribe
  }
}
export default getThanksC
