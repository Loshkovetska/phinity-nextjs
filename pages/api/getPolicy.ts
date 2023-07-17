import { getMenu, getPrivacy, getSubscribeBlock, getTerms } from '../../stores/ContentStore'
import { getTherapists } from '../../stores/DBStore'

export const getPolicy = async () => {
  const response = await getPrivacy()
  const menu = await getMenu(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    privacy: response,
    menu,
    therapists,subscribe
  }
}
export const getTermsC = async () => {
  const response = await getTerms()
  const menu = await getMenu(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();


  return {
    terms: response,
    menu,
    therapists,
    subscribe,
  };
}
