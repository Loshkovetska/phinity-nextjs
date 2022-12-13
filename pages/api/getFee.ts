import { getFeesContent, getMenu, getNoFound } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const getFee= async () => {
  const response = await getFeesContent()
  const menu = await getMenu(),
        therapists = await getTherapists()

  return {
    fees: response,
    menu,therapists
  }
}
export default getFee
