import CheckerItemsInsideCont from "../../common/CheckerItemsInsideCont";
import CustomSlider from "../../common/CustomSlider";
import { VideoComponent } from "../../pages/blog/Videos";
import { useWindowDimensions } from "../../../hooks/getWindowDimensions";
const TherapyHelpVideos = ({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions();
  if (!dt || !dt?.list?.length) return <></>;
  return (
    <section className="therapy-videos">
      <div className="therapy-videos__top">
        <div
          className="therapy-videos__title"
          dangerouslySetInnerHTML={{
            __html: dt?.title,
          }}
        ></div>
        <div
          className="therapy-videos__text"
          dangerouslySetInnerHTML={{
            __html: dt?.text,
          }}
        ></div>
      </div>
      {dt?.list?.length > 0 && (
        <CheckerItemsInsideCont
          container=".therapy-videos"
          child={".therapy-videos__item"}
          slider={
            <div className="videos__list slider-videos">
              <CustomSlider
                autoPlay
                countItems={dt?.list?.length || dt?.list?.length}
                block="videos"
                slidesToShow={
                  width >= 1440
                    ? 3
                    : width <= 1024 && width > 768
                    ? 2
                    : width <= 768
                    ? 1
                    : 3
                }
                slidesToScroll={
                  width >= 1440
                    ? 3
                    : width <= 1024 && width > 768
                    ? 2
                    : width <= 768
                    ? 1
                    : 3
                }
              >
                {dt?.list?.slice(0, 20)?.map((v: any, ind: number) => (
                  <div className="therapy-videos__item" key={ind}>
                    <div
                      className="therapy-videos__item-cont"
                      dangerouslySetInnerHTML={{ __html: v.video }}
                    ></div>
                    <div
                      className="therapy-videos__item-title"
                      dangerouslySetInnerHTML={{ __html: v.title }}
                    ></div>
                  </div>
                ))}
              </CustomSlider>
            </div>
          }
          list={
            <div className="videos__list">
              {dt?.list?.slice(0, 20)?.map((v: any, ind: number) => (
                <div className="therapy-videos__item" key={ind}>
                  <div
                    className="therapy-videos__item-cont"
                    dangerouslySetInnerHTML={{ __html: v.video }}
                  ></div>
                  <div
                    className="therapy-videos__item-title"
                    dangerouslySetInnerHTML={{ __html: v.title }}
                  ></div>
                </div>
              ))}
            </div>
          }
          countOfChidlren={dt?.list?.length || dt?.list?.length}
        />
      )}
    </section>
  );
};

export default TherapyHelpVideos;
