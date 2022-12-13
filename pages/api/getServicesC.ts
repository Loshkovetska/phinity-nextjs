import {
  getBookBlock,
  getMenu,
  getServicesContent,
} from '../../stores/ContentStore'
import {
  getPopularPosts,
  getPopularVideos,
  getServices,
  getServicesFilters,
  getTherapists,
} from '../../stores/DBStore'

export const getServicesC = async () => {
  const menu = await getMenu(),
    filters = await getServicesFilters(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    book = await getBookBlock(),
    servicesC = await getServicesContent(),
    services = await getServices(),
      therapists = await getTherapists()

  return {
    servicesC,
    menu,
    filters,
    popvideos,
    popposts,
    book,
    services,therapists
  }
}
