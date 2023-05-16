import { CartProvider } from "react-use-cart"
import GlobalStyle from '@/styles/index.js'
import '@/styles/normalize.css'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </CartProvider>
  )
}
