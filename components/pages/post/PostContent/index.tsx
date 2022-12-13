import { observer } from 'mobx-react'
import { Link, useNavigate } from 'react-router-dom'
import { Post } from '../../../../api/mocks/posts'
import { outputFullDate } from '../../../../methods/output'
import DBStore, { getPost } from '../../../../stores/DBStore'
import Button from '../../../common/Button'
import PageLinks from '../../../common/PageLinks'
import ArrowSquareOut from '../../../../assets/ex/ArrowSquareOut.svg'
import Copy from '../../../../assets/socials/copy.svg'
import Setting from '../../../../assets/mob-sett.svg'
import Close from '../../../../assets/close.svg'
import Vector from '../../../../assets/home-area.svg'
import { useEffect, useState } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import classNames from 'classnames'
import { PostArrow } from '../../video/VideoIntro'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const PostContent = observer(() => {
  const [showFilter, setFilter] = useState(false)
  const { width, path } = useWindowDimensions()
  const content = useContentState()
  const { scrollY } = useWindowScroll()
  const links = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Blog',
      link: '/blog',
    },
    {
      title: content.post?.title,
      link: `/${content.post?.link}`,
    },
  ]

  const copy = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // useEffect(() => {
  //   if (showFilter) {
  //     document.querySelector('body')?.classList.add('filter')
  //     window.scrollTo(0, 0)
  //   } else {
  //     document.querySelector('body')?.classList.remove('filter')
  //   }
  // }, [showFilter])

  // useEffect(() => {
  //   const smooth = document.querySelector('.smooth')
  //   const list = smooth!.querySelectorAll('.post-content h2,.post-content p')
  //   const issues = smooth!.querySelector('.post-content')
  //   const title = smooth!.querySelector('.post-content__title')
  //   const top = smooth!.querySelector('.post-content__top-bottom')
  //   issues?.classList.add('animated')
  //   title?.classList.add('animated')

  //   setTimeout(() => {
  //     setTimeout(() => {
  //       top?.classList.add('animated')
  //     }, 200)
  //   }, 1500)

  //   const col = smooth!.querySelector('.post-content__col')
  //   const navigate = smooth!.querySelector('.post-content__navigate')
  //   const social = smooth!.querySelector('.post-content__top-social')
  //   const items = smooth!.querySelector('.post-content__aside')
  //   const row = document.querySelector('.post-content__row')
  //   const img = document.querySelectorAll('.post-content img')

  //   setTimeout(() => {
  //     setTimeout(() => {
  //       col?.classList.add('animated')
  //     }, 500)
  //     setTimeout(() => {
  //       social?.classList.add('animated')
  //     }, 800)
  //     setTimeout(() => {
  //       row?.classList.add('animated')
  //     }, 1000)

  //     setTimeout(() => {
  //       items?.classList.add('animated')
  //     }, 1500)
  //     const mainItems = document.querySelectorAll(
  //       '.post-content__main h2, .post-content__main p,.post-content__main img',
  //     )
  //     setTimeout(() => {
  //       ;(mainItems as any)?.forEach((element: any) => {
  //         ;(element as HTMLElement).classList.add('animated')
  //       })
  //     }, 1000)
  //   }, 0)
  // }, [content.post])

  useEffect(() => {
    setTimeout(() => {
      const rows = document.querySelectorAll('.post-content__main>div')
      if (!rows) return

      rows.forEach((r, i) => (r.id = `post-content-row${i}`))
    }, 100)
  }, [content.post])

  useEffect(() => {
    const container = document.querySelector('.post-content')
    const vect = document.querySelector('.post-content__vector')
    const smooth = document.querySelector('.smooth')
    if (!smooth) return
    if (!vect) return

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.bottom - contRect.height / 2

    if (scrollY >= offset && scrollY <= offsetBottom) {
      ;(vect as HTMLElement).style.transform = `translate3d(0, ${
        scrollY - offset
      }px, 0)`
    }
  }, [scrollY])

  const getIndex = () => {
    let idx = 0
    content.posts?.forEach((v: Post, i: number) => {
      if (v.id == post!.id) idx = i
    })

    return idx
  }
  const location = () => {
    return path
  }

  const dt = content.posts

  const linksL = GlobalState.links
  let videos = '',
    blog = ''
  if (linksL) {
    videos = linksL.find((l: any) => l.id == 644).link
    blog = linksL.find((l: any) => l.id == 272).link
  }

  const { postC: post, menu, book, popvideos, popposts } = content

  return (
    <>
      <section className="post-content">
        <PageLinks links={links} />
        <Vector className="post-content__vector" />
        <div className="post-content__container">
          <div className="post-content__top">
            <div className="post-content__top-block">
              <div style={{ overflow: 'hidden', paddingBottom: 3 }}>
                <h1 className="post-content__title">{post?.title}</h1>
              </div>
              <div className="post-content__top-bottom">
                <div className="post-content__author">
                  <div className="post-content__author-img">
                    <img src={post?.author.src} alt={post?.title} />
                  </div>
                  <div className="post-content__author-info">
                    <div className="post-content__author-title">
                      {post?.author.name}
                    </div>
                    <div className="post-content__author-position">
                      {post?.author.area}
                    </div>
                    <div className="post-content__top-text post-date">
                      {outputFullDate(post?.date || new Date().toDateString())}
                    </div>
                  </div>
                </div>
                <div className="post-content__top-col short-info">
                  <div className="post-content__top-text short-info__date">
                    Posted{' '}
                    {outputFullDate(post?.date || new Date().toDateString())}
                  </div>

                  <span className="post-content__top-separator short-info__date">
                    {'|'}
                  </span>

                  <div
                    className="post-content__top-text category"
                    onClick={() => {
                      localStorage.setItem('blog', `${post?.cat}`)
                      window.location.href = blog
                    }}
                  >
                    Categories: {post?.cat}
                  </div>

                  <span className="post-content__top-separator mob-info__date">
                    {'|'}
                  </span>

                  <div className="post-content__aside-follow mob-info__date">
                    {(menu as any).follow?.map((f: any, i: number) => (
                      <span
                        key={i}
                        onClick={() => {
                          window.open(f.link, '__blank')
                        }}
                      >
                        <img src={f.icon} alt={post?.title} />
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
                  setFilter(true)
                }, 450)
              }
              classname="black-border p11p24 filter"
            />

            <div className="post-content__top-social desk-view">
              <div className="blog-content__aside-title">
                {' '}
                {post.followTitle}
              </div>

              <div className="post-content__aside-follow">
                {(menu as any).follow?.map((f: any, i: number) => (
                  <a key={i} target="__blank" href={f.link}>
                    <img src={f.icon} alt={post?.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="post-content__row">
            <div className="post-content__col">
              <div className="post-content__main">
                {post?.img?.length ? (
                  <img src={post?.img || ''} alt={post?.title} />
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
                'post-content__aside',
                showFilter && 'show',
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
                        `#post-content-row${i}`,
                      )
                      if (!block) return
                      const smooth = document.querySelector('.smooth')
                      if (!smooth) return
                      window.scrollTo({
                        top:
                          block.getBoundingClientRect().top -
                          smooth.getBoundingClientRect().top -
                          50,
                        behavior: 'smooth',
                      })
                      setFilter(false)
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
                        {' '}
                        <a
                          className="blog-content__aside-text blog-content__aside-post"
                          href={`/${p.link}`}
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
                        {' '}
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
                  target={'_blank'}
                >
                  <div className="button__text">{book.buttonText}</div>
                </a>
              </div>

              <div className="blog-content__aside-share desk-view">
                <div className="blog-content__aside-title mr">
                  {post?.shareTitle || ''}{' '}
                </div>
                <div className="post-content__aside-follow">
                  {post?.shareList?.map((b: any, i: number) => (
                    <a key={i} href={b.link + location()} target="__blank">
                      <img src={b.icon} alt={post.title} />
                    </a>
                  ))}
                  <Copy onClick={copy} />
                </div>
              </div>
            </div>
          </div>
          <div className="post-content__sub-bottom">
            <div className="post-content__block">
              <div className="post-content__block-img">
                <img src={post?.author.src} alt={post?.title} />
              </div>
              <div className="post-content__block-col">
                <div className="post-content__block-subtitle">
                  About The Author
                </div>
                <div className="post-content__block-title">
                  {post?.author.name}
                  {post?.author.position && post?.author.position.length
                    ? ', '
                    : ''}{' '}
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
                      {r.title}{' '}
                      {r.link.length ? (
                        <a href={r.link} target={'_blank'} rel="noreferrer">
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
              {post?.shareTitle || ''}{' '}
            </div>
            <div className="post-content__aside-follow">
              {post?.shareList?.map((b: any, i: number) => (
                <a key={i} target={'__blank'} href={b.link + location()}>
                  <img src={b.icon} alt={post.title} />
                </a>
              ))}
              <Copy onClick={copy} />
            </div>
          </div>

          {dt?.length ? (
            <div className={classNames('post-content__bottom')}>
              {dt[getIndex() - 1] ? (
                <PostArrow
                  title={dt[getIndex() - 1]?.title}
                  isLeft
                  action={() => {
                    window.location.href = `/${dt[getIndex() - 1]!.link}`
                    getPost(dt![getIndex() - 1]!.link!)
                  }}
                />
              ) : (
                <PostArrow
                  title={dt![dt!.length - 1]?.title}
                  isLeft
                  action={() => {
                    window.location.href = `/${dt![dt!.length - 1]!.link}`
                    getPost(dt![dt!.length - 1]!.link!)
                  }}
                />
              )}
              {dt[getIndex() + 1] ? (
                <PostArrow
                  title={dt[getIndex() + 1]?.title}
                  isLeft={false}
                  action={() => {
                    window.location.href = `/${dt[getIndex() + 1]!.link}`
                    getPost(dt![getIndex() + 1]!.link!)
                  }}
                />
              ) : (
                <PostArrow
                  title={dt![0].title}
                  isLeft={false}
                  action={() => {
                    window.location.href = `/${dt![0].link}`
                    getPost(dt![0]!.link!)
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
              target={'_blank'}
              rel="noreferrer"
            >
              <div className="button__text">{book.buttonText}</div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
})

export default PostContent
