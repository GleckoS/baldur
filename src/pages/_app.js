import React from "react"
import { CartProvider } from "react-use-cart"
import { ToastContainer } from 'react-toastify'
import GlobalStyle from '@/styles/index.js'
import '@/styles/normalize.css'
import 'react-toastify/dist/ReactToastify.css'
import Seo from "../layout/seo"

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ToastContainer />
      <Seo />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </React.Fragment>
  )
}
