import { runInAction } from "mobx";
import Head from "next/head";
import { useEffect } from "react";
import ServicePage from "../../../components/mains/ServicePage";
import { DOMAIN } from "../../../mocks/doman";
import ContentStore, {
  getCookieContent,
  getPlugins,
  getSeo,
} from "../../../stores/ContentStore";
import DBStore, {
  getLocations,
  getReviews,
  getServices,
} from "../../../stores/DBStore";
import { getReviewsIO } from "../../../stores/GlobalState";
import { getServiceC } from "../../api/getServiceC";
import HeaderSeo from "../../../components/common/HeaderSeo";
import Script from "next/script";

var FormData = require("form-data");

const SubPage = ({ dt, currentPage }: { dt: any; currentPage: any }) => {
  useEffect(() => {
    if (!dt) return;

    if (dt.reviews) {
      runInAction(() => {
        DBStore.reviews = dt.reviews;
      });
    }
    if (dt.therapists) {
      runInAction(() => {
        DBStore.therapists = dt.therapists;
      });
    }
    if (dt.menu) {
      runInAction(() => {
        ContentStore.menu = dt.menu;
      });
    }

    if (dt.book) {
      runInAction(() => {
        ContentStore.book = dt.book;
      });
    }
    if (dt.faqs) {
      runInAction(() => {
        DBStore.faqs = dt.faqs;
      });
    }
    if (dt.videos) {
      runInAction(() => {
        DBStore.videos = dt.videos;
      });
    }
    if (dt.posts) {
      runInAction(() => {
        DBStore.posts = dt.posts;
      });
    }
    if (dt.popvideos) {
      runInAction(() => {
        DBStore.popularVideos = dt.popvideos;
      });
    }
    if (dt.popposts) {
      runInAction(() => {
        DBStore.popularPosts = dt.popposts;
      });
    }
    if (dt.vacancies) {
      runInAction(() => {
        DBStore.vacancies = dt.vacancies;
      });
    }

    if (dt?.locationsCards) {
      runInAction(() => {
        DBStore.locations = dt.locationsCards;
      });
    }
  }, [dt]);

  if (!dt) return <></>;
  return (
    <>
      {dt && (
        <Head>
          <title>{dt.metas?.title}</title>
          {currentPage == 272 && (
            <>
              <meta
                property="article:publisher"
                content="https://www.facebook.com/phinitytherapy"
              ></meta>
            </>
          )}
          <HeaderSeo
            metas={dt.metas}
            plugins={dt.plugins}
            page={currentPage == 272 ? "post" : "page"}
            canonical={`https://phinitytherapy.com/blog/${dt.postC?.link}/`}
          />
        </Head>
      )}
      {dt && currentPage == 264 && <ServicePage data={dt} />}
    </>
  );
};

export default SubPage;

export async function getStaticPaths() {
  const fd = new FormData();
  fd.append("status", "linkPage");
  const request = await fetch(DOMAIN + "react", {
    method: "POST",
    body: fd,
  });

  //issues - 266, vacancies-262, therapists - 268, services-264, videos - 644
  const response = await request.json();
  const paths: any = [];

  const services = await getServices();
  const locations = await getLocations();

  response
    ?.filter((l: any) => +l.id == 264)
    ?.forEach((l: any) => {
      if (+l.id == 264) {
        locations?.forEach((c: any) => {
          services.forEach((ci: any) => {
            const isPresent = ci?.locations?.find((cid: any) => cid.id == c.id);
            if (isPresent) {
              paths.push({
                params: {
                  page: c.slug,
                  sub: l.link.replaceAll("/", ""),
                  undersub: ci.link,
                  path: `/${c.slug}${l.link}/${ci.link}`,
                },
              });
            }
          });
        });
      }
    });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const fd = new FormData();
  fd.append("status", "linkPage");
  const request = await fetch(DOMAIN + "react/", {
    method: "POST",
    body: fd,
  });

  const response = await request.json();

  let res = response?.find((r: any) => r.link.includes("/" + params.sub));
  let idPage = 0;
  let result: any = {};
  let page: any = "";

  if (res) {
    switch (+res.id) {
      case 264:
        result = await getServiceC(params.undersub);
        idPage = +(result as any).serviceC.id;
        page = "services";
        break;
    }
  } else
    return {
      notFound: true,
    };
  const reviews = await getReviews();
  const cookie = await getCookieContent();
  const metas = await getSeo(idPage, page);
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
      currentPage: res.id,
      dt: result,
    },
  };
}
