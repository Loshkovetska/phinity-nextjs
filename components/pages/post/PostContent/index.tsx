import { observer } from "mobx-react";
import { Post } from "../../../../api/mocks/posts";
import DBStore, { getPost } from "../../../../stores/DBStore";
import Button from "../../../common/Button";
import PageLinks from "../../../common/PageLinks";
import ArrowSquareOut from "../../../../assets/ex/ArrowSquareOut.svg";
import Setting from "../../../../assets/mob-sett.svg";
import Close from "../../../../assets/close.svg";
import Vector from "../../../../assets/home-area.svg";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { PostArrow } from "../../video/VideoIntro";
import { useWindowDimensions } from "../../../../hooks/getWindowDimensions";
import { useContentState } from "../../../../hooks/RootStoreProvider";
import { useWindowScroll } from "../../../../hooks/getWindowScroll";
import DateTime from "../../../common/DateTime";

const PostContent = observer(() => {
  const [showFilter, setFilter] = useState(false);
  const { width, path } = useWindowDimensions();
  const content = useContentState();
  const { scrollY } = useWindowScroll();
  const [readTime, setReadTime] = useState("");

  const copy = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const rows = document.querySelectorAll(".post-content__main>div");
      if (!rows) return;

      rows.forEach((r, i) => (r.id = `post-content-row${i}`));
    }, 100);
  }, [content.post]);

  useEffect(() => {
    const container = document.querySelector(".post-content");
    const vect = document.querySelector(".post-content__vector");
    const smooth = document.querySelector(".smooth");
    if (!smooth) return;
    if (!vect) return;

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.bottom - contRect.height / 2;

    if (scrollY >= offset && scrollY <= offsetBottom) {
      (vect as HTMLElement).style.transform = `translate3d(0, ${
        scrollY - offset
      }px, 0)`;
    }
  }, [scrollY]);

  const getIndex = () => {
    let idx = 0;
    content.posts?.forEach((v: Post, i: number) => {
      if (v.id == post!.id) idx = i;
    });

    return idx;
  };
  const location = () => {
    return path;
  };

  useEffect(() => {
    if (showFilter) {
      document.querySelector(".post-content")?.classList.add("show-menu");
      document.querySelector("body")?.classList.add("filter");
    } else {
      document.querySelector(".post-content")?.classList.remove("show-menu");
      document.querySelector("body")?.classList.remove("filter");
    }
  }, [showFilter]);

  const dt = content.posts;
  const {
    postC: post,
    menu,
    book,
    popvideos,
    popposts,
    links: linksL,
  } = content;

  useEffect(() => {
    if (readTime.length) return;
    if (!post?.content) return;
    let text = ``;
    post?.content?.forEach((f: any) => {
      text += `${f.title} ${f.text}`;
    });
    const time = Math.ceil(text.replace(/(<([^>]+)>)/gi, "").length / 1500);
    setReadTime(`${time} min read`);
  }, [post?.content, readTime]);

  let videos = "",
    blog = "",
    locations = "",
    blogPage = null,
    main = null;
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2);
    videos = linksL.find((l: any) => l.id == 644)?.link;
    blog = linksL.find((l: any) => l.id == 272)?.link;
    blogPage = linksL.find((l: any) => l.id == 272);
    locations = linksL.find((l: any) => l.id == 5083).link;
  }

  const links = [
    {
      title: main?.title || "Home",
      link: "/",
    },
    {
      title: blogPage?.name,
      link: blog,
    },
    {
      title: content.post?.title,
      link: `/${content.post?.link}`,
    },
  ];
  return (
    <>
      <section className="post-content">
        <PageLinks links={links} />
        <Vector className="post-content__vector" />
        <div className="post-content__container">
          <div className="post-content__top">
            <div className="post-content__top-block">
              <div style={{ overflow: "hidden", paddingBottom: 3 }}>
                <h1 className="post-content__title">{post?.title}</h1>
              </div>
              <div className="post-content__top-bottom">
                <div className="post-content__author">
                  <div className="post-content__author-img">
                    <img
                      src={post?.author.src.replaceAll("admin.", "")}
                      alt={post?.author?.alt}
                    />
                  </div>
                  <div className="post-content__author-info">
                    <div className="post-content__author-title">
                      {post?.author.name}
                    </div>
                    <div className="post-content__author-position">
                      {post?.author.area}
                    </div>
                    <div className="post-content__top-text post-date">
                      <DateTime
                        date={post?.date || new Date().toDateString()}
                        type="long"
                      />
                    </div>
                  </div>
                </div>
                <div className="post-content__top-col short-info">
                  <div className="post-content__top-text short-info__date">
                    {/* Posted{' '} */}
                    <DateTime
                      date={post?.date || new Date().toDateString()}
                      type="long"
                    />
                  </div>

                  <span className="post-content__top-separator short-info__date">
                    {"|"}
                  </span>

                  <div
                    className="post-content__top-text category"
                    onClick={() => {
                      localStorage.setItem("blog", `${post?.cat}`);
                      window.location.href = blog;
                    }}
                  >
                    Categories: {post?.cat}
                  </div>
                  <span className="post-content__top-separator short-info__date">
                    {"|"}
                  </span>
                  <span className="post-content__top-separator mob-info__date">
                    {"|"}
                  </span>
                  <div className="post-content__top-text read-time">
                    {readTime}
                  </div>

                  <div className="post-content__aside-follow mob-info__date">
                    {(menu as any).follow?.map((f: any, i: number) => (
                      <span
                        key={i}
                        onClick={() => {
                          window.open(f.link, "__blank");
                        }}
                      >
                        <img
                          src={f.icon.replaceAll("admin.", "")}
                          alt={f?.alt}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button
              text={<Setting />}
              click={() =>
                setTimeout(() => {
                  setFilter(true);
                }, 450)
              }
              classname="black-border p11p24 filter"
            />

            <div className="post-content__top-social desk-view">
              <div className="blog-content__aside-title">
                {" "}
                {post.followTitle}
              </div>

              <div className="post-content__aside-follow">
                {(menu as any).follow?.map((f: any, i: number) => (
                  <a key={i} target="__blank" href={f.link}>
                    <img src={f.icon.replaceAll("admin.", "")} alt={f?.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="post-content__row">
            <div className="post-content__col">
              <div className="post-content__main">
                {post?.img?.length ? (
                  <img
                    src={post?.img.replaceAll("admin.", "") || ""}
                    alt={post?.alt}
                  />
                ) : (
                  <></>
                )}

                {post?.content.map((c: any, ind: number) => (
                  <div key={ind}>
                    <div>
                      <h2>{c.title}</h2>
                    </div>
                    <div>
                      <p dangerouslySetInnerHTML={{ __html: c.text }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="blur__bg" onClick={() => setFilter(false)}></div>

            <div
              className={classNames(
                "post-content__aside",
                showFilter && "show"
              )}
            >
              <Close
                onClick={() => setFilter(false)}
                className="blog-content__aside-close"
              />

              <div className="post-content__navigate desk-view">
                <div className="blog-content__aside-title">
                  Table Of Contents
                </div>
                {post?.content.map((c: any, i: number) => (
                  <div
                    className="blog-content__aside-text"
                    key={i}
                    onClick={() => {
                      const block = document.querySelector(
                        `#post-content-row${i}`
                      );
                      if (!block) return;
                      const smooth = document.querySelector(".smooth");
                      if (!smooth) return;
                      window.scrollTo({
                        top:
                          block.getBoundingClientRect().top -
                          smooth.getBoundingClientRect().top -
                          50,
                        behavior: "smooth",
                      });
                      setFilter(false);
                    }}
                  >
                    {c.title}
                  </div>
                ))}
              </div>
              {popposts.length && (
                <>
                  <div className="blog-content__aside-title">
                    {post.blogTitle}
                  </div>
                  <ul className="blog-content__aside-list posts">
                    {popposts?.slice(0, 5).map((p: any, i: number) => (
                      <li key={i}>
                        {" "}
                        <a
                          className="blog-content__aside-text blog-content__aside-post"
                          href={`${blog}/${p.link}`}
                        >
                          {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {popvideos.length && (
                <>
                  <div className="blog-content__aside-title">
                    {post.videoTitle}
                  </div>
                  <ul className="blog-content__aside-list posts">
                    {popvideos?.slice(0, 5).map((p: any, i: number) => (
                      <li key={i}>
                        {" "}
                        <a
                          className="blog-content__aside-text blog-content__aside-video"
                          href={`${videos}/${p.link}`}
                        >
                          {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className="blog-content__aside-title cat">
                {post?.locationTitle}
              </div>
              <div className="blog-content__aside-list">
                {JSON.parse(JSON.stringify(DBStore.locations))
                  ?.sort((c: any, i: any) => c.title.localeCompare(i.title))
                  .map((c: any, i: any) => (
                    <a
                      className={classNames("blog-content__aside-text")}
                      href={`${locations || ""}/${c.slug}`}
                      key={i}
                    >
                      {c.title}
                    </a>
                  ))}
              </div>

              <div className="blog-content__aside-book desk-view">
                <h3
                  dangerouslySetInnerHTML={{
                    __html: book.title,
                  }}
                ></h3>
                <p dangerouslySetInnerHTML={{ __html: book.text }}></p>
                <a
                  rel="noreferrer"
                  href={book.buttonLink}
                  className="button light-blue"
                  target={"_blank"}
                >
                  <div className="button__text">{book.buttonText}</div>
                </a>
              </div>

              <div className="blog-content__aside-share desk-view">
                <div className="blog-content__aside-title mr">
                  {post?.shareTitle || ""}{" "}
                </div>
                <div className="post-content__aside-follow">
                  {post?.shareList?.map((b: any, i: number) => (
                    <a key={i} href={b.link + location()} target="__blank">
                      <img src={b.icon.replaceAll("admin.", "")} alt={b.alt} />
                    </a>
                  ))}
                  <img
                    src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1647_68132)'%3E%3Ccircle cx='16' cy='16' r='12' fill='%230033CC' /%3E%3Cpath d='M15.5584 11.5806L17.1052 10.0338C17.4244 9.71439 17.8033 9.46095 18.2204 9.288C18.6376 9.11505 19.0847 9.02598 19.5362 9.02588C19.9878 9.02577 20.4349 9.11464 20.8521 9.28739C21.2693 9.46014 21.6484 9.7134 21.9677 10.0327C22.287 10.352 22.5403 10.7311 22.713 11.1483C22.8858 11.5655 22.9746 12.0126 22.9745 12.4642C22.9744 12.9157 22.8854 13.3628 22.7124 13.78C22.5395 14.1971 22.286 14.576 21.9666 14.8952L19.7569 17.1049C19.4377 17.4241 19.0587 17.6773 18.6417 17.8501C18.2246 18.0228 17.7776 18.1117 17.3262 18.1117C16.8748 18.1117 16.4278 18.0228 16.0107 17.8501C15.5937 17.6773 15.2147 17.4241 14.8955 17.1049' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Cpath d='M16.4415 20.4195L14.8947 21.9663C14.5756 22.2858 14.1966 22.5392 13.7795 22.7121C13.3624 22.8851 12.9152 22.9742 12.4637 22.9743C12.0121 22.9744 11.565 22.8855 11.1478 22.7128C10.7306 22.54 10.3515 22.2867 10.0322 21.9674C9.71291 21.6482 9.45966 21.2691 9.2869 20.8519C9.11415 20.4347 9.02529 19.9875 9.02539 19.536C9.0255 19.0844 9.11457 18.6373 9.28751 18.2202C9.46046 17.8031 9.7139 17.4241 10.0333 17.105L12.2431 14.8952C12.5623 14.576 12.9412 14.3228 13.3583 14.1501C13.7753 13.9773 14.2223 13.8884 14.6737 13.8884C15.1252 13.8884 15.5721 13.9773 15.9892 14.1501C16.4063 14.3228 16.7852 14.576 17.1044 14.8952' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Ccircle cx='16' cy='16' r='13' stroke='%230033CC' stroke-width='6' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1647_68132'%3E%3Crect width='32' height='32' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                    onClick={copy}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="post-content__sub-bottom">
            <div className="post-content__block">
              <div className="post-content__block-img">
                <img
                  src={post?.author.src.replaceAll("admin.", "")}
                  alt={post?.author?.alt}
                />
              </div>
              <div className="post-content__block-col">
                <div className="post-content__block-subtitle">
                  About The Author
                </div>
                <div className="post-content__block-title">
                  {post?.author.name}
                  {post?.author.position && post?.author.position.length
                    ? ", "
                    : ""}{" "}
                  {post?.author.position}
                </div>
                <div className="post-content__block-text">
                  {post?.author.about}
                </div>
              </div>
            </div>
            {post?.refs?.length ? (
              <div className="post-content__refer">
                <div className="post-content__block-title">References</div>
                <ul className="post-content__refer-list">
                  {post.refs.map((r: any, i: number) => (
                    <li className="post-content__refer-item" key={i}>
                      {r.title}{" "}
                      {r.link.length ? (
                        <a href={r.link} target={"_blank"} rel="noreferrer">
                          {r.link}
                          <ArrowSquareOut />
                        </a>
                      ) : (
                        <></>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="post-content__links mob-view ">
            <div className="blog-content__aside-title mr">
              {post?.shareTitle || ""}{" "}
            </div>
            <div className="post-content__aside-follow">
              {post?.shareList?.map((b: any, i: number) => (
                <a key={i} target={"__blank"} href={b.link + location()}>
                  <img src={b.icon.replaceAll("admin.", "")} alt={b.alt} />
                </a>
              ))}
              <img
                src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1647_68132)'%3E%3Ccircle cx='16' cy='16' r='12' fill='%230033CC' /%3E%3Cpath d='M15.5584 11.5806L17.1052 10.0338C17.4244 9.71439 17.8033 9.46095 18.2204 9.288C18.6376 9.11505 19.0847 9.02598 19.5362 9.02588C19.9878 9.02577 20.4349 9.11464 20.8521 9.28739C21.2693 9.46014 21.6484 9.7134 21.9677 10.0327C22.287 10.352 22.5403 10.7311 22.713 11.1483C22.8858 11.5655 22.9746 12.0126 22.9745 12.4642C22.9744 12.9157 22.8854 13.3628 22.7124 13.78C22.5395 14.1971 22.286 14.576 21.9666 14.8952L19.7569 17.1049C19.4377 17.4241 19.0587 17.6773 18.6417 17.8501C18.2246 18.0228 17.7776 18.1117 17.3262 18.1117C16.8748 18.1117 16.4278 18.0228 16.0107 17.8501C15.5937 17.6773 15.2147 17.4241 14.8955 17.1049' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Cpath d='M16.4415 20.4195L14.8947 21.9663C14.5756 22.2858 14.1966 22.5392 13.7795 22.7121C13.3624 22.8851 12.9152 22.9742 12.4637 22.9743C12.0121 22.9744 11.565 22.8855 11.1478 22.7128C10.7306 22.54 10.3515 22.2867 10.0322 21.9674C9.71291 21.6482 9.45966 21.2691 9.2869 20.8519C9.11415 20.4347 9.02529 19.9875 9.02539 19.536C9.0255 19.0844 9.11457 18.6373 9.28751 18.2202C9.46046 17.8031 9.7139 17.4241 10.0333 17.105L12.2431 14.8952C12.5623 14.576 12.9412 14.3228 13.3583 14.1501C13.7753 13.9773 14.2223 13.8884 14.6737 13.8884C15.1252 13.8884 15.5721 13.9773 15.9892 14.1501C16.4063 14.3228 16.7852 14.576 17.1044 14.8952' stroke='%23EFEBE4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3Ccircle cx='16' cy='16' r='13' stroke='%230033CC' stroke-width='6' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1647_68132'%3E%3Crect width='32' height='32' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                onClick={copy}
                loading="lazy"
              />
            </div>
          </div>

          {dt?.length ? (
            <div className={classNames("post-content__bottom")}>
              {dt[getIndex() - 1] ? (
                <PostArrow
                  title={dt[getIndex() - 1]?.title}
                  isLeft
                  action={() => {
                    window.location.href = `${blog}/${
                      dt[getIndex() - 1]!.link
                    }`;
                    getPost(dt![getIndex() - 1]!.link!);
                  }}
                />
              ) : (
                <PostArrow
                  title={dt![dt!.length - 1]?.title}
                  isLeft
                  action={() => {
                    window.location.href = `${blog}/${
                      dt![dt!.length - 1]!.link
                    }`;
                    getPost(dt![dt!.length - 1]!.link!);
                  }}
                />
              )}
              {dt[getIndex() + 1] ? (
                <PostArrow
                  title={dt[getIndex() + 1]?.title}
                  isLeft={false}
                  action={() => {
                    window.location.href = `${blog}/${
                      dt[getIndex() + 1]!.link
                    }`;
                    getPost(dt![getIndex() + 1]!.link!);
                  }}
                />
              ) : (
                <PostArrow
                  title={dt![0].title}
                  isLeft={false}
                  action={() => {
                    window.location.href = `${blog}/${dt![0].link}`;
                    getPost(dt![0]!.link!);
                  }}
                />
              )}
            </div>
          ) : (
            <></>
          )}

          <div className="blog-content__aside-book mob-view ">
            <h3 dangerouslySetInnerHTML={{ __html: book.title }}></h3>
            <p dangerouslySetInnerHTML={{ __html: book.text }}></p>

            <a
              href={book.buttonLink}
              className="button light-blue"
              target={"_blank"}
              rel="noreferrer"
            >
              <div className="button__text">{book.buttonText}</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
});

export default PostContent;
