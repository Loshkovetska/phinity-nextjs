import {
  getBookBlock,
  getHome,
  getLocationsPage,
  getMenu,
  getSubscribeBlock,
} from '../../stores/ContentStore'
import { getTherapistsAll } from '../../stores/DBStore'

export const getLocsPage = async () => {
  const menu = await getMenu(),
    book = await getBookBlock(),
    home = await getHome(),
    locations = await getLocationsPage(),
    therapists = await getTherapistsAll(),
    subscribe = await getSubscribeBlock();

  
    return {
      home,
      menu,
      book,
      locations,
      therapists,
      subscribe,
    };
}
