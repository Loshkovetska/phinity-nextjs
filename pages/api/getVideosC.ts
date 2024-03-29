import {
  getBookBlock,
  getMenu,
  getSubscribeBlock,
  getVideosContent,
} from "../../stores/ContentStore";
import {
  getPopularPosts,
  getPopularVideos,
  getTherapists,
  getVideos,
  getVideosFilters,
  getWorkFilters,
} from "../../stores/DBStore";

export const getVideosC = async () => {
  const menu = await getMenu(),
    filters = await getVideosFilters(),
    videosC = await getVideosContent(),
    videos = await getVideos(),
    book = await getBookBlock(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();
  return {
    videosC,
    menu,
    filters,
    videos,
    book,
    popvideos,
    popposts,
    therapists,
    subscribe,
  };
};
