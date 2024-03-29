import { useEffect, useRef, useState } from 'react'
import BookBlock from '../pages/home/BookBlock'
import DBStore, { filterTherapists, getTherapists, getTherapistsAll } from '../../stores/DBStore'
import Reviews from '../pages/home/Reviews'
import Therapists from '../pages/therapists/Therapists'
import { observer } from 'mobx-react'
import Filter from '../pages/therapists/Filter'
import { runInAction } from 'mobx'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import Subscribe from '../common/Subscribe'

const TherapistsPage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()

  useEffect(() => {
    getTherapistsAll().then((res) => {
      DBStore.therapists = res
    })
  }, [])


  return (
    <>
      <Layout withVideo={false}>
        <Therapists />
        <Reviews dt={content.therapistsC.reviews} />
        <BookBlock />
        <Subscribe />
      </Layout>
      <Filter
        params={[{ title: 'Category', list: content.filters }]}
        setFilter={(value) => {
          if (value == null)
            getTherapists().then((res) => {
              runInAction(() => {
                DBStore.therapists = res
              })
            })
          else {
            const st: any = {}
            ;[{ title: 'Category', list: content.filters }].forEach(
              (e: any, i: number) => {
                st[e.title.replaceAll(' ', '')] = value[`p${i}`]
              },
            )

            filterTherapists(st).then((res) => {
              runInAction(() => {
                DBStore.therapists = res
              })
            })
          }
        }}
      />
    </>
  )
})

export default TherapistsPage
