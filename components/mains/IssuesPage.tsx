import { useEffect, useRef, useState } from 'react'
import Intro from '../pages/services/Intro'
import BookBlock from '../pages/home/BookBlock'
import OurServices from '../pages/issues/OurServices'
import DBStore, { filterIssues, getIssues } from '../../stores/DBStore'
import IssuesList from '../pages/issues/IssuesList'
import { observer } from 'mobx-react'
import GlobalState from '../../stores/GlobalState'
import Filter from '../pages/therapists/Filter'
import Blogs from '../pages/home/Blogs'
import Videos from '../pages/blog/Videos'
import { runInAction } from 'mobx'
import { useWindowDimensions } from '../../hooks/getWindowDimensions'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'
import Subscribe from '../common/Subscribe'

const IssuesPage = observer(({ dt }: { dt: any }) => {
  const { width } = useWindowDimensions()
  const content = useContentState()

  let main = '',
    issuesL = ''
  const linksL = content.links
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link
    issuesL = linksL.find((l: any) => l.id == 266)?.link
  }

  const links = [
    {
      title: content.issuesC?.mainPageTitle,
      link: main,
    },
    {
      title: content.issuesC?.pageTitle,
      link: '/issues',
    },
  ]

  useEffect(() => {
    runInAction(() => {
      DBStore.issues = content.issues
    })
  }, [content.issues])

  return (
    <>
      <Layout withScroll>
        <Intro
          dt={{
            ...content.issuesC?.intro,
            buttonLink: content.issuesC.intro.buttonLink,
          }}
          links={links}
          classname="service-page"
        />
        <OurServices issues={content.issuesC} />
        <IssuesList issues={DBStore.issues || []} />
        <Blogs
          arr={content.posts}
          dt={{
            title: content.issuesC.blogTitle,
            buttonTitle: content.issuesC.blogButton,
          }}
        />
        <Videos arr={content.videos} dt={content.issuesC.video} />
        <BookBlock />
        <Subscribe />
      </Layout>
      <Filter
        params={content.filters}
        setFilter={(value) => {
          if (value == null)
            getIssues().then((res) => {
              runInAction(() => {
                DBStore.issues = res
              })
            })
          else {
            const st: any = {}
            content.filters.forEach((e: any, i: number) => {
              st[e.title.replaceAll(' ', '')] = value[`p${i}`]
            })
            filterIssues(st).then((res) => {
              runInAction(() => {
                DBStore.issues = res
              })
            })
          }
        }}
      />
    </>
  )
})

export default IssuesPage
