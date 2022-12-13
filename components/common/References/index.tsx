import { observer } from 'mobx-react'
import ArrowSquareOut  from '../../../assets/ex/ArrowSquareOut.svg'

const References = observer(({ dt }: { dt: any }) => {
  if (!dt || !dt.length) return <></>
  return (
    <section className="references">
      <div className="references__title">References</div>
      <ul className="references__list">
        {dt.map((d: any, i: number) => (
          <li className="references__item" key={i}>
            {d.title}{' '}
            {d.link.length ? (
              <a href={d.link} target="__blank">
                {d.link} <ArrowSquareOut />
              </a>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
})

export default References
