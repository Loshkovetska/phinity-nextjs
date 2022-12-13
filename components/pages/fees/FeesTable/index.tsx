import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import GlobalState from '../../../../stores/GlobalState'
import PageLinks from '../../../common/PageLinks'
import ReviewWidget from '../../../common/ReviewWidget'
import { useContentState } from '../../../../hooks/RootStoreProvider'
const FeesTable = observer(() => {
  const content = useContentState()

  const { fees }: any = content

  let main = ''
  const linksL = GlobalState.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
  }
  return (
    <section className="fees-table">
      <PageLinks
        links={[
          { title: fees.mainPageTitle, link: main },
          { title: fees.pageTitle, link: '/fees' },
        ]}
      />
      <div style={{ overflow: 'hidden' }}>
        <h1
          className="fees-table__title"
          dangerouslySetInnerHTML={{ __html: fees.title }}
        ></h1>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div
          className="fees-table__text"
          dangerouslySetInnerHTML={{ __html: fees.text }}
        ></div>
      </div>

      <ReviewWidget />
      <div className="fees-table__table">
        {fees.table?.map((row: any, i: number) => (
          <div className="fees-table__table-row" key={i}>
            {row?.map((r: any, id: number) => (
              <div
                className={classNames(
                  'fees-table__table-col',
                  !i && 'fees-table__table-title',
                  i && !id && 'fees-table__table-name',
                  i && id && 'fees-table__table-text ',
                )}
                key={id}
                dangerouslySetInnerHTML={{
                  __html: r,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
})

export default FeesTable
