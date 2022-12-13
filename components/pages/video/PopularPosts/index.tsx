import { observer } from 'mobx-react'
import CustomSlider from '../../../common/CustomSlider'
import Arrow from '../../../../assets/caret-right.svg'
import CheckerItemsInsideCont from '../../../common/CheckerItemsInsideCont'
import GlobalState from '../../../../stores/GlobalState'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { Post } from '../../../../api/mocks/posts'
import BlogItem from '../../../common/BlogItem'

const PopularPosts = observer(({ content }: { content: any }) => {
  const { width } = useWindowDimensions()
  const dt = useContentState()
  const links = GlobalState.links
  let blog = ''
  if (links) {
    blog = links.find((l: any) => l.id == 272).link
  }

  if (!dt?.popposts) return <></>
  return (
    <section className="popular-videos popular-posts">
      <div className="popular-videos__top">
        <div
          className="popular-videos__title"
          dangerouslySetInnerHTML={{ __html: content.title }}
        ></div>
        <a href={blog} className="button p18p40 black-border">
          <div className="button__text">
            {' '}
            <>
              {content.buttonTitle} <Arrow />
            </>
          </div>
        </a>
      </div>
      <CheckerItemsInsideCont
        container=".popular-posts"
        child=".popular-posts .blogs__item"
        slider={
          <div className="popular-videos__list">
            <CustomSlider
              countItems={dt?.popposts}
              slidesToShow={width > 900 ? 2 : 1}
              slidesToScroll={1}
              autoPlay
            >
              {dt?.popposts?.map((b: Post, i: number) => (
                <BlogItem b={b} key={i} arr={dt?.popposts} />
              ))}
            </CustomSlider>
          </div>
        }
        countOfChidlren={dt.popposts?.length}
        list={
          <div className="popular-videos__list popular-videos__inline">
            {dt?.popposts?.map((b: Post, i: number) => (
              <BlogItem b={b} key={i} arr={dt?.popposts} />
            ))}
          </div>
        }
      />
      {width <= 1120 && (
        <a href={blog} className="button p18p40 black-border">
          <div className="button__text">
            {' '}
            <>
              {content.buttonTitle} <Arrow />
            </>
          </div>
        </a>
      )}
    </section>
  )
})

export default PopularPosts
