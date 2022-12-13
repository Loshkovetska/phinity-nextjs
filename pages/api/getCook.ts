import { getMenu, getCookiePageContent } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const getCook = async () => {
  const response = await getCookiePageContent()
  const menu = await getMenu(),
    therapists = await getTherapists()

  return {
    cookie: response,
    menu,
    therapists,
  }
}
export default getCook
