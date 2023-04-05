import '../styles/index.scss'
import { RootStoreProvider } from '../hooks/RootStoreProvider'
import { useEffect, useRef } from 'react'
import { getReviewsIODynamic } from '../stores/GlobalState'

function MyApp({ Component, pageProps }: any) {
  const ref = useRef<any>(false)
  useEffect(() => {
    if (ref.current) return
    getReviewsIODynamic()
    ref.current = true
    console.clear()
    document.querySelector('head')?.insertAdjacentHTML(
      'beforeend',
      ` <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />`,
    )
  }, [])
  return (
    <RootStoreProvider hydrationData={pageProps?.dt}>
      <Component {...pageProps} />
    </RootStoreProvider>
  )
}

export default MyApp
