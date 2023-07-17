import {
  getMenu,
  getCookiePageContent,
  getSubscribeBlock,
} from "../../stores/ContentStore";
import { getTherapists } from "../../stores/DBStore";

const getCook = async () => {
  const response = await getCookiePageContent();
  const menu = await getMenu(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();
  return {
    cookie: response,
    menu,
    therapists,
    subscribe,
  };
};
export default getCook;
