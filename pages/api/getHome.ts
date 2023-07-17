import { DOMAIN } from "../../mocks/doman";
import {
  getBookBlock,
  getHome,
  getMenu,
  getSubscribeBlock,
} from "../../stores/ContentStore";
import { getReviews } from "../../stores/DBStore";
var FormData = require("form-data");

const getHomePage = async () => {
  let fd = new FormData();
  const home = await getHome();

  fd = new FormData();
  fd.append("status", "post");
  const req2 = await fetch(DOMAIN + "react/", {
    method: "POST",
    body: fd,
  });

  const posts = await req2.json();

  fd = new FormData();
  fd.append("status", "therapists");
  const req3 = await fetch(DOMAIN + "react/", {
    method: "POST",
    body: fd,
  });

  const therapists = await req3.json();

  fd = new FormData();
  fd.append("status", "videos");
  const req5 = await fetch(DOMAIN + "react/", {
    method: "POST",
    body: fd,
  });
  const videos = await req5.json();

  const menu = await getMenu();
  const book = await getBookBlock(),
    subscribe = await getSubscribeBlock();

  return {
    home,
    posts,
    therapists,
    videos,
    menu,
    book,
    subscribe,
  };
};

export default getHomePage;
