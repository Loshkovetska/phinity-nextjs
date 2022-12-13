import { observer } from 'mobx-react'
import Filter from '../pages/therapists/Filter'
import VacanciesContent from '../pages/works/VacanciesContent'
import DBStore, { filterVacancies, getVacancies } from '../../stores/DBStore'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import { runInAction } from 'mobx'
import { useEffect } from 'react'

const WorkPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()

  useEffect(() => {
    runInAction(() => {
      DBStore.vacancies = content.vacancies
    })
  }, [])
  return (
    <>
      <Layout withVideo={false}>
        <VacanciesContent works={content.workC} />
      </Layout>
      <Filter
        params={[{ title: 'Category', list: content.filters }] || null}
        setFilter={(value) => {
          if (value == null)
            getVacancies().then((res) => {
              DBStore.vacancies = res
            })
          else {
            const st: any = {}
            ;[{ title: 'Category', list: content.filters }]?.forEach(
              (e: any, i: number) => {
                st[e.title.replaceAll(' ', '')] = value[`p${i}`]
              },
            )
            filterVacancies(st).then((res) => {
              DBStore.vacancies = res
            })
          }
        }}
      />
    </>
  )
})

export default WorkPage
