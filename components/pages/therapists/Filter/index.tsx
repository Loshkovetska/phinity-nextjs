import classNames from 'classnames'
import { observer } from 'mobx-react'
import { Fragment, useEffect, useState } from 'react'
import GlobalState, {
  changeTheraFilterState,
} from '../../../../stores/GlobalState'
import Close from '../../../../assets/close.svg'
import Arrow from '../../../../assets/caret-right.svg'
import CheckBox from '../../../common/CheckBox'
import Button from '../../../common/Button'

const Filter = observer(
  ({ params, setFilter }: { params: any; setFilter: (value: any) => void }) => {
    const [total, setTotal] = useState(GlobalState.filterCount)
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      if (GlobalState.isTheraFilter) {
        window.addEventListener('scroll', (e: any) => {
          return false
        })
        document.querySelector('body')?.classList.add('filter')
      } else {
        document.querySelector('body')?.classList.remove('filter')
      }
    }, [GlobalState.isTheraFilter])



    const getTotal = () => {
      let count = 0

      if (!state) return 0

      Object.entries(state).forEach((p: any) => {
        if (p[1]) {
          count += p[1].length
        }
      })

      return count
    }

    useEffect(() => {
      if (!params) return
      if (state) return
      getParams()
    }, [params])

    const getParams = () => {
      const pars: any = {}
      params?.forEach((p: any, ind: number) => {
        pars[`p${ind}`] = Array()
      })
      setState(pars)
    }

    const reset = () => {
      getParams()
      setFilter(null)
    }

    const sort = () => {
      if (total > 0) {
        setFilter(state)
      } else setFilter(null)

      changeTheraFilterState()
    }

    useEffect(() => {
      if (!params) return
      setTotal(getTotal())
    }, [state])

    if (!params) return <></>

    return (
      <section
        className={classNames(
          'filter-pop',
          GlobalState.isTheraFilter && 'open',
          !GlobalState.isTheraFilter && 'hidden',
        )}
      >
        <div
          className="filter-pop__container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="filter-pop__top">
            <span className="filter-pop__top-title">Filter</span>
            {total ? (
              <span className="filter-pop__top-clear" onClick={reset}>
                Clear All
              </span>
            ) : (
              ''
            )}
            <Close
              className="filter-pop__close"
              onClick={() => {
                changeTheraFilterState()
              }}
            />
          </div>
          <div className="filter-pop__col">
            {total ? (
              <div className="filter-pop__res">
                <div className="filter-pop__res-title">Applied filters</div>
                <div className="filter-pop__res-list">
                  {state &&
                    Object.entries(state).map((s: any, i: number) => (
                      <Fragment key={i}>
                        {s[1] &&
                          s[1].map((si: any, id: number) => (
                            <div className="filter-pop__res-block" key={id}>
                              <Close
                                onClick={() => {
                                  const st = {
                                    ...state,
                                    [`p${i}`]: s[1].filter((j: any) => j != si),
                                  }
                                  setState({ ...state, ...st })
                                }}
                              />
                              {si}
                            </div>
                          ))}
                      </Fragment>
                    ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            {params?.map((p: any, id: number) => (
              <FilterRow
                key={id}
                param={p}
                state={state ? state[`p${id}`] : Array()}
                setState={(value: any) => {
                  if (state) {
                    const st = {
                      ...state,
                      [`p${id}`]: value,
                    }
                    setState({ ...state, ...st })
                  }
                }}
              />
            ))}
          </div>

          <div className="filter-pop__bottom">
            <Button
              classname="blue p18p40"
              text={<>Apply {total ? <>({total})</> : ''} </>}
              click={sort}
            />
          </div>
        </div>
      </section>
    )
  },
)

export default Filter

const FilterRow = observer(
  ({
    state,
    setState,
    param,
  }: {
    state: any
    setState: (value: any) => void
    param: any
  }) => {
    const [isOpen, setOpen] = useState(false)
    const [rowsData, setData] = useState<any>(state)

    const getList = (flag: boolean, str: string) => {
      let js: any = rowsData
      if (flag) {
        js.push(str)
      } else js = js.filter((j: any) => j != str)

      setData([...js])
    }

    useEffect(() => {
      setState(rowsData)
    }, [rowsData])

    useEffect(() => {
      setData(state)
    }, [state])
    return (
      <div
        className={classNames(
          'filter-pop__row',
          rowsData.length > 0 && 'filled',
        )}
      >
        <div
          className={classNames('filter-pop__row-top')}
          onClick={() => setOpen(!isOpen)}
        >
          <div className="filter-pop__row-title">{param?.title}</div>
          <Arrow
            className={classNames('filter-pop__row-arrow', isOpen && 'open')}
          />
        </div>
        <div
          className={classNames('filter-pop__row-col hidden', isOpen && 'show')}
        >
          {param?.list?.map((ci: any, id: number) => (
            <CheckBox
              key={id}
              text={ci}
              change={(value) => getList(value, ci)}
              ischeck={rowsData.includes(ci)}
            />
          ))}
        </div>
      </div>
    )
  },
)
