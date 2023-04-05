import Close from '../../../assets/close.svg'
import Search from '../../../assets/search.svg'
import { Fragment, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import GlobalState, { search } from '../../../stores/GlobalState'
import { changeSearchState } from '../../../stores/GlobalState'
import { runInAction } from 'mobx'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'
import { useContentState } from '../../../hooks/RootStoreProvider'
const SearchBox = observer(() => {
  const ref = useRef<any>(null)
  const [input, setState] = useState(' ')
  const [valueInput, setValue] = useState('')
  const [isFocus, setFocus] = useState(false)
  const [searchRes, setSearch] = useState<any>(GlobalState.search)

  const { width } = useWindowDimensions()

  const Text = ({ text, input }: { text: string; input: string }) => {
    const smallText = text.toLocaleLowerCase()
    let startIndex = smallText.indexOf(input.toLowerCase())
    let endIndex = input.length + startIndex
    if (startIndex != -1 && input.length) {
      const subText = text.slice(startIndex, endIndex)
      if (startIndex) {
        let txBefore = text.slice(0, startIndex)
        let txAfter = text.slice(endIndex)

        return (
          <>
            {txBefore.replaceAll('<br/>', ' ')}
            <span>{subText.replaceAll('<br/>', ' ')}</span>
            {txAfter.replaceAll('<br/>', ' ')}
          </>
        )
      } else {
        let txAfter = text.slice(endIndex)
        return (
          <>
            <span>{subText.replaceAll('<br/>', ' ')}</span>
            {txAfter.replaceAll('<br/>', ' ')}
          </>
        )
      }
    }
    return <>{text.replaceAll('<br/>', ' ')}</>
  }

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current && ref.current.focus()
      }, 100)
    }
  }, [GlobalState.isSearchOpen])

  useEffect(() => {
    setSearch(GlobalState.search)
  }, [GlobalState.search])

  useEffect(() => {
    setState('')
    setFocus(false)
  }, [GlobalState.isSearchOpen])

  const seachFunc = () => {
    const value = (document.querySelector('.searchbox__input input') as any)
      ?.value
    if (value && value.length) {
      search(value).then(() => {
        setSearch(GlobalState.search)
        setValue(value)
      })
    }
  }

  useEffect(() => {
    if (GlobalState.isSearchOpen) {
      document
        .querySelector('.searchbox')
        ?.addEventListener('keydown', (e: any) => {
          if (e.key === 'Enter') {
            seachFunc()
          }
        })
    }
  }, [GlobalState.isSearchOpen])

  useEffect(() => {
    if (GlobalState.isSearchOpen) {
      document.body.classList.add('hidden')
    } else document.body.classList.remove('hidden')
  }, [GlobalState.isSearchOpen])

  const { links } = useContentState()

  return (
    <section
      className={classNames(
        'searchbox',
        !GlobalState.isSearchOpen ? 'close' : 'show',
      )}
    >
      {width > 1024 && (
        <div className="searchbox__close-cont">
          <Close
            onClick={() => {
              runInAction(() => {
                GlobalState.search = null
              })
              setState('')
              changeSearchState()
            }}
            className="searchbox__close"
          />
        </div>
      )}
      <div className="searchbox__container">
        <div className="searchbox__input">
          <Search onClick={seachFunc} />
          <input
            ref={ref}
            autoFocus
            className="input"
            onChange={(e) => setState(e.target.value)}
            value={input}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Enter what you are searching for"
          />
          {input.length ? (
            <div
              className="searchbox__clear"
              onClick={() => {
                setState('')
                setSearch(null)
                ref.current && ref.current.focus()
              }}
            >
              Delete
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={classNames('searchbox__list-res', searchRes && 'show')}>
          {searchRes?.map((s: any, i: number) => {
            let title = '',
              link = ''
            if (s.cat == 'issues') {
              title = 'Issues'
              link = links?.find((l: any) => l.id == 266)?.link + '/'
            }
            if (s.cat == 'articles') {
              title = 'Blog'
              link = '/blog/'
            }
            if (s.cat == 'therapists') {
              title = 'Therapists'
              link = links?.find((l: any) => l.id == 268)?.link + '/'
            }
            if (s.cat == 'services') {
              title = 'Services'
              link = links?.find((l: any) => l.id == 264)?.link + '/'
            }
            if (s.cat == 'videos') {
              title = 'Videos'
              link = links?.find((l: any) => l.id == 644)?.link + '/'
            }

            if (!s.list.length) return <></>

            return (
              <div
                className={classNames('searchbox__col', i % 2 == 0 && 'mr')}
                key={i}
              >
                <div className="searchbox__col-title">{title}</div>
                {s.list.map((l: any, idx: number) => (
                  <a
                    key={idx}
                    className={classNames('searchbox__col-text')}
                    href={`${link}${l.link}`}
                  >
                    <Text text={l.title} input={valueInput} />
                  </a>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})

export default SearchBox
