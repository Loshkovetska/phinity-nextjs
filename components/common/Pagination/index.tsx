import SliderArrow  from '../../../assets/caret-right.svg'
import More  from '../../../assets/more.svg'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import IsOutSide from '../../../hooks/IsOutSide'
import { usePagination } from '../../../hooks/usePagination'

const Pagination = observer(
  ({
    data,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  }: {
    currentPage: number
    data: Array<any>
    itemsPerPage: number
    setCurrentPage: (value: number) => void
  }) => {
    const [page, setPage] = useState(currentPage)
    const getTotal = () => Math.ceil(data.length / itemsPerPage)

    const paginationRange = usePagination({
      currentPage: page,
      totalCount: getTotal(),
      siblingCount: 2,
      pageSize: itemsPerPage,
    })

    const onNext = () => {
      if (page + 1 <= getTotal()) {
        setCurrentPage(page + 1)
      }
    }

    const onPrevious = () => {
      if (page - 1 > 0) {
        setCurrentPage(page - 1)
      }
    }

    useEffect(() => {
      setPage(currentPage)
    }, [currentPage])

    if (!paginationRange) return <></>
    let lastPage = paginationRange[paginationRange.length - 1]

    if (paginationRange.length < 2) {
      return null
    }

    return (
      <div className="pagination">
        <ul className={classNames('pagination-list')}>
          <li
            className={classNames(
              'pagination-arrow prev',
              page === 1 && 'disabled',
            )}
            onClick={onPrevious}
          >
            <SliderArrow />
          </li>
          {paginationRange.map((pageNumber, i) => {
            if (pageNumber === 'DOTS') {
              return (
                <PagiMore
                  key={i}
                  changePage={(value) => setCurrentPage(value)}
                />
              )
            }
            return (
              <li
                className={classNames(
                  'pagination-page',
                  pageNumber === page && 'active',
                )}
                key={i}
                onClick={() => {
                  setCurrentPage(+pageNumber)
                }}
              >
                {pageNumber}
              </li>
            )
          })}
          <li
            className={classNames(
              'pagination-arrow next',
              page === lastPage && 'disabled',
            )}
            onClick={onNext}
          >
            <SliderArrow />
          </li>
        </ul>
      </div>
    )
  },
)

export default Pagination
const PagiMore = ({ changePage }: { changePage: (value: number) => void }) => {
  const ref = useRef<any>(null)
  const [showPages, setShowPages] = useState(false)
  const [limit, setLimit] = useState({
    start: 0,
    end: 0,
  })

  const getLimits = () => {
    if (!ref.current) return
    const prev = (ref.current as HTMLElement).previousSibling
    const next = (ref.current as HTMLElement).nextSibling

    if (prev && next) {
      setLimit({
        ...limit,
        start: Number(prev.textContent) + 1,
        end: Number(next.textContent) - 1,
      })
      setShowPages(true)
    }
  }

  IsOutSide(ref, (value) => {
    setShowPages(false)
  })

  return (
    <li
      className={classNames('pagination-break', showPages && 'active')}
      onClick={getLimits}
      ref={ref}
    >
      <More />
      <PagiPop
        isActive={showPages}
        start={limit.start}
        end={limit.end}
        pagi={(value) => {
          setShowPages(false)
          changePage(value)
        }}
      />
    </li>
  )
}

const PagiPop = ({
  start,
  end,
  pagi,
  isActive,
}: {
  isActive: boolean
  start: number
  end: number
  pagi: (value: any) => void
}) => {
  const ref = useRef<any>()
  const getPages = (start: number, end: number) => {
    let arr: any = []
    for (let i = start; i <= end; i++) {
      arr.push(i)
    }
    return arr
  }
  return (
    <div
      className={classNames('pagination__pop', isActive && 'show')}
      ref={ref}
    >
      {getPages(start, end).map((l: number, i: number) => (
        <div
          key={i}
          className="pagination-page"
          onClick={() => {
            pagi(l)
          }}
        >
          {l}
        </div>
      ))}
    </div>
  )
}
