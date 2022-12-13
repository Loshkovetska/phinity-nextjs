import { observer } from 'mobx-react'
import { Post } from '../../../api/mocks/posts'
import { outputDate } from '../../../methods/output'
import Arrow from '../../../assets/caret-right.svg'
import ImageComponent from '../ImageComponent'

const BlogItem = observer(
  ({ b, arr = [] }: { b: Post; arr: Array<Post> | null }) => {
    const getCountByCat = (cat: string) => {
      return arr?.filter((d) => d.cat == cat)?.length || 0
    }
    return (
      <div className="blogs__item">
        <div className="blogs__item-date">
          {b.author?.name && (
            <>
              {' '}
              <a
                rel="noreferrer"
                href={b.author.link}
                target={b.author.link?.includes('https') ? '_blank' : ''}
              >
                {b.author.name}
              </a>{' '}
              &bull;{' '}
            </>
          )}
          {outputDate(b.date)}{' '}
        </div>
        <a href={`/${b.link}`} className="blogs__item-top">
          <div className="blogs__item-img">
            <ImageComponent src={b.img || null} alt={b.title} />
          </div>
          <div className="blogs__item-title">{b.title}</div>
        </a>{' '}
        <a className="blogs__item-text" href={`/${b.link}`}>
          <p dangerouslySetInnerHTML={{ __html: b.shortInfo }}></p>
        </a>
        <div className="blogs__item-bottom">
          <div className="blogs__item-cat">
            Category:{' '}
            <p>
              {b.cat + ' '} <span>({getCountByCat(b.cat)})</span>
            </p>
          </div>
          <a className="blogs__item-more" href={`/${b.link}`}>
            Read More <Arrow />
          </a>
        </div>
      </div>
    )
  },
)

export default BlogItem
