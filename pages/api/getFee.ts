import { getFeesContent, getMenu, getNoFound, getSubscribeBlock } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const getFee= async () => {
  const response = await getFeesContent()
  const menu = await getMenu(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    fees: response,
    menu,
    therapists,
    subscribe,
  };
}
export default getFee
