import Head from "next/head";
import NoFound from "../components/mains/404";
import { getCookieContent, getPlugins, getSeo } from "../stores/ContentStore";
import get404 from "./api/get404";
import HeaderSeo from "../components/common/HeaderSeo";

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

  result = { ...result, cookieCont: cookie, metas, plugins };
  return {
    props: {
      dt: result,
    },
  };
}
