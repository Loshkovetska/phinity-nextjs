import PageLinks from "../../../common/PageLinks";
import { observer } from "mobx-react";
import Vectors from "../../../../assets/Ellipse 67.svg";
import ScrollDown from "../../../../assets/post/arrow.svg";
import ReviewWidget from "../../../common/ReviewWidget";
import BubbleAnimation from "../../../common/BubbleAnimation";
import { useContentState } from "../../../../hooks/RootStoreProvider";

const LocationIntro = () => {
  const { location, links: linksL } = useContentState();
  let main = "",
    locs = "";

  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link;
    locs = linksL.find((l: any) => l.id == 5083).link;
  }
  const links = [
    {
      title: location?.mainPageTitle,
      link: main,
    },
    {
      title: location?.pageTitle,
      link: locs,
    },
    {
      title: `${location?.title}`,
      link: "/",
    },
  ];

  return (
    <section className="loc-intro animated fadeIn">
      <BubbleAnimation />
      <div className="therapist-intro__container">
        <PageLinks links={links} />
        <div className="therapist-intro__content">
          <div className="loc-intro__col">
            <h1 className="loc-intro__title animated fadeIn">
              {location?.title}
            </h1>
            <ReviewWidget />
            <p
              className="loc-intro__text animated fadeIn delay-3s"
              dangerouslySetInnerHTML={{ __html: location?.text }}
            ></p>
            <div className="loc-intro__col-bottom">
              <a
                className="button blue p18p40 animated fadeIn delay-4s"
                href={location?.buttonLink}
                target="_blank"
                rel="noreferrer"
              >
                <div className="button__text">{location?.buttonTitle}</div>
              </a>
            </div>
          </div>
          <div className="therapist-intro__img animated fadeIn">
            <img src={location?.img?.src} alt={location?.img?.alt} />
            <img
              src="/ther-vectors.svg"
              alt={location?.title}
              className="therapist-intro__vectors"
            />
          </div>
        </div>
      </div>
      <div className="intro__scrolldown animated fadeIn">
        <ScrollDown />
        <ScrollDown />
        <ScrollDown />
      </div>
    </section>
  );
};

export default observer(LocationIntro);
