import { getMenu, getNoFound, getSubscribeBlock } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const get404 = async () => {
  const response = await getNoFound()
  const menu = await getMenu(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    nofound: response,
    menu,
    therapists,
    subscribe,
  };
}
export default get404
