import { DOMAIN } from "../../mocks/doman";
import getHome from "../api/getHome";
import getAbout from "../api/getAbout";
import AboutPage from "../../components/mains/AboutPage";
import NoFound from "../../components/mains/404";
import get404 from "../api/get404";
import ThanksPage from "../../components/mains/ThanksPage";
import getThanksC from "../api/getThanks";
import { useEffect } from "react";
import { runInAction } from "mobx";
import ContentStore, {
  getCookieContent,
  getSeo,
} from "../../stores/ContentStore";
import { getReviewsIO } from "../../stores/GlobalState";
import ContactPage from "../../components/mains/ContactPages";
import getContact from "../api/getContact";
import DBStore, {
  getFounders,
  getLocations,
  getReviews,
} from "../../stores/DBStore";
import CookiePage from "../../components/mains/CookiePage";
import getCook from "../api/getCook";
import getFaq from "../api/getFaq";
import FaqPage from "../../components/mains/FaqPage";
import FeesPage from "../../components/mains/FeesPage";
import getFee from "../api/getFee";
import PrivacyPage from "../../components/mains/PrivacyPage";
import TermsPage from "../../components/mains/TermsPage";
import { getPolicy, getTermsC } from "../api/getPolicy";
import BlogPage from "../../components/mains/BlogPage";
import { getBlog } from "../api/getBlog";
import WorkPage from "../../components/mains/WorkPage";
import { getWorkC } from "../api/getWorkC";
import { getVideosC } from "../api/getVideosC";
import VideosPage from "../../components/mains/VideosPage";
import TherapistsPage from "../../components/mains/TherapistsPage";
import { getTherapistsC } from "../api/getTherapistsC";
import Head from "next/head";
import { getPlugins } from "../../stores/ContentStore";
import HeaderSeo from "../../components/common/HeaderSeo";
import { getLocsPage } from "../api/getLocsPage";
import LocationsPage from "../../components/mains/LocationsPage";
import HomePage from "../../components/mains/HomePage";
import { getIssuesC } from "../api/getIssuesC";
import FounderPage from "../../components/mains/FounderPage";
import { getSingleFounder } from "../api/getSingleFounder";
import IssuesPage from "../../components/mains/IssuesPage";

var FormData = require("form-data");

const Page = ({ dt, currentPage }: { dt: any; currentPage: any }) => {
  useEffect(() => {
    if (!dt) {
      return;
    }

    if (dt?.reviews) {
      runInAction(() => {
        DBStore.reviews = dt.reviews;
      });
    }

    if (dt?.menu) {
      runInAction(() => {
        ContentStore.menu = dt.menu;
      });
    }

    if (dt?.book) {
      runInAction(() => {
        ContentStore.book = dt.book;
      });
    }
  }, [dt]);
  return (
    <>
      {dt && (
        <Head>
          <title>{dt.metas?.title}</title>
          <HeaderSeo metas={dt.metas} plugins={dt.plugins} />
        </Head>
      )}
      {dt && currentPage == 2 && (
        <HomePage
          home={dt.home}
          posts={dt.posts}
          therapists={dt.therapists}
          reviews={dt.reviews}
          videos={dt.videos}
          menu={dt.menu}
        />
      )}
      {dt && currentPage == 601 && <NoFound dt={dt} />}
      {currentPage == 259 && dt && <AboutPage dt={dt} />}
      {currentPage == 5083 && dt && <LocationsPage />}
      {dt && currentPage == 635 && <ThanksPage dt={dt} />}
      {dt && currentPage == 274 && <ContactPage dt={dt} />}
      {dt && currentPage == 775 && <CookiePage dt={dt} />}
      {dt && currentPage == 507 && <FaqPage dt={dt} />}
      {dt && currentPage == 270 && <FeesPage dt={dt} />}
      {dt && currentPage == 3 && <PrivacyPage dt={dt} />}
      {dt && currentPage == 591 && <TermsPage dt={dt} />}
      {dt && currentPage == 272 && <BlogPage dt={dt} />}
      {dt && currentPage == 262 && <WorkPage dt={dt} />}
      {dt && currentPage == 266 && <IssuesPage dt={dt} />}
      {dt && currentPage == 268 && <TherapistsPage dt={dt} />}
      {dt && currentPage == 644 && <VideosPage dt={dt} />}
      {dt && currentPage == 10000 && <FounderPage />}
    </>
  );
};

export default Page;

export async function getStaticPaths() {
  const fd = new FormData();
  fd.append("status", "linkPage");
  const request = await fetch(DOMAIN + "react", {
    method: "POST",
    body: fd,
  });

  const response = await request.json();
  const paths = response
    ?.filter((e: any) => ![16, 626, 650, 2, 4475, 780, 264].includes(+e.id))
    ?.map((l: any) => {
      return { params: { page: l.link.replaceAll("/", ""), path: l.link } };
    });

  const founders = await getFounders();
  const locations = await getLocations();

  locations?.forEach((c: any) => {
    paths.push({ params: { page: c.slug, path: "/" + c.slug } });
  });
  founders?.forEach((c: any) => {
    paths.push({
      params: {
        page: c.slug,
        path: `/${c.slug}`,
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const fd = new FormData();
  fd.append("status", "linkPage");
  const request = await fetch(DOMAIN + "react", {
    method: "POST",
    body: fd,
  });
  let page = undefined;

  const response = await request.json();
  const locations = await getLocations();

  let res = response?.find((r: any) => r.link == "/" + params.page);
  let result = null;
  let idPage = 0;

  if (res) {
    switch (+res.id) {
      case 2:
        result = await getHome();
        idPage = +res.id;
        break;
      case 259:
        result = await getAbout();
        idPage = +res.id;
        break;
      case 266:
        result = await getIssuesC();
        idPage = +res.id;
        break;
      case 601:
        result = await get404();
        idPage = +res.id;

        break;
      case 635:
        result = await getThanksC();
        idPage = +res.id;

        break;
      case 274:
        result = await getContact();
        idPage = +res.id;

        break;
      case 775:
        result = await getCook();
        idPage = +res.id;

        break;
      case 507:
        result = await getFaq();
        idPage = +res.id;

        break;
      case 270:
        result = await getFee();
        idPage = +res.id;

        break;
      case 3:
        result = await getPolicy();
        idPage = +res.id;

        break;
      case 591:
        result = await getTermsC();
        idPage = +res.id;

        break;
      case 272:
        result = await getBlog();
        idPage = +res.id;

        break;
      case 262:
        result = await getWorkC();
        idPage = +res.id;

        break;
      case 644:
        result = await getVideosC();
        idPage = +res.id;

        break;
      case 268:
        result = await getTherapistsC();
        idPage = +res.id;
        break;

      case 5083:
        result = await getLocsPage();
        idPage = +res.id;
        break;
    }
  } else {
    const founders = await getFounders();
    const isFounder = founders.find((c: any) => c.slug == params.page);

    if (isFounder) {
      result = await getSingleFounder(params.page);
      idPage = +(result as any).founder.id;
      page = "founders";
      res = {
        id: 10000,
      };
    }

    const isLocPage = locations.find((c: any) => c.slug == params.page);
    if (isLocPage) {
      result = await getHome();

      idPage = 2;
      res = {
        id: 2,
      };
    }

    if (!isLocPage && !isFounder) {
      return {
        notFound: true,
      };
    }
  }

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
      currentPage: res ? res.id : 9999999999,
      dt: result,
    },
  };
}
