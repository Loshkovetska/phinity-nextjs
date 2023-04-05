import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import DBStore from '../../../../stores/DBStore'
import GlobalState, {
  changeTheraFilterState,
} from '../../../../stores/GlobalState'
import Button from '../../../common/Button'
import PageLinks from '../../../common/PageLinks'
import VideosList from '../VideosiList'
import Setting from '../../../../assets/filter.svg'
import MSetting from '../../../../assets/mob-sett.svg'
import ContentStore from '../../../../stores/ContentStore'
import { useWindowDimensions } from '../../../../hooks/getWindowDimensions'
import { useContentState } from '../../../../hooks/RootStoreProvider'
const NewVideos = observer(() => {
  const { width } = useWindowDimensions()

  // useEffect(() => {
  //   if (DBStore.videos) {
  //     setTimeout(() => {
  //       document.querySelector('.new-videos')?.classList.add('animated')
  //     }, 300)

  //     setTimeout(() => {
  //       document.querySelector('.new-videos__title')?.classList.add('animated')
  //     }, 500)

  //     setTimeout(() => {
  //       document
  //         .querySelector('.new-videos__subtitle')
  //         ?.classList.add('animated')
  //     }, 700)

  //     setTimeout(() => {
  //       const items = document!.querySelectorAll('.videos-list .videos__item')
  //       Array.from(items).forEach((i, id) => {
  //         i?.classList.add('animated')
  //         if (id >= 0 && id <= 5) {
  //           ;(i as HTMLDivElement).style.transitionDelay = `${id / 8 + 0.5}s`
  //         }
  //       })
  //     }, 1000)
  //   }
  // }, [DBStore.videos])

  let main = '',
    thera = ''
  const content = useContentState()
  const { videosC, videos, links: linksL } = content
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2)?.link
    thera = linksL.find((l: any) => l.id == 268)?.link
  }

  return (
    <section className="new-videos">
      <PageLinks
        links={[
          { title: videosC?.mainPageTitle, link: main },
          { title: videosC?.pageTitle, link: '/video' },
        ]}
      />
      <div className="new-videos__top">
        <div style={{ overflow: 'hidden' }}>
          <div
            className="new-videos__title"
            dangerouslySetInnerHTML={{
              __html: videosC.content.title,
            }}
          ></div>
        </div>
        <Button
          text={
            <>
              {width > 768 ? <Setting /> : <MSetting />}
              {width > 768 && 'Filter'}
              {width > 768 && GlobalState.filterCount ? (
                <span>({GlobalState.filterCount})</span>
              ) : (
                <></>
              )}
            </>
          }
          click={changeTheraFilterState}
          classname="black-border p11p24 filter"
        />
      </div>
      <VideosList videos={videos} />
      
    </section>
  )
})

export default NewVideos
