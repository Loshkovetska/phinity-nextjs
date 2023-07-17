import Head from "next/head";
import NoFound from "../components/mains/404";
import { getCookieContent, getPlugins, getSeo } from "../stores/ContentStore";
import get404 from "./api/get404";
import HeaderSeo from "../components/common/HeaderSeo";
import { DOMAIN } from "../mocks/doman";
var FormData = require("form-data");

const Page404 = ({ dt }: { dt: any }) => {
  return (
    <>
      {dt && (
        <Head>
          <title>{dt.metas?.title}</title>
          <HeaderSeo metas={dt.metas} plugins={dt.plugins} />
        </Head>
      )}

      {dt && <NoFound dt={dt} />}
    </>
  );
};

export default Page404;

export async function getStaticProps() {
  let result: any = await get404();
  const cookie = await getCookieContent();
  const metas = await getSeo(601);
  const plugins = await getPlugins();
  const fd = new FormData();
  fd.append("status", "linkPage");
  const request = await fetch(DOMAIN + "react", {
    method: "POST",
    body: fd,
  });

  const response = await request.json();

  result = { ...result, cookieCont: cookie, metas, plugins, links: response };
  return {
    props: {
      dt: result,
    },
  };
}
