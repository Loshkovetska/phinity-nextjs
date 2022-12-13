import { getMenu, getPrivacy, getTerms } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

export const getPolicy = async () => {
  const response = await getPrivacy()
  const menu = await getMenu(),
    therapists = await getTherapists()

  return {
    privacy: response,
    menu,
    therapists,
  }
}
export const getTermsC = async () => {
  const response = await getTerms()
  const menu = await getMenu(),
    therapists = await getTherapists()

  return {
    terms: response,
    menu,
    therapists,
  }
}
