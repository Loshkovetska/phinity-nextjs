import { observer } from "mobx-react";
import GlobalState, {
  changeTheraFilterState,
} from "../../../../stores/GlobalState";
import Button from "../../../common/Button";
import PageLinks from "../../../common/PageLinks";
import VideosList from "../VideosiList";
import Setting from "../../../../assets/filter.svg";
import MSetting from "../../../../assets/mob-sett.svg";
import { useWindowDimensions } from "../../../../hooks/getWindowDimensions";
import { useContentState } from "../../../../hooks/RootStoreProvider";
const NewVideos = observer(() => {
  const { width } = useWindowDimensions();

  let main = "",
    thera = "";
  const content = useContentState();

  const { videosC, videos, links: linksL, book } = content;
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link;
    thera = linksL.find((l: any) => l.id == 268)?.link;
  }

  return (
    <section className="new-videos">
      <PageLinks
        links={[
          { title: videosC?.mainPageTitle, link: main },
          { title: videosC?.pageTitle, link: "/video" },
        ]}
      />
      <div className="new-videos__top">
        <div style={{ overflow: "hidden" }}>
          <div
            className="new-videos__title"
            dangerouslySetInnerHTML={{
              __html: videosC.content.title,
            }}
          ></div>
        </div>
        <Button
          text={
            <>
              {width > 768 ? <Setting /> : <MSetting />}
              {width > 768 && "Filter"}
              {width > 768 && GlobalState.filterCount ? (
                <span>({GlobalState.filterCount})</span>
              ) : (
                <></>
              )}
            </>
          }
          click={changeTheraFilterState}
          classname="black-border p11p24 filter"
        />
      </div>
      <VideosList videos={videos} />
      <div className="blog-content__aside-book">
        <h3
          dangerouslySetInnerHTML={{
            __html: content?.videosC?.book?.title,
          }}
        ></h3>
        <p
          dangerouslySetInnerHTML={{
            __html: content?.videosC?.book?.text,
          }}
        ></p>
        <a
          className="button light-blue"
          href={book.buttonLink}
          target="_blank"
          rel="noreferrer"
        >
          <div className="button__text">{book.buttonText}</div>
        </a>
      </div>
    </section>
  );
});

export default NewVideos;
