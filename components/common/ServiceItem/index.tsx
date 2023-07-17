import { useRouter } from "next/router";
import V1 from "../../../assets/services-vectors/Vector 10.svg";
import V2 from "../../../assets/services-vectors/Vector 11.svg";
import V3 from "../../../assets/services-vectors/Vector 12.svg";
import V4 from "../../../assets/services-vectors/Vector 13.svg";
import V5 from "../../../assets/services-vectors/Vector 14.svg";
import V6 from "../../../assets/services-vectors/Vector 15.svg";
import V7 from "../../../assets/services-vectors/Vector 16.svg";
import V9 from "../../../assets/services-vectors/Vector 18.svg";
import V10 from "../../../assets/services-vectors/Vector 19.svg";
import { useContentState } from "../../../hooks/RootStoreProvider";
import classNames from "classnames";
const Vector = ({ id }: { id: number }) => {
  const vectors = [
    <V1 key={2} />,
    <V2 key={3} />,
    <V3 key={4} />,
    <V4 key={5} />,
    <V5 key={6} />,
    <V6 key={7} />,
    <V7 key={8} />,
    <V9 key={9} />,
    <V10 key={10} />,
  ];
  return vectors[
    id >= vectors.length ? Math.floor(id / vectors.length) - 1 : id
  ];
};
const ServiceItem = ({
  isAnimated,
  i,
  s,
}: {
  s: any;
  isAnimated: boolean;
  i: number;
}) => {
  const { query } = useRouter();
  const { links } = useContentState();
  let services = "";
  if (links) {
    services = links.find((l: any) => l.id == 264)?.link;
  }

  let location = "";
  if (s.locations && s.locations?.length) {
    location = s.locations[0].link;
  }

  return (
    <a
      className={classNames("our-services__item", isAnimated && "animated")}
      key={i}
      href={`/${location}${services}/${s.link}`}
    >
      <div className="our-services__item-content">
        <div className="our-services__item-img">
          <img src={s.img} alt={s.title} />
        </div>
        <div
          className={classNames("our-services__item-title")}
          dangerouslySetInnerHTML={{ __html: s.title }}
        ></div>
      </div>
      <Vector id={i} />
    </a>
  );
};

export default ServiceItem;
