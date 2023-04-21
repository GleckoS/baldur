import GlobalStyle from '@/styles/index.js'
import '@/styles/normalize.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
