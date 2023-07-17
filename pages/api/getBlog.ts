import {
  getBlogContent,
  getBookBlock,
  getMenu,
  getSubscribeBlock,
} from "../../stores/ContentStore";
import {
  getBlogCategories,
  getLocations,
  getPopularPosts,
  getPopularVideos,
  getPosts,
  getTherapists,
  getVideos,
} from "../../stores/DBStore";

export const getBlog = async () => {
  const menu = await getMenu(),
    book = await getBookBlock(),
    videos = await getVideos(),
    categories = await getBlogCategories(),
    posts = await getPosts(),
    popvideos = await getPopularVideos(),
    popposts = await getPopularPosts(),
    blog = await getBlogContent(),
    therapists = await getTherapists(),
    locations = await getLocations(),
    subscribe = await getSubscribeBlock();
  return {
    blog,
    menu,
    book,
    videos,
    categories,
    posts,
    popvideos,
    popposts,
    therapists,
    locations,
    subscribe,
  };
};
