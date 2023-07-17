import Reviews from "../pages/home/Reviews";
import BookBlock from "..//pages/home/BookBlock";
import BlogContent from "..//pages/blog/BlogContent";
import Accreditation from "..//pages/home/Accreditation";
import { observer } from "mobx-react";
import PopularPosts from "..//pages/video/PopularPosts";
import PopularVideos from "..//pages/videos/PopularVideos";
import { useWindowDimensions } from "../../hooks/getWindowDimensions";
import Layout from "../common/Layout";
import { useContentState } from "../../hooks/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import Subscribe from "../common/Subscribe";
import DBStore, { getLocations } from "../../stores/DBStore";
import { runInAction } from "mobx";

const BlogPage = observer(({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions();
  const effectRef = useRef<boolean>(false);
  const [showBottom, setBottom] = useState(false);

  useEffect(() => {
    if (effectRef.current) return;
    getLocations().then((c: any) => {
      runInAction(() => {
        DBStore.locations = c;
      });
    });

    setTimeout(() => {
      setBottom(true);
    }, 1000);
    effectRef.current = true;
  }, []);
  const content = useContentState();
  return (
    <Layout>
      <BlogContent />
      {showBottom && (
        <>
          <PopularPosts
            content={{
              title: content.blog?.blogTitle,
              buttonTitle: content.blog?.blogButton,
            }}
          />
          <PopularVideos content={content.blog?.video} />
          <Reviews dt={content.blog?.reviews} />
          <BookBlock />
          {width <= 1024 && <div className="space-block"></div>}
          <Accreditation accreditation={content.blog?.accreditation} />
          <Subscribe />
          {/*  */}
        </>
      )}
    </Layout>
  );
});
export default BlogPage;
