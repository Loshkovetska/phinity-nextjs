import Contact from '../pages/about/Contact'
import FaqList from '../pages/faq/FaqList'
import { observer } from 'mobx-react'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import Subscribe from '../common/Subscribe'

const FaqPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  return (
    <Layout withVideo={false}>
      <FaqList />
      <Contact dt={content.faq?.contact} />
      <Subscribe />
    </Layout>
  )
})

export default FaqPage
