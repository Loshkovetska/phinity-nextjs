import { observer } from "mobx-react";
import Clock from "../../../../assets/locations/clock.svg";
import Link from "../../../../assets/locations/link.svg";
import Phone from "../../../../assets/locations/phone.svg";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useContentState } from "../../../../hooks/RootStoreProvider";

const FindUs = () => {
  const {
    location: { find },
  } = useContentState();
  const [status, setStatus] = useState(true);
  const [timeStart, setStart] = useState("");

  useEffect(() => {
    if (find.card?.schedule) {
      const times = find.card?.schedule
        .trim()
        .replaceAll(" ", "")
        .split(";")
        .filter((c: any) => c);

      times?.forEach((item: any) => {
        const day = item
          .replace(/[^A-Za-z]/g, "")
          .replace("am", "")
          .replace("pm", "");
        const dur = item.replaceAll(day, "").split("-");

        const today = new Date();
        const toDay = new Date(today).toLocaleString("en", {
          weekday: "short",
        });
        if (toDay == day) {
          const fH = dur[0].replaceAll("am", "");
          const lH = dur[1].replaceAll("pm", "");

          const scheduleDateStart = new Date(
            new Date(new Date(new Date().setHours(+fH))).setMinutes(0, 0, 0)
          ).getTime();
          const scheduleDateEnd = new Date(
            new Date(new Date(new Date().setHours(+lH + 12))).setMinutes(
              0,
              0,
              0
            )
          ).getTime();
          const todayMls = today.getTime();
          if (todayMls < scheduleDateStart) {
            setStatus(false);
            setStart(`${fH} AM`);
          } else if (todayMls >= scheduleDateEnd) {
            setStatus(false);
            setStart(`${fH} AM`);
          } else {
            setStart(`${lH} PM`);
          }

          return;
        }
      });
    }
  }, [find.card]);

  return (
    <section className="find-us">
      <h2
        className="find-us__title"
        dangerouslySetInnerHTML={{ __html: find?.title }}
      ></h2>
      <div className="find-us__map">
        <div
          className="find-us__map-map"
          dangerouslySetInnerHTML={{ __html: find.map }}
        ></div>
        <div className="find-us__card">
          <div className="find-us__card-img">
            <img src={find.card.src} alt={find.card.alt} />
          </div>
          <div className="find-us__card-content">
            <div className="find-us__card-top">
              <div
                className="find-us__card-title"
                dangerouslySetInnerHTML={{ __html: find.card?.title }}
              ></div>
              <div
                className="find-us__card-text"
                dangerouslySetInnerHTML={{ __html: find.card?.address }}
              ></div>
            </div>
            <div className="find-us__card-row">
              <Clock />{" "}
              <span
                className={classNames(
                  "find-us__card-status",
                  status && "opened"
                )}
              >
                {status ? "Open" : "Closed"}
              </span>
              <span className="find-us__card-param">
                {" "}
                &bull; {status ? `Closes ${timeStart}` : `Opens ${timeStart}`}
              </span>
            </div>
            <div className="find-us__card-row">
              <Phone />
              <a
                className="find-us__card-param"
                href={"tel:" + find.card.phone}
              >
                {find.card.phone}
              </a>
            </div>
            <a
              href={find?.card?.map_link}
              className="button black-border p15p40"
            >
              {find.card.buttonTitle} <Link />
            </a>
          </div>
        </div>
      </div>
      <div className="find-us__list">
        {find?.list?.map(
          (
            c: {
              title: string;
              text: string;
            },
            i: number
          ) => (
            <div className="find-us__item" key={i}>
              <div className="find-us__item-top">
                <div
                  className="find-us__item-title"
                  dangerouslySetInnerHTML={{ __html: c.title }}
                ></div>
              </div>
              <div
                className="find-us__item-text"
                dangerouslySetInnerHTML={{ __html: c.text }}
              ></div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default observer(FindUs);
