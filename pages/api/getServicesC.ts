import {
  getBookBlock,
  getMenu,
  getServicesContent,
  getSubscribeBlock,
} from '../../stores/ContentStore'
import {
  getPopularPosts,
  getPopularVideos,
  getServices,
  getServicesFilters,
  getTherapists,
} from '../../stores/DBStore'

export const getServicesC = async (slug:string) => {
  const menu = await getMenu(),
    filters = await getServicesFilters(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    book = await getBookBlock(),
    servicesC = await getServicesContent(slug),
    services = await getServices(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();
;

  return {
    servicesC,
    menu,
    filters,
    popvideos,
    popposts,
    book,
    services,therapists, subscribe
  }
}
