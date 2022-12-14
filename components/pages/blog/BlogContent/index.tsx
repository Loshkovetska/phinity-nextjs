import { observer } from 'mobx-react'
import { outputDate } from '../../../../methods/output'
import DBStore from '../../../../stores/DBStore'
import PageLinks from '../../../common/PageLinks'
import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../../common/Button'
import { Post } from '../../../../api/mocks/posts'
import Pagination from '../../../common/Pagination'
import GlobalState from '../../../../stores/GlobalState'
import Setting from '../../../../assets/mob-sett.svg'
import classNames from 'classnames'
import Close from '../../../../assets/close.svg'
import Vector from '../../../../assets/home-area.svg'
import { VideoComponent } from '../Videos'
import ContentStore from '../../../../stores/ContentStore'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import BlogItem from '../../../common/BlogItem'

const BlogContent = observer(() => {
  const content = useContentState()
  const { scrollY } = useWindowScroll()
  const ref = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItems, setCurrentItems] = useState<Array<Post> | null>([])
  const [cat, setCat] = useState('')
  const [show, setShow] = useState(false)
  const [showFilter, setFilter] = useState(false)

  const getCount = (cat: string) => {
    return content?.posts?.filter(
      (p: Post) => p.cat.toLocaleLowerCase() === cat.toLocaleLowerCase(),
    ).length
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 5
    const lastPageIndex = firstPageIndex + 5
    return currentItems?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, currentItems])

  useEffect(() => {
    if (!content.posts) return
    if (!cat.length) {
      setCurrentItems(content.posts)
    }

    if (cat.length) {
      setCurrentItems([
        ...content.posts?.filter(
          (p: Post) => p.cat.toLocaleLowerCase() === cat.toLocaleLowerCase(),
        ),
      ])
    }

    setTimeout(() => {
      document
        .querySelectorAll('.blog-content .blogs__item')
        .forEach((b) => b.classList.add('animated'))
    }, 300)
  }, [cat, content.posts, currentPage])

  useEffect(() => {
    if (showFilter) {
      document.querySelector('body')?.classList.add('filter')
      window.scrollTo(0, 0)
    } else {
      document.querySelector('body')?.classList.remove('filter')
    }
  }, [showFilter])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const issues = smooth!.querySelector('.blog-content')
    const title = smooth!.querySelector('.blog-content__title')

    if (!smooth || !issues) return

    issues?.classList.add('animated')
    title?.classList.add('animated')
    const items = smooth!.querySelectorAll('.blog-content__aside *')
    const list = smooth!.querySelectorAll('.blog-content .blogs__item')

    list.forEach((i, id) => {
      setTimeout(() => {
        i?.classList.add('animated')
      }, id / 6 + 1000)
    })
    setTimeout(() => {
      items.forEach((i, id) => {
        setTimeout(() => {
          i?.classList.add('animated')
        }, 200)
      })
    }, 500)

    issues?.classList.add('animated')
    title?.classList.add('animated')
    list.forEach((i, id) => {
      setTimeout(() => {
        i?.classList.add('animated')
      }, id / 6 + 1000)
    })
    setTimeout(() => {
      items.forEach((i, id) => {
        setTimeout(() => {
          i?.classList.add('animated')
        }, 700)
      })
    }, 1000)
  }, [content.posts])

  useEffect(() => {
    const container = document.querySelector('.blog-content')
    const vect = document.querySelector('.blog-content__vector')
    const smooth = document.querySelector('.smooth')

    if (!smooth || !vect || !container) return

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.bottom - contRect.height / 2

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0)`
      })
    }
  }, [content.posts, scrollY])

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('blog')) {
        const param = localStorage.getItem('blog')
        setCat(param!)
      }
    }, 1000)
  }, [])

  const getCountByCat = (cat: string) => {
    return DBStore.posts?.filter((d) => d.cat == cat)?.length || 0
  }

  const reset = () => {
    localStorage.removeItem('blog')
    setCat('')
    setCurrentPage(1)
  }

  const { width } = useWindowDimensions()

  let main = '',
    vacanc = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
    vacanc = linksL.find((l: any) => l.id == 262).link
  }

  const { blog, book }: any = content
  const links = [
    {
      title: blog?.mainPageTitle || 'Home',
      link: main,
    },
    {
      title: blog?.pageTitle || 'Blog',
      link: '/blog',
    },
  ]

  const [showBook, setBook] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setBook(true)
    }, 1000)
  }, [])

  return (
    <>
      <section className="blog-content">
        {blog && <PageLinks links={links} />}
        <Vector className="blog-content__vector" />
        <div className="blog-content__container" ref={ref}>
          <div className="blog-content__top">
            <div style={{ overflow: 'hidden' }}>
              <h1
                className="blog-content__title"
                dangerouslySetInnerHTML={{ __html: blog?.title }}
              ></h1>
            </div>
            <Button
              text={
                <>
                  <Setting />
                </>
              }
              click={() =>
                setTimeout(() => {
                  setFilter(true)
                }, 500)
              }
              classname="black-border p11p24 filter"
            />
          </div>

          <div className="blog-content__row">
            <div className="blog-content__col">
              {currentTableData?.map((b, i) => (
                <BlogItem b={b} key={i} arr={content.posts} />
              ))}
            </div>
            <div
              className={classNames(
                'blog-content__aside',
                showFilter && 'show',
              )}
            >
              <Close
                onClick={() => setFilter(false)}
                className="blog-content__aside-close"
              />

              <div className="blog-content__aside-title cat">
                {blog?.categoryTitle}
                <span onClick={reset}> Clear</span>
              </div>
              <div className="blog-content__aside-list ">
                {JSON.parse(JSON.stringify(content.categories))
                  .sort((c: any, i: any) => c.localeCompare(i))
                  ?.slice(0, show ? content.categories?.length : 7)
                  .map((c: any, i: any) => (
                    <div
                      className={classNames(
                        'blog-content__aside-text category-item',
                        cat == c && 'active',
                      )}
                      key={i}
                      onClick={() => {
                        setCat(c)
                        setCurrentPage(1)
                        localStorage.clear()
                        setFilter(false)
                      }}
                    >
                      {c} {'  '}
                      <span>({getCount(c)})</span>
                    </div>
                  ))}
              </div>
              {content.categories && content.categories?.length > 7 ? (
                <div
                  className="blog-content__aside-all"
                  onClick={() => {
                    if (show) {
                      const catTop = document.querySelector(
                        '.blog-content__aside-title.cat',
                      )
                      if (!catTop) return
                      const smooth = document.querySelector('.smooth')
                      if (!smooth) return

                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }

                    setShow(!show)
                  }}
                >
                  {!show ? 'See All' : 'Hide'}
                </div>
              ) : (
                <></>
              )}

              <div className="blog-content__aside-visible">
                <div className="blog-content__aside-title">Trending Blog</div>
                <div className="blog-content__aside-list">
                  {content.popposts?.slice(0, 1).map((b: Post, i: number) => (
                    <BlogItem b={b} key={i} arr={content.posts} />
                  ))}
                </div>
              </div>
              <div className="blog-content__aside-visible">
                <div className="blog-content__aside-title">Trending Video</div>
                <div className="blog-content__aside-list">
                  {content.popvideos?.slice(0, 1).map((b: any, i: number) => (
                    <VideoComponent item={b} key={i} />
                  ))}
                </div>
              </div>

              <div className="blog-content__aside-book">
                <h3
                  dangerouslySetInnerHTML={{
                    __html: blog?.book.title,
                  }}
                ></h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: blog?.book.text,
                  }}
                ></p>
                <a
                  rel="noreferrer"
                  className="button light-blue"
                  href={book.buttonLink}
                  target="_blank"
                >
                  <div className="button__text">{book.buttonText}</div>
                </a>
              </div>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={(value) => {
              setCurrentPage(value)
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
            data={currentItems as any}
            itemsPerPage={5}
          />
          {width <= 1024 && showBook && (
            <div className="blog-content__aside-book">
              <h3
                dangerouslySetInnerHTML={{
                  __html: blog?.book.title,
                }}
              ></h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: blog?.book.text,
                }}
              ></p>
              <a
                rel="noreferrer"
                className="button light-blue"
                href={book.buttonLink}
                target="_blank"
              >
                <div className="button__text">{book.buttonText}</div>
              </a>
            </div>
          )}
        </div>
      </section>
      <div
        className="blur__bg"
        onClick={() => {
          if (document.body.classList.contains('filter')) {
            setFilter(false)
          }
        }}
      ></div>
    </>
  )
})

export default BlogContent
