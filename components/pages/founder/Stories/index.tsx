import { observer } from "mobx-react";
import CustomSlider from "../../../common/CustomSlider";
import { useContentState } from "../../../../hooks/RootStoreProvider";
const Stories = () => {
  const {
    founder: { stories },
  } = useContentState();
  return (
    <section className="stories">
      <div className="stories__top">
        <h2 className="stories__title">{stories?.title}</h2>
        <p
          className="stories__text"
          dangerouslySetInnerHTML={{ __html: stories?.text }}
        ></p>
      </div>
      <div className="stories__list">
        {stories?.list?.map((c: any, i: number) => (
          <div className="stories__item" key={i}>
            <div className="stories__item-img">
              <img src={c.src} alt={c.alt} />
            </div>
            <p
              className="stories__item-text"
              dangerouslySetInnerHTML={{ __html: c.text }}
            ></p>
          </div>
        ))}
      </div>
      <div className="stories__list slider-list">
        <CustomSlider
          autoPlay
          variableWidth={true}
          countItems={stories?.list?.length || 0}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {stories?.list?.map((c: any, i: number) => (
            <div className="stories__item" key={i}>
              <div className="stories__item-img">
                <img src={c.src} alt={c.alt} />
              </div>
              <p
                className="stories__item-text"
                dangerouslySetInnerHTML={{ __html: c.text }}
              ></p>
            </div>
          ))}
        </CustomSlider>
      </div>
    </section>
  );
};

export default observer(Stories);
