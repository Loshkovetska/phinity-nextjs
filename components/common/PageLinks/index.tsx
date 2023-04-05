import { Fragment } from 'react'

const PageLinks = ({ links }: { links: any[] }) => {
  return (
    <section className="links   delay-0.5">
      {links?.map((l, id) => (
        <Fragment key={id}>
          {id != links?.length - 1 ? (
            <a href={l.link} className="links__item">
              {l.title.replaceAll('<br/>', '')}
            </a>
          ) : (
            <span className="links__item">
              {l.title.replaceAll('<br/>', '')}
            </span>
          )}
          {id != links?.length - 1 && (
            <span className="links__separator">
              {!l.title?.length ? '' : '/'}
            </span>
          )}
        </Fragment>
      ))}
    </section>
  )
}

export default PageLinks
