import {
  getAbout,
  getBookBlock,
  getContactContent,
  getMenu,
} from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

const getContact = async () => {
  const response = await getContactContent(),
    menu = await getMenu(),
    book = await getBookBlock(),
    therapists = await getTherapists()
  const about = await getAbout()

  return {
    contact: response,
    menu,
    book,
    therapists,
    about,
  }
}

export default getContact
