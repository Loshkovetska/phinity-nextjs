import {
  getBookBlock,
  getHome,
  getMenu,
  getLocation,
  getSubscribeBlock,
} from "../../stores/ContentStore";
import { getTherapistsAll } from "../../stores/DBStore";

export const getSingleLocation = async (slug: string) => {
  const menu = await getMenu(),
    book = await getBookBlock(),
    home = await getHome(),
    location = await getLocation(slug),
    therapists = await getTherapistsAll(),
    subscribe = await getSubscribeBlock();
  return {
    home,
    menu,
    book,
    location,
    therapists,
    subscribe,
  };
};
