import { observer } from "mobx-react";
import { useEffect } from "react";
import PageLinks from "../../../common/PageLinks";
import LocationCard from "../../../common/LocationCard";
import DBStore from "../../../../stores/DBStore";
import { useContentState } from "../../../../hooks/RootStoreProvider";

const LocationsContent = () => {
  const { locations, links: linksL } = useContentState();

  useEffect(() => {
    const smooth = document.querySelector(".smooth");
    const issues = smooth!.querySelector(".locs-page");
    const title = smooth!.querySelector(".locs-page__title");

    if (!smooth || !issues) return;
    title?.classList.add("animated");
  }, [locations]);

  let main = "",
    locs = "";

  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link;
    locs = linksL.find((l: any) => l.id == 5083).link;
  }

  const links = [
    {
      title: locations?.mainPageTitle || "Home",
      link: main,
    },
    {
      title: locations?.pageTitle || "All locations",
      link: "/locations",
    },
  ];

  return (
    <section className="locs-page">
      {locations && <PageLinks links={links} />}

      <div className="locs-page__container">
        <div style={{ overflow: "hidden" }}>
          <h1
            className="locs-page__title"
            dangerouslySetInnerHTML={{ __html: locations?.title }}
          ></h1>
        </div>
        <div className="locs-page__list">
          {DBStore.locations?.map((c: any, i: number) => (
            <LocationCard item={c} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default observer(LocationsContent);
