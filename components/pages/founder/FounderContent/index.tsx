import { observer } from "mobx-react";
import { useContentState } from "../../../../hooks/RootStoreProvider";

const FounderContent = () => {
  const {
    founder: { about },
  } = useContentState();

  return (
    <section className="founder-content">
      <div className="founder-content__container">
        <div
          className="founder-content__col"
          dangerouslySetInnerHTML={{ __html: about.content }}
        ></div>
        <div className="founder-content__aside">
          <div className="founder-content__blocks">
            {about?.blocks?.map((c: any, i: number) => (
              <div className="founder-content__block" key={i}>
                <div className="founder-content__block-title">{c.title}</div>
                <div className="founder-content__block-text">{c.text}</div>
              </div>
            ))}
          </div>
          <div className="founder-content__video">
            <div className="founder-content__subtitle">{about.videoTitle}</div>
            <div
              className="founder-content__video-cont"
              dangerouslySetInnerHTML={{ __html: about.video }}
            ></div>
          </div>
          <div className="blog-content__aside-book">
            <h3
              dangerouslySetInnerHTML={{
                __html: about.book?.title,
              }}
            ></h3>
            <p
              dangerouslySetInnerHTML={{
                __html: about.book?.text,
              }}
            ></p>
            <a
              className="button light-blue"
              href={about.book?.buttonLink}
              target="_blank"
              rel="noreferrer"
            >
              <div className="button__text">{about?.book?.buttonText}</div>
            </a>
          </div>
          <div className="founder-content__follow">
            <div className="founder-content__subtitle">
              {about.follow?.title}
            </div>
            <div className="founder-content__follow-list">
              {about?.follow?.list?.map((b: any, i: number) => (
                <a key={i} href={b.link} target="__blank">
                  <img src={b.icon} alt={''} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="founder-content__meet">
        <h2 className="founder-content__title">{about?.meet?.title}</h2>
        <div
          className="founder-content__meet-video"
          dangerouslySetInnerHTML={{ __html: about?.meet?.video }}
        ></div>
      </div>
    </section>
  );
};

export default observer(FounderContent);
