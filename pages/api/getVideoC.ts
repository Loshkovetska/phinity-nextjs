import {
  getBookBlock,
  getHome,
  getMenu,
  getSubscribeBlock,
  getVideoContent,
  getVideosContent,
} from "../../stores/ContentStore";
import {
  getPopularPosts,
  getPopularVideos,
  getTherapists,
  getVideo,
  getVideos,
  getVideosFilters,
} from "../../stores/DBStore";

export const getVideoC = async (slug: string) => {
  const menu = await getMenu(),
    videoC = await getVideoContent(slug),
    video = await getVideo(slug),
    book = await getBookBlock(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    videos = await getVideos(),
    home = await getHome(),
    therapists = await getTherapists(),
    subscribe = await getSubscribeBlock();
  return {
    videoC,
    menu,
    video,
    book,
    popvideos,
    popposts,
    videos,
    therapists,
    subscribe,
  };
};
