import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import Reviews from "../pages/home/Reviews";
import BookBlock from "../pages/home/BookBlock";
import Layout from "../common/Layout";
import Subscribe from "../common/Subscribe";
import LocationsContent from "../pages/locations/LocationsContent";
import { useContentState } from "../../hooks/RootStoreProvider";
import DBStore, { getLocations } from "../../stores/DBStore";
import { runInAction } from "mobx";

const LocationsPage = observer(() => {
  const content = useContentState();
  const effectRef = useRef<boolean>(false);
  useEffect(() => {
    if (effectRef.current) return;
    getLocations().then((c: any) => {
      runInAction(() => {
        DBStore.locations = c;
      });
    });
    effectRef.current = true;
  }, []);

  return (
    <>
      <Layout withFooter={true} withVideo={false}>
        <LocationsContent />
        <Reviews dt={content.locations.reviews} />
        <BookBlock />
        <Subscribe />
      </Layout>
    </>
  );
});

export default LocationsPage;
