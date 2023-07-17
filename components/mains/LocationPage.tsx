import { observer } from "mobx-react";
import React from "react";
import Layout from "../common/Layout";
import Subscribe from "../common/Subscribe";
import LocationIntro from "../pages/location/LocationIntro";
import FindUs from "../pages/location/FindUs";
import LocationAbout from "../pages/location/LocationAbout";
import BookBlock from "../pages/home/BookBlock";
import Accreditation from "../pages/home/Accreditation";
import Reviews from "../pages/home/Reviews";
import TherapyHelp from "../pages/service/TherapyHelp";
import Therapists from "../pages/home/Therapists";
import HowItWork from "../common/HowItWorks";
import TherapyHelpVideos from "../common/TherapyHelpVideos";
import { useContentState } from "../../hooks/RootStoreProvider";

const LocationPage = observer(() => {
  const { location, home } = useContentState();
  return (
    <>
      <Layout withFooter={true} withVideo={false}>
        <LocationIntro />
        <LocationAbout />
        <FindUs />
        <HowItWork how={location.how} />
        <Therapists
          dt={location.therapists}
          therapist={home.therapist}
          therapists={home.therapists}
        />
        <TherapyHelpVideos dt={location.therapyVideos} />
        <TherapyHelp dt={location.therapyHelp} home={home} />
        <Reviews dt={location.reviews} />
        <Accreditation accreditation={location.accreditation} />
        <BookBlock />
        <Subscribe />
      </Layout>
    </>
  );
});

export default LocationPage;
