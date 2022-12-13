import { observer } from 'mobx-react'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import DBStore from '../../../../stores/DBStore'
import GlobalState from '../../../../stores/GlobalState'
import classNames from 'classnames'
import ContentStore from '../../../../stores/ContentStore'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
import { useWindowScroll } from '../../../../hooks/getWindowScroll'

const AboutSphere = observer(() => {
  const content = useContentState()
  const [isAnim, setAnim] = useState(false)
  const ref = useRef<any>(null)
  const data: any = {
    initial: [
      [
        'div.w16.blue',
        {
          transform: {
            x: 179,
            y: 296,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w27.blue',
        {
          transform: {
            x: 580,
            y: 460,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w34.sand ',
        {
          transform: {
            x: 441,
            y: 352,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w34.dolphin ',
        {
          transform: {
            x: 282,
            y: 178,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        '  div.w57.sky  ',
        {
          transform: {
            x: 326,
            y: 582,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        ' div.w59.sand',
        {
          transform: {
            x: 240,
            y: 452,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        ' div.w86.blue',
        {
          transform: {
            x: 369,
            y: -20,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        'div.w105.dolphin',
        {
          transform: {
            x: 412,
            y: 442,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w191.blue',
        {
          transform: {
            x: -2,
            y: 321,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        'div.w191.sky ',
        {
          transform: {
            x: 465,
            y: 137,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w253',
        {
          transform: {
            x: 0,
            y: 0,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
    ],
    middle: [
      [
        'div.w16.blue',
        {
          transform: {
            x: 320,
            y: 328,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w27.blue',
        {
          transform: {
            x: 315,
            y: 322,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w34.sand ',
        {
          transform: {
            x: 311,
            y: 321,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w34.dolphin ',
        {
          transform: {
            x: 311,
            y: 320,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        '  div.w57.sky  ',
        {
          transform: {
            x: 298,
            y: 302,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        ' div.w59.sand',
        {
          transform: {
            x: 295,
            y: 302,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        ' div.w86.blue',
        {
          transform: {
            x: 282,
            y: 288,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        'div.w105.dolphin',
        {
          transform: {
            x: 275,
            y: 286,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w191.blue',
        {
          transform: {
            x: 240,
            y: 247,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w191.sky',
        {
          transform: {
            x: 240,
            y: 247,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w253',
        {
          transform: {
            x: 216,
            y: 214,
          },
          scale: {
            start: 1,
            end: 1,
          },
        },
      ],
    ],
    final: [
      [
        'div.w16.blue',
        {
          transform: {
            x: 165,
            y: 165,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w27.blue',
        {
          transform: {
            x: 170,
            y: 170,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w34.sand ',
        {
          transform: {
            x: 180,
            y: 180,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w34.dolphin',
        {
          transform: {
            x: 190,
            y: 190,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w57.sky',
        {
          transform: {
            x: 200,
            y: 200,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        ' div.w59.sand',
        {
          transform: {
            x: 220,
            y: 220,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w86.blue',
        {
          transform: {
            x: 235,
            y: 235,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        'div.w105.dolphin',
        {
          transform: {
            x: 260,
            y: 260,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w191.sky',
        {
          transform: {
            x: 280,
            y: 280,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],
      [
        'div.w191.blue',
        {
          transform: {
            x: 320,
            y: 320,
          },
          scale: {
            start: 0,
            end: 1,
          },
        },
      ],

      [
        'div.w253',
        {
          transform: {
            x: 350,
            y: 350,
          },
          scale: {
            start: 1,
            end: 1,
          },
        },
      ],
    ],
  }

  const getTranslate = (elem: string) => {
    let el = document.querySelector(`.about-service__sphere ${elem}`)
    if (!el) return { x: 0, y: 0 }

    let string = window.getComputedStyle(el as any).transform
    const regex = /scale\([0-1]\)/gi
    let arr = string
      .replaceAll(regex, '')
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('matrix', '')
      .replaceAll('px', '')
      .split(',')

    return { x: +arr[4], y: +arr[5] }
  }

  const [heightBlock, setHeightBlock] = useState(0)
  const { width, height } = useWindowDimensions()
  const { scrollY } = useWindowScroll()

  useEffect(() => {
    if (!content.serviceC.about.list) return
    const smooth = document.querySelector('.smooth')
    const row = smooth!.querySelector('.about-service__block-row')
    const items = smooth!.querySelectorAll(
      '.about-service__sphere .center, .about-service__sphere .sphere',
    )
    const list = smooth!.querySelector('.about-service__scroll')
    const title = document.querySelector(
      '.about-service__block .about-service__title',
    )
    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = row!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top

    if (scrollY > offset - (width > 768 ? 1000 : 800)) {
      row?.classList.add('animated')
      title?.classList.add('animated')
    }
    if (scrollY > offset - 1000) {
      items.forEach((i, id) => {
        setTimeout(() => {
          i.classList.add('animated')
        }, (id / 8) * 1000)
      })
      if (width > 1120) {
        list?.classList.add('animated')
        ;(list as any).style.transitionDelay = `0s`
      } else {
        list?.classList.add('animated')

        const items = smooth!.querySelectorAll('.about-service__block-col')
        items.forEach((i) => {
          elemRect = i!.getBoundingClientRect()
          offset = elemRect.top - bodyRect.top
          if (scrollY > offset - 1000) {
            i.classList.add('animated')
          }
        })
      }
    }
  }, [content.serviceC.about.list, heightBlock, scrollY, width])

  useLayoutEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries: any) => {
      entries.forEach((el: any) => {
        setHeightBlock(el.contentBoxSize[0].blockSize)
      })
    })
    observer.observe(ref.current)
  }, [])

  useEffect(() => {
    if (!content.serviceC.about.list) return
    const smooth = document.querySelector('.smooth')
    const sphere = document.querySelector('.about-service__sphere')
    const scroll = document.querySelector('.about-service__scroll-area')
    const row = document.querySelector('.about-service__block-row'),
      block = document.querySelector('.about-service__block'),
      next = block?.nextElementSibling

    var bodyRect = smooth!.getBoundingClientRect(),
      elemRect = row!.getBoundingClientRect(),
      nextRect = next!.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top,
      offsetBottom = nextRect.top

    const cols = document.querySelectorAll('.about-service__block-col')

    if (!cols.length) return

    let pos = window.scrollY
    if (window.innerWidth > 1120) {
      window.addEventListener('scroll', () => {
        let direction = window.scrollY > pos ? 'down' : 'up'

        pos = window.scrollY

        if (window.scrollY < offset) {
          data.initial.map((m: any, i: number) => {
            requestAnimationFrame(() => {
              ;(document.querySelector(
                `.about-service__sphere ${m[0]}`,
              ) as HTMLElement).style.transform = `translate(${m[1].transform.x}px, ${m[1].transform.y}px)`
            })
          })
        }
        if (
          window.scrollY > offset - 20 &&
          window.scrollY <
            offset +
              (cols[0].getBoundingClientRect().height +
                cols[1].getBoundingClientRect().height +
                cols[2].getBoundingClientRect().height / 3)
        ) {
          if (window.scrollY >= offset && window.scrollY < offset + 200) {
            data.initial.forEach((m: any, i: number) => {
              requestAnimationFrame(() => {
                ;(document.querySelector(
                  `.about-service__sphere ${m[0]}`,
                ) as HTMLElement).style.transform = `translate(${m[1].transform.x}px, ${m[1].transform.y}px)`
              })
            })
            const lines = document.querySelectorAll(
              '.about-service__sphere .line',
            )
            lines.forEach((l: any) => l.classList.remove('hidden'))
          }

          if (
            window.scrollY >= offset &&
            window.scrollY < offset + cols[0].getBoundingClientRect().height
          ) {
            let flag = false
            data.middle.forEach((m: any, i: number) => {
              const { x, y } = getTranslate(data.initial[i][0])

              const { x: x1, y: y1 } = m[1].transform
              const genLength = cols[0].getBoundingClientRect().height

              let isXBig = x1 > data.initial[i][1].transform.x
              let isYBig = y1 > data.initial[i][1].transform.y

              let length = {
                x:
                  (isXBig
                    ? x1 - data.initial[i][1].transform.x
                    : data.initial[i][1].transform.x - x1) / genLength,
                y:
                  (isYBig
                    ? y1 - data.initial[i][1].transform.y
                    : data.initial[i][1].transform.y - y1) / genLength,
              }

              if (direction == 'down') {
                let lgX =
                  isXBig || m[1].transform.x < 0
                    ? length.x * 100
                    : length.x * -100
                let lgY =
                  isYBig || m[1].transform.y < 0
                    ? length.y * 100
                    : length.y * -100

                if (isXBig && isYBig) {
                  if (
                    x + lgX <= m[1].transform.x &&
                    y + lgY <= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                if (!isXBig && !isYBig) {
                  if (
                    x + lgX >= m[1].transform.x &&
                    y + lgY >= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                if (isXBig && !isYBig) {
                  if (
                    x + lgX <= m[1].transform.x &&
                    y + lgY >= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                if (!isXBig && isYBig) {
                  if (
                    x + lgX >= m[1].transform.x &&
                    y + lgY <= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                const { x: elX, y: elY } = getTranslate(data.middle[i][0])
                const { x: elX1, y: elY1 } = m[1].transform

                if (
                  +elX.toFixed(0) >= +elX1.toFixed(0) - 2 &&
                  +elX.toFixed(0) <= +elX1.toFixed(0) + 2 &&
                  +elY.toFixed(0) >= +elY1.toFixed(0) - 2 &&
                  +elY.toFixed(0) <= +elY1.toFixed(0) + 2
                ) {
                  flag = true
                } else flag = false
              }
              if (
                direction == 'up' &&
                window.scrollY <
                  offset + cols[0].getBoundingClientRect().height / 3
              ) {
                const lines = document.querySelectorAll(
                  '.about-service__sphere .line',
                )
                lines.forEach((l: any) => l.classList.remove('hidden'))
                let lgX = isXBig ? length.x * 100 : length.x * -100
                let lgY = isYBig ? length.y * 100 : length.y * -100

                if (isXBig && isYBig) {
                  if (
                    x - lgX >= data.initial[i][1].transform.x &&
                    y - lgY >= data.initial[i][1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x - lgX
                      }px, ${y - lgY}px)`
                    })
                  }
                }

                if (!isXBig && !isYBig) {
                  if (
                    x - lgX <= data.initial[i][1].transform.x &&
                    y - lgY <= data.initial[i][1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x - lgX
                      }px, ${y - lgY}px)`
                    })
                  }

                  if (
                    x - lgX <= data.initial[i][1].transform.x &&
                    y + lgY >= data.initial[i][1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x - lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }
                if (isXBig && !isYBig) {
                  if (
                    x - lgX >= data.initial[i][1].transform.x &&
                    y - lgY <= data.initial[i][1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x - lgX
                      }px, ${y - lgY}px)`
                    })
                  }
                }

                if (!isXBig && isYBig) {
                  if (
                    x - lgX <= data.initial[i][1].transform.x &&
                    y - lgY >= data.initial[i][1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x - lgX
                      }px, ${y - lgY}px)`
                    })
                  }
                }
              }
            })

            if (direction == 'down' && flag) {
              const lines = document.querySelectorAll(
                '.about-service__sphere .line',
              )
              lines.forEach((l: any) => l.classList.add('hidden'))
            }
          }
          const lines = document.querySelectorAll(
            '.about-service__sphere .line',
          )

          if (
            window.scrollY >= offset + cols[0].getBoundingClientRect().height &&
            window.scrollY <
              offset + cols[0].getBoundingClientRect().height + 200
          ) {
            data.middle.forEach((m: any, i: number) => {
              requestAnimationFrame(() => {
                ;(document.querySelector(
                  `.about-service__sphere ${m[0]}`,
                ) as HTMLElement).style.transform = `translate(${m[1].transform.x}px, ${m[1].transform.y}px)`
              })
            })
            lines.forEach((l: any) => l.classList.add('hidden'))
          }

          if (
            window.scrollY >
              offset +
                cols[0].getBoundingClientRect().height +
                cols[1].getBoundingClientRect().height / 2 +
                200 &&
            window.scrollY <=
              offset +
                cols[1].getBoundingClientRect().height +
                cols[0].getBoundingClientRect().height
          ) {
            lines.forEach((l: any) => l.classList.add('hidden'))

            data.final.forEach((m: any, i: number) => {
              const { x, y } = getTranslate(data.middle[i][0])

              const { x: x1, y: y1 } = m[1].transform
              const genLength = cols[1].getBoundingClientRect().height

              let isXBig = x1 > data.middle[i][1].transform.x
              let isYBig = y1 > data.middle[i][1].transform.y

              let length = {
                x:
                  (isXBig
                    ? x1 - data.middle[i][1].transform.x
                    : data.middle[i][1].transform.x - x1) / genLength,
                y:
                  (isYBig
                    ? y1 - data.middle[i][1].transform.y
                    : data.middle[i][1].transform.y - y1) / genLength,
              }

              if (direction == 'down') {
                let lgX = isXBig ? length.x * 100 : length.x * -100
                let lgY = isYBig ? length.y * 100 : length.y * -100

                if (isXBig && isYBig) {
                  if (
                    x + lgX <= m[1].transform.x &&
                    y + lgY <= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                if (!isXBig && !isYBig) {
                  if (
                    x + lgX >= m[1].transform.x &&
                    y + lgY >= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                if (isXBig && !isYBig) {
                  if (
                    x + lgX <= m[1].transform.x &&
                    y + lgY >= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })
                  }
                }

                if (!isXBig && isYBig) {
                  if (
                    x + lgX >= m[1].transform.x &&
                    y + lgY <= m[1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x + lgX
                      }px, ${y + lgY}px)`
                    })

                    return
                  }
                }
              }
              if (direction == 'up') {
                let lgX = isXBig ? length.x * 100 : length.x * -100
                let lgY = isYBig ? length.y * 100 : length.y * -100

                if (isXBig && isYBig) {
                  if (
                    x - lgX >= data.middle[i][1].transform.x &&
                    y - lgY >= data.middle[i][1].transform.y
                  ) {
                    requestAnimationFrame(() => {
                      ;(document.querySelector(
                        `.about-service__sphere ${m[0]}`,
                      ) as HTMLElement).style.transform = `translate(${
                        x - lgX
                      }px, ${y - lgY}px)`
                    })
                  }
                }
              }
            })
          }

          if (
            window.scrollY >
              offset +
                cols[0].getBoundingClientRect().height +
                cols[1].getBoundingClientRect().height &&
            window.scrollY <=
              offsetBottom - cols[2].getBoundingClientRect().height
          ) {
            data.final.forEach((m: any, i: number) => {
              requestAnimationFrame(() => {
                ;(document.querySelector(
                  `.about-service__sphere ${m[0]}`,
                ) as HTMLElement).style.transform = `translate(${m[1].transform.x}px, ${m[1].transform.y}px)`
              })
            })
          }
        }
      })
    }
  }, [content.serviceC.about.list, heightBlock])

  return (
    <div className="about-service__block">
      <div className="about-service__block-row">
        <>
          <div className="about-service__sphere initial">
            <div className="w32 sky center"></div>
            <div className="w16 blue sphere"></div>
            <div className="line"></div>
            <div className="w27 blue sphere"></div>
            <div className="line"></div>
            <div className="w34 sand sphere"></div>
            <div className="line"></div>
            <div className="w34 dolphin sphere"></div>
            <div className="line"></div>
            <div className="w57 sky sphere"></div>
            <div className="line"></div>
            <div className="w59 sand sphere"></div>
            <div className="line"></div>
            <div className="w86 blue sphere"></div>
            <div className="line"></div>
            <div className="w105 dolphin sphere"></div>
            <div className="line"></div>
            <div className="w191 sky sphere"></div>
            <div className="line"></div>
            <div className="w191 blue sphere"></div>
            <div className="line"></div>

            <div className="w253 sky sphere"></div>
            <div className="line"></div>
          </div>

          <div className="about-service__scroll" ref={ref}>
            <div className="about-service__scroll-area">
              {content.serviceC?.about.list?.map((l: any, id: number) => (
                <div
                  className={classNames('about-service__block-col')}
                  key={id}
                >
                  <div className="about-service__block-title">{l.title}</div>
                  <div className="about-service__list">
                    {l.list.map((s: any, i: number) => (
                      <div className="about-service__item" key={i}>
                        <div
                          className="about-service__item-text"
                          dangerouslySetInnerHTML={{ __html: s }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      </div>
    </div>
  )
})

export default AboutSphere
