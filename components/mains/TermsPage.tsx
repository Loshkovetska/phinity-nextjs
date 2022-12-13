import { observer } from 'mobx-react'

import TermsContent from '../pages/terms/TermsContent'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'

const TermsPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  return (
    <Layout withVideo={false}>
      <TermsContent dt={content.terms} />
    </Layout>
  )
})

export default TermsPage
