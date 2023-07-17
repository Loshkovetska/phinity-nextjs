import HomePage from "../components/mains/HomePage";
import { DOMAIN } from "../mocks/doman";
import getHome from "./api/getHome";
import { getReviews } from "../stores/DBStore";
import { getCookieContent, getSeo } from "../stores/ContentStore";
import Head from "next/head";
import { getReviewsIO } from "../stores/GlobalState";
import { getPlugins } from "../stores/ContentStore";
import HeaderSeo from "../components/common/HeaderSeo";
import fetch from "node-fetch";

var FormData = require("form-data");

const Home = ({ dt }: { dt: any }) => {
  return (
    <>
      {dt && (
        <Head>
          <title>{dt.metas?.title}</title>
          <HeaderSeo metas={dt.metas} plugins={dt.plugins} />
        </Head>
      )}
      {dt && (
        <HomePage
          home={dt.home}
          posts={dt.posts}
          therapists={dt.therapists}
          reviews={dt.reviews}
          videos={dt.videos}
          menu={dt.menu}
        />
      )}
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const fd = new FormData();
  fd.append("status", "linkPage");
  const request = await fetch(DOMAIN + "react", {
    method: "POST",
    body: fd,
  });

  //issues - 266, vacancies-262, therapists - 268, services-264, videos - 644
  const response = await request.json();

  let result = null;
  result = await getHome();
  const reviews = await getReviews();
  const cookie = await getCookieContent();
  const metas = await getSeo(2);
  const reviewIO = await getReviewsIO();
  const plugins = await getPlugins();

  result = {
    ...result,
    reviews,
    cookieCont: cookie,
    metas,
    reviewIO,
    links: response,
    plugins,
  };

  return {
    props: {
      dt: result,
    },
  };
}
