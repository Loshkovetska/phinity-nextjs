import SliderArrow  from '../../../assets/caret-right.svg'
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
      siblingCount: 1,
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
      <img src="data:image/svg+xml,%3Csvg width='16' height='4' viewBox='0 0 16 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.0026 3.66683C8.92308 3.66683 9.66927 2.92064 9.66927 2.00016C9.66927 1.07969 8.92308 0.333496 8.0026 0.333496C7.08213 0.333496 6.33594 1.07969 6.33594 2.00016C6.33594 2.92064 7.08213 3.66683 8.0026 3.66683Z' fill='%23222426'/%3E%3Cpath d='M13.8307 3.66683C14.7512 3.66683 15.4974 2.92064 15.4974 2.00016C15.4974 1.07969 14.7512 0.333496 13.8307 0.333496C12.9103 0.333496 12.1641 1.07969 12.1641 2.00016C12.1641 2.92064 12.9103 3.66683 13.8307 3.66683Z' fill='%23222426'/%3E%3Cpath d='M2.16667 3.66683C3.08714 3.66683 3.83333 2.92064 3.83333 2.00016C3.83333 1.07969 3.08714 0.333496 2.16667 0.333496C1.24619 0.333496 0.5 1.07969 0.5 2.00016C0.5 2.92064 1.24619 3.66683 2.16667 3.66683Z' fill='%23222426'/%3E%3C/svg%3E%0A" alt='blog' className='pagination-more'/>
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
