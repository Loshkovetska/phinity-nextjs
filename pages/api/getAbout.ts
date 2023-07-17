import { DOMAIN } from "../../mocks/doman";
import {
  getAbout,
  getBookBlock,
  getMenu,
  getSubscribeBlock,
} from "../../stores/ContentStore";
import { getTherapists } from "../../stores/DBStore";

const getAboutContent = async () => {
  const response = await getAbout();
  const menu = await getMenu();
  const book = await getBookBlock(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();

  return {
    dt: response,
    menu,
    book,
    therapists,
    subscribe,
  };
};

export default getAboutContent;
