import { getMenu, getNoFound } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const get404 = async () => {
  const response = await getNoFound()
  const menu = await getMenu(),
    therapists = await getTherapists()

  return {
    nofound: response,
    menu,
    therapists,
  }
}
export default get404
