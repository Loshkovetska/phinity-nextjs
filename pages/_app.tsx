import '../styles/index.scss'
import { RootStoreProvider } from '../hooks/RootStoreProvider'

function MyApp({ Component, pageProps }: any) {
  return (
    <RootStoreProvider hydrationData={pageProps?.dt}>
      <Component {...pageProps} />
    </RootStoreProvider>
  )
}

export default MyApp
