import {
  getBookBlock,
  getMenu,
  getSubscribeBlock,
  getTherapistsContent,
} from '../../stores/ContentStore'
import { getTherapists, getTherapistsFilters } from '../../stores/DBStore'

export const getTherapistsC = async () => {
  const menu = await getMenu(),
    filters = await getTherapistsFilters(),
    therapistsC = await getTherapistsContent(),
    therapists = await getTherapists(),
    book = await getBookBlock(),
    subscribe = await getSubscribeBlock();


  return {
    therapistsC,
    menu,
    filters,
    therapists,
    book,subscribe
  }
}
