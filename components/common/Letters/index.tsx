import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

const Letters = observer(
  ({
    data,
    change,
    active,
  }: {
    data: any
    change: (value: string) => void
    active: string
  }) => {
    const [isTouch, setTouch] = useState(false)

    useEffect(() => {
      const isTouchC = /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
      setTouch(isTouchC)
    }, [])

    const [letter, setLetter] = useState(active)
    const [letters, setLetters] = useState(Array())
    useEffect(() => {
      change(letter)
    }, [letter])

    useEffect(() => {
      setLetter(active)
    }, [active])

    useEffect(() => {
      const lets = document.querySelectorAll('.our-services__letter')
      lets?.forEach((l) => l.classList.remove('active'))
      letters?.forEach((l, i) => {
        if (l == letter) {
          lets?.forEach((l: any) => {
            if (l.dataset.letter == letter) {
              l.classList.add('active')
            } else l.classList.remove('active')
          })
        }
      })
    }, [letter, letters])

    useEffect(() => {
      if (!data) return
      let lts: any = []

      data.forEach((element: any) => {
        lts.push(element.title[0])
      })
      lts = lts.sort((a: any, b: any) => a.localeCompare(b))

      setLetters(Array.from(new Set(lts)))

      setTimeout(() => {
        if (window.innerWidth <= 768) {
          const smooth = document.querySelector('.smooth')
          if (!smooth) return
          const letters = smooth!.querySelectorAll('.our-services__letter')
          if (!letters) return
          letters.forEach((i, id) => {
            if (!id) letters[id].classList.add('active')
            ;(i as any).classList.add('animated')
            ;(i as HTMLElement).style.transitionDelay = `${id / 8}s`
          })
        }
      }, 300)
    }, [data])


    return (
      <div className="our-services__letters">
        {letters?.map((l, i) => (
          <div
            className={classNames(
              'our-services__letter',
              l == 'A' && 'a',
              l == 'H' && 'h',
            )}
            data-letter={l}
            key={i}
            onClick={() => {
              if (!isTouch) setLetter(l)
            }}
            onTouchStart={() => {
              if (isTouch) setLetter(l)
            }}
          >
            {l}
          </div>
        ))}
      </div>
    )
  },
)

export default Letters
