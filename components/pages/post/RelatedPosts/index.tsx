import { observer } from 'mobx-react'
import DBStore from '../../../../stores/DBStore'
import Vector from '../../../../assets/Vector 1.svg'
import CustomSlider from '../../../common/CustomSlider'
import Arrow from '../../../../assets/caret-right.svg'
import { useEffect } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import BlogItem from '../../../common/BlogItem'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useContentState } from '../../../../hooks/RootStoreProvider'

const RelatedPosts = observer(({ title }: { title: string }) => {
  const { width } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const content = useContentState()

  useEffect(() => {
    const container = document.querySelector('.related-posts')
    const vect = document.querySelector('.related-posts__vector')
    const smooth = document.querySelector('.smooth')
    if (!smooth) return
    if (!vect) return

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = vect!.getBoundingClientRect(),
      contRect = container!.getBoundingClientRect(),
      offset = contRect.top - bodyRect.top,
      offsetBottom = contRect.bottom - contRect.height / 2
    document
      .querySelector('.related-posts .slider__bottom')
      ?.classList.add('animated')

    if (scrollY >= offset && scrollY <= offsetBottom) {
      requestAnimationFrame(() => {
        ;(vect as HTMLElement).style.transform = `translate3d(0, ${
          scrollY - offset
        }px, 0)`
      })
    }
  }, [scrollY])

  const posts = content.posts
    ?.filter((p: any) => p.cat == content.post?.cat && p.id != content.post.id)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, 10)

  if (!posts?.length) return <></>

  const linksL = GlobalState.links
  let blog = ''
  if (linksL) {
    blog = linksL.find((l: any) => l.id == 272).link
  }
  return (
    <section className="related-posts">
      <Vector className="related-posts__vector" />
      <div className="related-posts__container">
        <div className="related-posts__top">
          <div style={{ overflow: 'hidden' }}>
            <div className="related-posts__title">{title}</div>
          </div>
          <a className="p18p40 black-border button" href={blog}>
            <div className="button__text">
              See all <Arrow />
            </div>
          </a>
        </div>
        <CheckerItemsInsideCont
          container=".related-posts"
          child=".related-posts .blogs__item"
          countOfChidlren={posts?.length}
          slider={
            <div className="related-posts__list">
              <CustomSlider
                autoPlay
                countItems={posts?.length}
                slidesToShow={width > 768 ? 2 : 1}
                slidesToScroll={1}
              >
                {posts?.map((b: any, i: number) => (
                  <BlogItem b={b} key={i} arr={posts} />
                ))}
              </CustomSlider>
            </div>
          }
          list={
            <div className="related-posts__list related-posts__list-center">
              {posts?.map((b: any, i: number) => (
                <BlogItem b={b} key={i} arr={posts} />
              ))}
            </div>
          }
        />
        {width <= 768 && (
          <a className="p18p40 black-border button" href={blog}>
            <div className="button__text">
              <>
                See all <Arrow />
              </>
            </div>
          </a>
        )}
      </div>
    </section>
  )
})

export default RelatedPosts
