import { useEffect, useRef, useState } from "react";
import Reviews from "../pages/home/Reviews";
import DBStore, {
  filterVideos,
  getLocations,
  getVideos,
} from "../../stores/DBStore";
import BookBlock from "../pages/home/BookBlock";
import { observer } from "mobx-react";
import Filter from "../pages/therapists/Filter";
import PopularVideos from "../pages/videos/PopularVideos";
import NewVideos from "../pages/videos/NewVideos";
import { runInAction } from "mobx";
import Layout from "../common/Layout";
import classNames from "classnames";
import Subscribe from "../common/Subscribe";
import PopularPosts from "../pages/video/PopularPosts";

const VideosPage = observer(({ dt }: { dt: any }) => {
  const [showBottom, setBottom] = useState(false);
  useEffect(() => {
    runInAction(() => {
      DBStore.videos = dt.videos;
    });
    getLocations().then((c: any) => {
      runInAction(() => {
        DBStore.locations = c;
      });
    });

    setTimeout(() => {
      setBottom(true);
    }, 1000);
  }, [dt]);

  return (
    <>
      <Layout>
        <NewVideos />
        <div className={classNames(!showBottom && "hidden-block")}>
          <PopularPosts content={dt.videosC.blog} />
          <PopularVideos content={dt.videosC.video} />
          <Reviews dt={dt.videosC.reviews} />
          <BookBlock />
          <Subscribe />
        </div>
      </Layout>
      <Filter
        params={[dt.filters] || null}
        setFilter={(value) => {
          if (value == null) {
            getVideos().then((res) => {
              runInAction(() => {
                DBStore.videos = res;
              });
            });
          } else {
            const st: any = {};
            [dt.filters]?.forEach((e: any, i: number) => {
              st[e.title.replaceAll(" ", "")] = value[`p${i}`];
            });

            filterVideos(st).then((res) => {
              runInAction(() => {
                DBStore.videos = res;
              });
            });
          }
        }}
      />
    </>
  );
});

export default VideosPage;
