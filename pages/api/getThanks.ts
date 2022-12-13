import { getMenu, getThanks } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const getThanksC = async () => {
  const response = await getThanks()
  const menu = await getMenu(),
        therapists = await getTherapists()

  return {
    thanks: response,
    menu,therapists
  }
}
export default getThanksC
