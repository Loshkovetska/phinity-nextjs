import { observer } from "mobx-react";
import React from "react";
import Layout from "../common/Layout";
import Subscribe from "../common/Subscribe";
import { useContentState } from "../../hooks/RootStoreProvider";
import FounderIntro from "../pages/founder/FounderIntro";
import FounderContent from "../pages/founder/FounderContent";
import Stories from "../pages/founder/Stories";
import Reviews from "../pages/home/Reviews";
import BookBlock from "../pages/home/BookBlock";
import Quote from "../pages/founder/Quote";

const FounderPage = observer(() => {
  const content = useContentState();
  return (
    <>
      <Layout withFooter={true} withVideo={false}>
        <FounderIntro />
        <FounderContent />
        <Reviews dt={content.home.reviews} />
        <Stories />
        <BookBlock />
        <Quote />
        <Subscribe />
      </Layout>
    </>
  );
});

export default FounderPage;
