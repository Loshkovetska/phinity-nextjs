import {
  getBookBlock,
  getHome,
  getMenu,
  getFounderPage,
  getSubscribeBlock,
} from "../../stores/ContentStore";
import { getTherapistsAll } from "../../stores/DBStore";

export const getSingleFounder = async (slug: string) => {
  const menu = await getMenu(),
    book = await getBookBlock(),
    home = await getHome(),
    founder = await getFounderPage(slug),
    therapists = await getTherapistsAll(),
    subscribe = await getSubscribeBlock();


  return {
    home,
    menu,
    book,
    founder,
    therapists,subscribe
  };
};
