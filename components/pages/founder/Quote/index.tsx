import { observer } from "mobx-react";
import { useContentState } from "../../../../hooks/RootStoreProvider";
const Quote = () => {
  const {
    founder: { quote },
  } = useContentState();
  return (
    <section className="founder-quote">
      <div className="founder-quote__sml">“</div>
      <p
        className="founder-quote__text"
        dangerouslySetInnerHTML={{ __html: quote?.text }}
      ></p>
      <div className="founder-quote__author">
        <div className="founder-quote__img">
          <img src={quote?.src} alt={quote?.alt} />
        </div>
        {quote.author}
      </div>
    </section>
  );
};

export default observer(Quote);
