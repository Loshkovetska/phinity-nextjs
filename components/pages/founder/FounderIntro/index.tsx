import { observer } from "mobx-react";
import GlobalState from "../../../../stores/GlobalState";
import BubbleAnimation from "../../../common/BubbleAnimation";
import PageLinks from "../../../common/PageLinks";
import ScrollDown from "../../../../assets/post/arrow.svg";
import { useContentState } from "../../../../hooks/RootStoreProvider";

const FounderIntro = () => {
  const { founder } = useContentState();

  let main = "",
    thera = "";
  const linksL = GlobalState.links;
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link;
    thera = linksL.find((l: any) => l.id == 268).link;
  }

  const links = [
    {
      title: founder.mainPageTitle,
      link: main,
    },
    {
      title: `${founder.title}`,
      link: "/",
    },
  ];
  return (
    <section className="founder-intro animated fadeIn">
      <BubbleAnimation />
      <div className="founder-intro__container">
        <PageLinks links={links} />
      </div>
      <div className="founder-intro__content">
        <div className="founder-intro__col">
          <h1 className="founder-intro__title animated fadeIn">
            {founder.title?.split(" ").map((s: any, i: number) => (
              <span key={i}>{s}</span>
            ))}
          </h1>
          <div className="founder-intro__position animated fadeIn">
            {founder.position}
          </div>
          {/* <a
            className="button blue p18p40 animated fadeIn "
            href={founder.buttonLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className="button__text">
              {founder.buttonTitle}
            </div>
          </a> */}
        </div>

        <div className="about-service__img">
          <div className="about-service__mask">
            <img
              src={founder?.src}
              alt={founder.alt}
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

export default observer(FounderIntro);
