import React from "react"
import { CartProvider } from "react-use-cart"
import { ToastContainer } from 'react-toastify'
import GlobalStyle from '@/styles/index.js'
import '@/styles/normalize.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ToastContainer />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </React.Fragment>
  )
}
