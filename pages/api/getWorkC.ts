import {
  getBookBlock,
  getMenu,
  getSubscribeBlock,
  getWork,
} from "../../stores/ContentStore";
import {
  getTherapists,
  getVacancies,
  getWorkFilters,
} from "../../stores/DBStore";

export const getWorkC = async () => {
  const menu = await getMenu(),
    filters = await getWorkFilters(),
    workC = await getWork(),
    vacancies = await getVacancies(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();

  return {
    workC,
    menu,
    filters,
    vacancies,
    therapists,
    subscribe,
  };
};
