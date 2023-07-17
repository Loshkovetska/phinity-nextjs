import { observer } from "mobx-react";
import CheckerItemsInsideCont from "../../../common/CheckerItemsInsideCont";
import CustomSlider from "../../../common/CustomSlider";
import { useWindowDimensions } from "../../../../hooks/getWindowDimensions";
import { useContentState } from "../../../../hooks/RootStoreProvider";

const LocateAbout = () => {
  const { location } = useContentState();
  const { width } = useWindowDimensions();
  return (
    <section className="locate-about">
      <h2
        className="locate-about__title"
        dangerouslySetInnerHTML={{
          __html: location?.about?.title,
        }}
      ></h2>
      <div className="locate-about__list">
        {location?.about?.list?.map(
          (
            c: {
              title: string;
              text: string;
            },
            i: number
          ) => (
            <div className="locate-about__item" key={i}>
              <h3
                className="locate-about__item-title"
                dangerouslySetInnerHTML={{ __html: c?.title }}
              ></h3>
              <p
                className="locate-about__item-text"
                dangerouslySetInnerHTML={{ __html: c?.text }}
              ></p>
            </div>
          )
        )}
      </div>

      <CheckerItemsInsideCont
        child=".our-clinic__item"
        container=".locate-about"
        countOfChidlren={location?.about.images?.length || 0}
        slider={
          <div className="our-clinic__list">
            <CustomSlider
              slidesToShow={width > 1024 ? 2 : 1}
              slidesToScroll={1}
              variableWidth={true}
              countItems={location?.about.images?.length}
              block="clinic"
            >
              {location?.about.images?.map((l: any, id: number) => (
                <div className="our-clinic__item" key={id}>
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </CustomSlider>
          </div>
        }
        list={
          <div className="our-clinic__list our-clinic__list-center">
            {location?.about.images?.map((l: any, id: number) => (
              <div className="our-clinic__item" key={id}>
                <img src={l.src} alt={l.alt} />
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
};

export default observer(LocateAbout);
