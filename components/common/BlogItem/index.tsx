import { observer } from 'mobx-react'
import { Post } from '../../../api/mocks/posts'
import Arrow from '../../../assets/caret-right.svg'
import ImageComponent from '../ImageComponent'
import DateTime from '../DateTime'
import { useContentState } from '../../../hooks/RootStoreProvider'
import { useRouter } from 'next/router'
import { runInAction } from 'mobx'
import { BlogCategoryState } from '../../pages/blog/BlogContent'
import readingTime from 'reading-time'
import { useEffect, useState } from 'react'

const BlogItem = observer(
  ({ b, arr = [] }: { b: Post; arr: Array<Post> | null }) => {
    const { links } = useContentState()
    const [readTime, setReadTime] = useState('')

    const router = useRouter()
    const getCountByCat = (cat: string) => {
      return arr?.filter((d) => d.cat == cat)?.length || 0
    }

    useEffect(() => {
      let text = ``
      b?.content?.forEach((f: any) => {
        text += `${f.title} ${f.text}`
      })
      const time = Math.ceil(text.replace(/(<([^>]+)>)/gi, '').length / 1500)
      setReadTime(`${time} min read`)
    }, [b?.content])

    const blog = links.find((l: any) => l.id == 272)

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
          <DateTime type="short" date={b.date} />
          <span className="blogs__item-time">
            &nbsp;&bull;&nbsp; {readTime}
          </span>
        </div>
        <a href={blog?.link + '/' + b.link} className="blogs__item-top">
          <div className="blogs__item-img">
            <ImageComponent src={b.img || null} alt={b.alt || ''} />
          </div>
          <div className="blogs__item-title">{b.title}</div>
        </a>{' '}
        <a className="blogs__item-text" href={blog?.link + '/' + b.link}>
          <p dangerouslySetInnerHTML={{ __html: b.shortInfo }}></p>
        </a>
        <div className="blogs__item-bottom">
          <div className="blogs__item-subbottom">
            <div className="blogs__item-cat">
              Category:&nbsp;
              <p
                onClick={() => {
                  if (router.asPath != blog.link + '/') {
                    localStorage.setItem('blog', `${b?.cat}`)
                    router.push(blog.link)
                  } else {
                    runInAction(() => {
                      BlogCategoryState.cat = b?.cat
                    })
                  }
                }}
              >
                {b.cat}
                <span>({getCountByCat(b.cat)})</span>
              </p>
            </div>
            <span className="blogs__item-time">
              &nbsp;&bull;&nbsp; {readTime}
            </span>
          </div>
          <a className="blogs__item-more" href={blog?.link + '/' + b.link}>
            Read More <Arrow />
          </a>
        </div>
      </div>
    )
  },
)

export default BlogItem
