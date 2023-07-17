import { runInAction } from "mobx";
import Head from "next/head";
import { useEffect } from "react";
import IssuePage from "../../../components/mains/IssuePage";
import JobPage from "../../../components/mains/JobPage";
import TherapistPage from "../../../components/mains/TherapistPage";
import VideoPage from "../../../components/mains/VideoPage";
import { DOMAIN } from "../../../mocks/doman";
import ContentStore, {
  getCookieContent,
  getPlugins,
  getSeo,
} from "../../../stores/ContentStore";
import DBStore, {
  getIssues,
  getLocations,
  getPosts,
  getReviews,
  getTherapistsAll,
  getVacancies,
  getVideos,
} from "../../../stores/DBStore";
import { getReviewsIO } from "../../../stores/GlobalState";
import { getIssueC } from "../../api/getIssueC";
import getJobC from "../../api/getJobC";
import { getTherapistC } from "../../api/getTherapistC";
import { getVideoC } from "../../api/getVideoC";
import HeaderSeo from "../../../components/common/HeaderSeo";
import { getPostC } from "../../api/getPostC";
import PostPage from "../../../components/mains/PostPage";
import { getServicesC } from "../../api/getServicesC";
import ServicesPage from "../../../components/mains/ServicesPage";
import { getSingleLocation } from "../../api/getSingleLocation";
import LocationPage from "../../../components/mains/LocationPage";
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
      {dt && currentPage == 5083 && <LocationPage />}
      {dt && currentPage == 268 && <TherapistPage dt={dt} />}
      {dt && currentPage == 266 && <IssuePage data={dt} />}
      {dt && currentPage == 264 && <ServicesPage dt={dt} />}
      {dt && currentPage == 644 && <VideoPage data={dt} />}
      {dt && currentPage == 262 && <JobPage data={dt} />}
      {dt && currentPage == 272 && <PostPage dt={dt} />}
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

  //issues - 266, vacancies-262, therapists - 268, services-264, videos - 644, about - 259
  const response = await request.json();

  const therapists = await getTherapistsAll(),
    videos = await getVideos(),
    vacancies = await getVacancies(),
    posts = await getPosts(),
    issues = await getIssues(),
    locations = await getLocations();

  const paths: any = [];
  response
    ?.filter((l: any) =>
      [262, 268, 644, 272, 264, 266, 5083, 259].includes(+l.id)
    )
    ?.forEach((l: any) => {
      if (l.id == 264) {
        locations?.forEach((c: any) => {
          paths.push({
            params: {
              page: c.slug,
              sub: l.link.replaceAll("/", ""),
              path: `/${c.slug}${l.link.replaceAll("/", "")}`,
            },
          });
        });
      }
      if (l.id == 266) {
        issues?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll("/", ""),
              sub: is.link,
              path: l.link + "/" + is.link,
            },
          });
        });
      }
      if (l.id == 5083) {
        locations?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll("/", ""),
              sub: is.slug,
              path: l.link + "/" + is.slug,
            },
          });
        });
      }
      if (l.id == 272) {
        posts?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll("/", ""),
              sub: is.link,
              path: l.link + "/" + is.link,
            },
          });
        });
      }
      if (l.id == 262) {
        vacancies?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll("/", ""),
              sub: is.link,
              path: l.link + "/" + is.link,
            },
          });
        });
      }
      if (l.id == 268) {
        therapists?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll("/", ""),
              sub: is.link,
              path: l.link + "/" + is.link,
            },
          });
        });
      }
      if (l.id == 644) {
        videos?.forEach((is: any) => {
          paths.push({
            params: {
              page: l.link.replaceAll("/", ""),
              sub: is.link,
              path: l.link + "/" + is.link,
            },
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

  let res = response?.find((r: any) => r.link.includes("/" + params.page));

  let idPage = 0;
  let result: any = {};
  let page: any = "";

  let isServicePage = response?.find(
    (l: any) =>
      l.parent == params.page && l.link.replaceAll("/", "") == params.sub
  );

  if (res && !isServicePage) {
    switch (+res.id) {
      case 5083:
        result = await getSingleLocation(params.sub);
        idPage = +(result as any).location.id;
        page = "locations";
        break;
      case 266:
        result = await getIssueC(params.sub);
        idPage = +(result as any).issueC.id;
        page = "issues";
        break;
      case 262:
        result = await getJobC(params.sub);
        idPage = +(result as any).job.id;
        page = "vacancies";
        break;
      case 644:
        result = await getVideoC(params.sub);
        idPage = +(result as any).videoC.id;
        page = "videos";
        break;
      case 268:
        result = await getTherapistC(params.sub);
        idPage = +(result as any).therapistC.id;
        page = "therapists";
        break;
      case 272:
        result = await getPostC(params.sub);
        page = "blog";
        if (!result.post) {
          const errs = response?.find((r: any) => r.id == 601);
          return {
            redirect: {
              source: params.page + "/" + params.sub,
              destination: errs.link,
              permanent: true,
            },
          };
        }
        idPage = +result?.postC.id;

        break;
    }
  } else {
    // res = response?.find((r: any) => r.link.includes("/" + params.sub));
    result = await getServicesC(params.page);
    idPage = +isServicePage.id;
    res.id = 264;
    page = null;
  }

  const reviews = await getReviews();
  const cookie = await getCookieContent();
  const metas = (await getSeo(idPage, page)) || {};
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
