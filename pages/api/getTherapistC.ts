import {
  getBookBlock,
  getMenu,
  getTherapistContent,
} from '../../stores/ContentStore'
import { getTherapist, getTherapists } from '../../stores/DBStore'

export const getTherapistC = async (slug: string) => {
  const therapistC = await getTherapistContent(slug)
  const menu = await getMenu()
  const book = await getBookBlock(),
    therapist = await getTherapist(slug),
          therapists = await getTherapists()

  return {
    therapistC,
    menu,
    book,
    therapist,therapists
  }
}
