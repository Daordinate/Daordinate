import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppHeader } from '../components/header'



function MyApp({ Component, pageProps }: AppProps) {
  
  return <>
          <AppHeader/>
          <Component {...pageProps} />
        </>
}

export default MyApp
