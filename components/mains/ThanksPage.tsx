import { observer } from 'mobx-react'
import ThanksContent from '../pages/thanks/ThanksContent'
import Layout from '../common/Layout'

const ThanksPage = observer(({ dt: { thanks, menu } }: { dt: any }) => {
  return (
    <Layout withFooter={false} isTranslate={false} withVideo={false} isFixed>
      <ThanksContent />
    </Layout>
  )
})

export default ThanksPage
