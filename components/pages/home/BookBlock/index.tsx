import { observer } from 'mobx-react'
import { useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import ContentStore from '../../../../stores/ContentStore'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import Vector from '../../../../assets/Vector 6.svg'
import { useContentState } from '../../../../hooks/RootStoreProvider'
const BookBlock = observer(() => {
  const { pathname } = useRouter()
  const { width, height } = useWindowDimensions()
  const { scrollY } = useWindowScroll()

  useEffect(() => {
    const smooth = document.querySelector('.smooth')

    if (!smooth) return
    const issues = smooth!.querySelector('.book-block')
    if (!issues) return

    const cont = smooth!.querySelector('.book-block__container')
    if (!cont) return

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = issues!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top

    if (scrollY > offset - (height > 1920 ? 1000 : 600)) {
      cont?.classList.add('animated')
    }
  }, [scrollY, height])

  const { book }: any = useContentState();
  return (
    <section
      className={classNames('book-block', pathname.includes('blog') && 'blog')}
    >
      <div className="book-block__container">
        <Vector />
        <div className="book-block__info">
          <div
            className="book-block__info-title"
            dangerouslySetInnerHTML={{ __html: book.title }}
          ></div>
          <div
            className="book-block__info-text"
            dangerouslySetInnerHTML={{ __html: book.text }}
          ></div>
          <a className="button white" href={book.buttonLink} target="__blank">
            <div className="button__text">{book.buttonText}</div>
          </a>
        </div>
      </div>
    </section>
  )
})

export default BookBlock
