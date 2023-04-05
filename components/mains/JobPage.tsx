import { observer } from 'mobx-react'
import CVForm from '../pages/work/CVForm'
import VacancyContent from '../pages/work/VacancyContent'
import Layout from '../common/Layout'
import Subscribe from '../common/Subscribe'

const JobPage = observer(({ data }: { data: any }) => {
  return (
    <>
      <Layout withVideo={false}>
        <VacancyContent />
        <CVForm job={data.jobC} />
        <Subscribe />
      </Layout>
    </>
  )
})

export default JobPage
