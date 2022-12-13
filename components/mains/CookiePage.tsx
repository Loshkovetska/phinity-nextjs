import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import TermsContent from '../pages/terms/TermsContent'
import Layout from '../common/Layout'
import { useContentState } from '../../hooks/RootStoreProvider'

const CookiePage = observer(({ dt }: { dt: any }) => {
  const content = useContentState()
  useEffect(() => {
    document.querySelector('.terms')?.classList.add('cookie-page')
  }, [content.cookie])

  return (
    <Layout withVideo={false}>
      <TermsContent dt={content.cookie} />
    </Layout>
  )
})

export default CookiePage
