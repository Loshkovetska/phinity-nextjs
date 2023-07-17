import { observer } from "mobx-react";
import Vector from "../../../../assets/Vector 1.svg";
import VectorScroll from "../../../../assets/Vector 5.svg";
import { useEffect } from "react";
import { useWindowDimensions } from "../../../../hooks/getWindowDimensions";
import { useWindowScroll } from "../../../../hooks/getWindowScroll";
const TherapyHelp = observer(({ dt, home }: { dt: any; home: any }) => {
  const { width } = useWindowDimensions();
  const { scrollY } = useWindowScroll();
  useEffect(() => {
    const smooth = document.querySelector(".smooth");

    if (!smooth) return;
    const about = smooth!.querySelector(".therapy-help");
    const btn = smooth!.querySelector(".therapy-help .button");
    const title = smooth!.querySelector(".therapy-help__title");
    const text = smooth!.querySelector(
      ".therapy-help__col .therapy-help__text"
    );
    const items = smooth!.querySelectorAll(".therapy-help__item");

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = about!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top;

    let start = width > 768 ? 1000 : 800;
    let nextStart = width > 768 ? 800 : 600;
    if (scrollY > offset - start) {
      about?.classList.add("animated");
      title?.classList.add("animated");
      text?.classList.add("animated");
      btn?.classList.add("animated");
    }
    if (scrollY > offset - nextStart) {
      items.forEach((i, id) => {
        i?.classList.add("animated");
        (i as HTMLElement).style.transitionDelay = `${id / 8 + 0.5}s`;
      });
    }
  }, [scrollY, width]);
  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector(".therapy-help");
      const vect = document.querySelector(".therapy-help__vector");
      const smooth = document.querySelector(".smooth");
      if (!smooth) return;
      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = container!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetBottom =
          elemRect.bottom - vect!.getBoundingClientRect().height / 2;

      if (scrollY >= offset && scrollY <= offsetBottom) {
        requestAnimationFrame(() => {
          (vect as HTMLElement).style.transform = `translate3d(0, ${
            scrollY - offset
          }px, 0)`;
        });
      }
    }, 1000);
  }, [width, scrollY]);

  return (
    <section className="therapy-help">
      {width > 768 && <Vector className="therapy-help__vector" />}
      {width <= 768 && <VectorScroll className="therapy-help__vector" />}

      <div className="therapy-help__container">
        <div className="therapy-help__col">
          <div style={{ overflow: "hidden" }}>
            <div
              className="therapy-help__title"
              dangerouslySetInnerHTML={{ __html: dt.title }}
            ></div>
          </div>
          <div className="therapy-help__subcol">
            <div style={{ overflow: "hidden" }}>
              <div
                className="therapy-help__text"
                dangerouslySetInnerHTML={{ __html: dt.text }}
              ></div>
            </div>
            {width > 1120 && (
              <a
                rel="noreferrer"
                className="button blue p18p40 "
                href={home.intro.buttonLink}
                target={"_blank"}
              >
                <div className="button__text">{dt.buttonTitle}</div>
              </a>
            )}
          </div>
        </div>
        <div className="therapy-help__list">
          {dt.items.map((i: any, id: number) => (
            <div className="therapy-help__item" key={id}>
              <div className="therapy-help__item-title">{i.title}</div>
              <img
                className="therapy-help__item-img"
                src={i.icon.replaceAll("admin.", "")}
                alt={i.alt}
              />
              <div
                className="therapy-help__text"
                dangerouslySetInnerHTML={{ __html: i.text }}
              ></div>
            </div>
          ))}
        </div>
        {width <= 1120 && (
          <a
            rel="noreferrer"
            className="button blue p18p40 "
            href={home.intro.buttonLink}
            target={"_blank"}
          >
            <div className="button__text">{dt.buttonTitle}</div>
          </a>
        )}
      </div>
    </section>
  );
});

export default TherapyHelp;
