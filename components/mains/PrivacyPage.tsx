import { observer } from 'mobx-react'
import PrivacyContent from '../pages/privacy/PrivacyContent'
import Layout from '../common/Layout'

const PrivacyPage = observer(({ dt }: { dt: any }) => {
  return (
    <Layout withVideo={false}>
      <PrivacyContent />
    </Layout>
  )
})

export default PrivacyPage
