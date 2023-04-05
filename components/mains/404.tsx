import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useContentState } from '../../hooks/RootStoreProvider'
import Layout from '../common/Layout'
import NotFoundContent from '../pages/notfound/NotFoundContent'

const NoFound = observer(({ dt }: { dt: any }) => {
  const { nofound } = useContentState()


  return (
    <Layout withFooter={false} isTranslate={false} withVideo={false} isFixed>
      <NotFoundContent nofound={nofound} />
    </Layout>
  )
})

export default NoFound
