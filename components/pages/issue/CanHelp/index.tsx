import { observer } from 'mobx-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import Brain from '../../../../assets/Group.svg'
const CanHelp = observer(() => {
  const { width, height } = useWindowDimensions()
  const { scrollY } = useWindowScroll()
  const content = useContentState()
  const changeLocate = (i: number) => {
    let smooth = document.querySelector('.smooth')
    const items = document.querySelectorAll('.can-help__locator')
    const blocks = document.querySelectorAll('.can-help__block-col')
    const block = document.querySelector('.can-help__row'),
      blockRect = block?.getBoundingClientRect()

    if (items) {
      items.forEach((i) => i.classList.remove('active'))

      if (!items[i]) return
      items[i].classList.add('active')
    }
  }

  const getLength = (parts: Array<number>, index: number) => {
    if (!index) {
      return parts[index]
    }
    let gen = 0
    for (let i = 0; i <= index; i++) {
      gen += parts[i]
    }
    return gen
  }

  const getPrevLength = (parts: Array<number>, index: number) => {
    if (!index) {
      return parts[index]
    }

    let gen = 0

    for (let i = 0; i < index; i++) {
      gen += parts[i]
    }

    return gen
  }
  const [heightBlock, setHeightBlock] = useState(0)
  const [bottomBlock, setBottomBlock] = useState(0)

  const ref = useRef<any>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries: any) => {
      entries.forEach((el: any) => {
        setHeightBlock(el.contentBoxSize[0].blockSize)
        const tar = el.target
        setBottomBlock(tar.getBoundingClientRect().bottom)
      })
    })
    observer.observe(ref.current)
  }, [])

  useEffect(() => {
    let smooth = document.querySelector('.smooth')
    if (!smooth) return
    if (width > 1120) {
      const container = document.querySelector('.can-help')
      const block = document.querySelector('.can-help__row')
      const scroll = document.querySelector('.can-help__block'),
        wrapper = document.querySelector('.can-help__wrapper')
      const cols = document.querySelectorAll('.can-help__block-col')
      if (!cols) return

      const next = container!.nextElementSibling
      const vect = document.querySelector(`.can-help__neiro`),
        vectRect = vect!.getBoundingClientRect()

      if (!cols.length) return
      let bodyRect = smooth!.getBoundingClientRect(),
        elemRect = block!.getBoundingClientRect(),
        contRect = container?.getBoundingClientRect(),
        nextRect = next!.getBoundingClientRect(),
        scrollREct = scroll!.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        offsetEnd =
          offset +
          heightBlock -
          cols[cols.length - 1].getBoundingClientRect().height

      const startPos = scroll!.getBoundingClientRect().top
      const parts: Array<number> = []
      cols.forEach((element: Element, i: number) => {
        if (!i) parts.push(element.getBoundingClientRect().height)
        else parts.push(element.getBoundingClientRect().height + 48)
      })

      if (scrollY < offset) {
        changeLocate(0)
      }
      if (
        scrollY > offset - (height - vectRect.height) / 2 &&
        scrollY <= offsetEnd
      ) {
        parts?.forEach((p, i) => {
          if (!i) {
            if (
              scrollY >= offset - (height - vectRect.height) / 2 &&
              scrollY < offset + p / 2
            ) {
              changeLocate(i)
              return
            }
          } else {
            if (
              scrollY >= offset + getPrevLength(parts, i) - 200 &&
              scrollY <= offset + getLength(parts, i)
            ) {
              changeLocate(i)
            }
          }
        })
      }
    }
  }, [heightBlock, width, scrollY, height])

  useEffect(() => {
    const smooth = document.querySelector('.smooth')
    const row = smooth!.querySelector('.can-help__row')
    const items = smooth!.querySelectorAll('.can-help .can-help__locator')
    const list = smooth!.querySelector('.can-help__block-col.show')
    const title = document.querySelector('.can-help__title')
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = row!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top

    if (scrollY > offset - (width > 768 ? 1000 : 800)) {
      row?.classList.add('animated')
      title?.classList.add('animated')
    }
    if (scrollY > offset - 800) {
      items.forEach((i, id) => {
        i.classList.add('animated')
        ;(i as any).style.transitionDelay = `${id / 8}s`
      })
      if (width > 1024) {
        list?.classList.add('animated')
        ;(list as any).style.transitionDelay = `${items.length / 6 + 2}s`
      } else {
        const items = smooth!.querySelectorAll('.can-help__block-col')
        items.forEach((i) => {
          elemRect = i!.getBoundingClientRect()
          offset = elemRect.top - bodyRect.top
          if (scrollY > offset - 500) {
            i.classList.add('animated')
          }
        })
      }
    }
  }, [height, width, scrollY])

  const { issueC: issue } = content
  return (
    <section className="can-help">
      <div className="can-help__row" ref={ref}>
        <div className="can-help__wrapper">
          <div className="can-help__neiro">
            <Brain />
            {issue.help.list
              .map((l: any) => l.title)
              .map((t: any, i: number) => (
                <div
                  className={classNames(
                    "can-help__locator",
                    `loc${i + 1}`,
                    !i && `active`
                  )}
                  key={i}
                  onClick={() => {
                    let block = document.querySelectorAll(
                      ".can-help__block-col"
                    );
                    if (block) {
                      const smooth = document.querySelector(".smooth");
                      if (!smooth) return;
                      const rect = smooth.getBoundingClientRect().top;
                      window.scrollTo({
                        top: block[i].getBoundingClientRect().top - rect - 100,
                        behavior: "smooth",
                      });
                    }

                    if (width < 1120) {
                      changeLocate(i);
                    }
                  }}
                >
                  <div className="can-help__locator-point"></div>
                  {t}
                </div>
              ))}
          </div>
        </div>
        <div className="can-help__block">
          {issue.help.list?.map((l: any, id: number) => (
            <div
              className={classNames("can-help__block-col", !id && "show")}
              key={id}
            >
              <div className="can-help__block-title">{l.title}</div>
              <div className="can-help__list">
                {l.list.map((s: any, i: number) => (
                  <div className="can-help__item" key={i}>
                    <div
                      className="can-help__item-text"
                      dangerouslySetInnerHTML={{ __html: s }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
})
export default CanHelp
