import classNames from "classnames";
import { observer } from "mobx-react";
import { useEffect, useMemo, useState } from "react";
import Arrow from "../../../../assets/caret-right.svg";
import VScroll from "../../../../assets/Vector 5.svg";
import { useRouter } from "next/router";
import { useContentState } from "../../../../hooks/RootStoreProvider";
import ServiceItem from "../../../common/ServiceItem";

const Services = observer(({ title, dt }: { title: string; dt: any }) => {
  const { asPath: pathname } = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    window.addEventListener("scroll", (args: any) => {
      const smooth = document.querySelector(".smooth");
      const about = smooth!.querySelector(".services-block");
      const title = smooth!.querySelector(".services-block__title");
      const list = smooth!.querySelector(".services-block__list");
      const items = smooth!.querySelectorAll(
        ".services-block .our-services__item"
      );

      var bodyRect = smooth!.getBoundingClientRect(),
        elemRect = about!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;

      if (window.scrollY > offset - 800) {
        about?.classList.add("animated");
        title?.classList.add("animated");
      }

      elemRect = list!.getBoundingClientRect();
      offset = elemRect.top - bodyRect.top;

      if (window.scrollY > offset - 800) {
        if (window.innerWidth > 768) {
          items.forEach((i, id) => {
            elemRect = i!.getBoundingClientRect();
            offset = elemRect.top - bodyRect.top;
            if (window.scrollY > offset - 1000) {
              (i as any).classList.add("animated");
            }
          });
        }

        if (window.innerWidth <= 768) {
          list?.classList.add("animated");
        }
      }
    });
  }, [dt]);

  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth <= 768) {
        const smooth = document.querySelector(".smooth");
        const cont = document.querySelector(".services-block");
        const next = cont?.nextElementSibling;
        const list = document.querySelector(".services-block__list");
        const v2 = document.querySelector(".services-block__vector");
        var bodyRect = smooth!.getBoundingClientRect(),
          listRect = list!.getBoundingClientRect(),
          nextRect = next!.getBoundingClientRect(),
          contRect = cont!.getBoundingClientRect();
        var offset = listRect.top - bodyRect.top,
          offsetBottom = nextRect.top - v2!.getBoundingClientRect().height;

        window.addEventListener("scroll", () => {
          if (window.scrollY >= offset && window.scrollY <= offsetBottom) {
            (v2 as HTMLElement).style.transform = `translate3d(0, ${
              window.scrollY - offset
            }px, 0)`;
          }
        });
      }
    }, 1000);
  }, [dt]);

  useEffect(() => {
    if (!locations.length || !dt?.length) {
      let locs: any = [];
      dt?.forEach((c: any) => {
        if (c?.locations) {
          c?.locations?.forEach((ci: any) => {
            const isPresent = locs?.find((cid: any) => cid.id == ci.id);
            if (!isPresent) {
              locs.push(ci);
            }
          });
        }
      });

      if (locs?.length) {
        locs = locs.sort((a: any, b: any) => a.title.localeCompare(b.title));
        setLocations([...locs]);
        const birmingh = locs.find((c: any) => c.id == 5117);
        if (birmingh) setLocation(birmingh);
      }
    }
  }, [dt, locations, pathname]);

  const sortedList = useMemo(() => {
    if (!location) return dt;

    const svsList: any = [];

    dt?.forEach((c: any, i: number) => {
      const isPresent = c.locations?.find((ci: any) => ci.id == location?.id);

      if (isPresent) {
        svsList.push(c);
      }
    });

    return svsList?.sort((c: any, a: any) => c.title.localeCompare(a.title));
  }, [location, dt]);

  if (!dt) return <></>;

  const { links } = useContentState();
  let services = "",
    issuesPage = "";
  if (links) {
    services = links.find((l: any) => l.id == 264)?.link;
    issuesPage = links.find((l: any) => l.id == 266).link;
  }

  return (
    <section
      className={classNames(
        "services-block ",
        pathname.includes("issue") && "issue",
        pathname.includes("therapist") && "therapist"
      )}
    >
      <div className="services-block__container">
        <div className="services-block__top">
          <div style={{ overflow: "hidden" }}>
            <div className="services-block__title">{title}</div>
          </div>

          {pathname.includes(issuesPage) ? (
            <a
              href={`/${location?.link}${services}`}
              className="button p18p40 black-border"
            >
              <div className="button__text">
                See Services
                <Arrow />
              </div>
            </a>
          ) : (
            <a href={services} className="button p18p40 black-border">
              <div className="button__text">
                See All <Arrow />
              </div>
            </a>
          )}
        </div>
        {pathname.includes(issuesPage) && (
          <div className="services-block__filter">
            {locations?.map((c: any, i: number) => (
              <div
                className={classNames(
                  "services-block__filter-item",
                  c.id == location?.id && "active"
                )}
                key={i}
                onClick={() =>
                  setLocation({
                    ...location,
                    ...c,
                  })
                }
              >
                {c.title}
              </div>
            ))}
          </div>
        )}

        <div className="services-block__list">
          {pathname.includes(issuesPage) &&
            sortedList?.map((s: any, i: number) => (
              <ServiceItem i={i} s={s} isAnimated={true} key={i} />
            ))}
          {!pathname.includes(issuesPage) &&
            dt
              .sort((c: any, a: any) => c.title.localeCompare(a.title))
              ?.map((s: any, i: number) => (
                <ServiceItem i={i} s={s} isAnimated={true} key={i} />
              ))}
          <VScroll className="services-block__vector" />
        </div>
        <div className="services-block__bottom">
          {pathname.includes(issuesPage) ? (
            <a
              href={`/${location?.link}${services}`}
              className="button p18p40 black-border"
            >
              <div className="button__text">
                See {location?.title} Services
                <Arrow />
              </div>
            </a>
          ) : (
            <a href={services} className="button p18p40 black-border">
              <div className="button__text">
                See All <Arrow />
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
});

export default Services;
