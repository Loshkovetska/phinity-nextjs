import { useEffect, useRef, useState } from "react";
import Intro from "../pages/services/Intro";
import BookBlock from "../pages/home/BookBlock";
import OurServices from "../pages/services/OurServices";
import PhinityAdvantages from "../pages/services/PhitityAdvantages";
import DBStore, { filterServices, getServices } from "../../stores/DBStore";
import { observer } from "mobx-react";
import Filter from "../pages/therapists/Filter";
import { runInAction } from "mobx";
import PopularPosts from "../pages/video/PopularPosts";
import PopularVideos from "../pages/videos/PopularVideos";
import Layout from "../common/Layout";
import { useContentState } from "../../hooks/RootStoreProvider";
import Subscribe from "../common/Subscribe";
import { useRouter } from "next/router";

const ServicesPage = observer(({ dt }: { dt: any }) => {
  const { query } = useRouter();
  const content = useContentState();
  let main = "";

  useEffect(() => {
    let services = content.services;

    if (query?.page) {
      services = services?.filter((c: any) => {
        const isPresent = c?.locations.find(
          (ci: any) => ci.link == query?.page
        );
        if (isPresent) {
          return c;
        }
      });
    }

    runInAction(() => {
      DBStore.services = services;
    });
  }, [content.services]);

  const linksL = content.links;
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link;
  }

  const links = [
    {
      title: content.servicesC?.mainPageTitle,
      link: main,
    },
    {
      title: content.servicesC?.pageTitle,
      link: "/services",
    },
  ];

  return (
    <>
      <Layout withScroll>
        <Intro
          dt={{
            ...content.servicesC.intro,
            buttonLink: content.servicesC.intro.buttonLink,
          }}
          links={links}
          classname="service-page"
        />
        <OurServices services={content.servicesC} />
        <PhinityAdvantages dt={content.servicesC.advantages} />
        <PopularPosts
          content={{
            title: content.servicesC.blogTitle,
            buttonTitle: content.servicesC.blogButton,
          }}
        />
        <PopularVideos content={content.servicesC.video} />
        <BookBlock />
        <Subscribe />
      </Layout>
      <Filter
        params={content.filters}
        setFilter={(value) => {
          if (value != null) {
            const st: any = {};
            content.filters.forEach((e: any, i: number) => {
              st[e.title.replaceAll(" ", "")] = value[`p${i}`];
            });
            filterServices(st).then((res) => {
              let services = res;
              if (query?.page) {
                services = services?.filter((c: any) => {
                  const isPresent = c?.locations.find(
                    (ci: any) => ci.link == query?.page
                  );
                  if (isPresent) {
                    return c;
                  }
                });
              }
              runInAction(() => {
                DBStore.services = services;
              });
            });
          } else {
            getServices().then((res) => {
              let services = res;
              if (query?.page) {
                services = services?.filter((c: any) => {
                  const isPresent = c?.locations.find(
                    (ci: any) => ci.link == query?.page
                  );
                  if (isPresent) {
                    return c;
                  }
                });
              }
              runInAction(() => {
                DBStore.services = services;
              });
            });
          }
        }}
      />
    </>
  );
});

export default ServicesPage;
