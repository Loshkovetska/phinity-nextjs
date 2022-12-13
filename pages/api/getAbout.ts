import { DOMAIN } from '../../mocks/doman'
import { getAbout, getBookBlock, getMenu } from '../../stores/ContentStore'
import { getReviews, getTherapists } from '../../stores/DBStore'

const getAboutContent = async () => {
  const response = await getAbout()
  const menu = await getMenu()
  const book = await getBookBlock(),
      therapists = await getTherapists()

  return {
    dt: response,
    menu,
    book,therapists
  }
}

export default getAboutContent
