import React from "react"
import { CartProvider } from "react-use-cart"
import { ToastContainer } from 'react-toastify'
import GlobalStyle from '@/styles/index.js'
import '@/styles/normalize.css'
import 'react-toastify/dist/ReactToastify.css'
import Seo from "../layout/seo"
import Script from "next/script"

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
      `}
      </Script>
      <GlobalStyle />
      <ToastContainer />
      <Seo />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </React.Fragment>
  )
}
