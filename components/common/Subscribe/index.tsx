import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useContentState } from "../../../hooks/RootStoreProvider";
import Button from "../Button";
import SMS from "../../../assets/contact/Component 95 (1).svg";
import { useWindowDimensions } from "../../../hooks/getWindowDimensions";
import { useWindowScroll } from "../../../hooks/getWindowScroll";
import { DOMAIN } from "../../../mocks/doman";
import Warn from "../../../assets/contact/warn.svg";
import { useRouter } from "next/router";
import classNames from "classnames";

const Subscribe = observer(() => {
  const { width, height } = useWindowDimensions();
  const { scrollY } = useWindowScroll();
  const { asPath } = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { links } = useContentState();
  const content = useContentState().subscribe;

  useEffect(() => {
    const smooth = document.querySelector(".smooth");

    if (!smooth) return;
    const issues = smooth!.querySelector(".subscribe");
    if (!issues) return;

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = issues!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top;

    if (scrollY > offset - (height > 1920 ? 1000 : 600)) {
      issues?.classList.add("animated");
    }
  }, [scrollY, height]);

  const emailValidate = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const send = () => {
    let ers = !value.length
      ? "Fill field"
      : emailValidate(value)
      ? ""
      : "Incorrect email";
    if (ers.length) {
      setError(ers);
      return;
    }
    const fd = new FormData();
    fd.append("status", "subscribe");
    fd.append("email", value);
    fetch(`${DOMAIN}react/`, {
      method: "POST",
      body: fd,
    }).then(() => {
      setError("");
      setValue("");
    });
  };
  let blog = "",
    vacancies = "";
  if (links) {
    blog = links.find((l: any) => l.id == 272)?.link;
    vacancies = links.find((l: any) => l.id == 262)?.link;
  }

  return (
    <section
      className={classNames(
        "subscribe",
        asPath.includes(blog) && asPath != blog + "/" && "post",
        !asPath.includes(blog) &&
          !(asPath.includes(vacancies) && asPath != vacancies + "/") &&
          "info-pages"
      )}
    >
      <div className="subscribe__container">
        <div
          className="subscribe__title"
          dangerouslySetInnerHTML={{ __html: content?.title }}
        ></div>
        <div
          className="subscribe__text"
          dangerouslySetInnerHTML={{ __html: content?.text }}
        ></div>
        <form className="subscribe__form" onSubmit={(e) => e.preventDefault()}>
          <div className="subscribe__input">
            <SMS />
            <input
              type="email"
              placeholder={content?.emailPlaceholder}
              className="input"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="contact-block__error">
            {error.length ? <Warn /> : ""}
            {error}
          </div>
          <Button
            classname="button light-blue"
            text={<>{content.buttonTitle}</>}
            click={send}
            type={"submit"}
          />
        </form>
        <div className="contact-block__error">
          {error.length ? <Warn /> : ""}
          {error}
        </div>
      </div>
    </section>
  );
});

export default Subscribe;
