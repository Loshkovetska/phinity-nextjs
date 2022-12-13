import Contact from '../pages/about/Contact'
import FaqList from '../pages/faq/FaqList'
import { observer } from 'mobx-react'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'

const FaqPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  return (
    <Layout withVideo={false}>
      <FaqList />
      <Contact dt={content.faq?.contact} />
    </Layout>
  )
})

export default FaqPage
