import { observer } from 'mobx-react'
import Servives from '../pages/home/Services'
import FeesTable from '../pages/fees/FeesTable'
import Rules from '../pages/fees/Rules'
import Benefits from '../pages/fees/Benefits'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'

const FeesPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  return (
    <Layout withVideo={false}>
      <FeesTable />
      <Rules />
      <Benefits />
      <Servives dt={content.fees.services} />
      <div className="space-block "></div>
    </Layout>
  )
})

export default FeesPage
