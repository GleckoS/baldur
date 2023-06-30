import React, { useEffect, useState } from "react"
import { CartProvider } from "react-use-cart"
import { ToastContainer } from 'react-toastify'
import GlobalStyle from '@/styles/index.js'
import '@/styles/normalize.css'
import 'react-toastify/dist/ReactToastify.css'
import Seo from "../layout/seo"
// import Router from "next/router";
// import styled, { keyframes } from "styled-components"

export default function App({ Component, pageProps }) {

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const start = () => {
  //     console.log("start");
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log("finished");
  //     setLoading(false);
  //   };
  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <ToastContainer />
      <Seo seo={pageProps.seo || {}} />
      <CartProvider>
        {/* <Loader className={loading ? 'active' : ''} /> */}
        <Component {...pageProps} />
      </CartProvider>
    </React.Fragment>
  )
}

// const Loader = ({ className }) => (
//   <Wrapper className={className}>
//     <div className="lds-ring"><div /><div /><div /><div /></div>
//   </Wrapper>
// )

// const ldsRing = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `

// const Wrapper = styled.div`
//   position: fixed;
//   z-index: 1000000;
//   inset: 0;
//   background: #00000090;
//   opacity: 0;
//   pointer-events: none;
//   transition: opacity .3s cubic-bezier(0.77, 0, 0.175, 1);

//   &.active{
//     opacity: 1;
//     pointer-events: all;
//   }

//   .lds-ring {
//   display: inline-block;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   width: 80px;
//   height: 80px;
// }
// .lds-ring div {
//   box-sizing: border-box;
//   display: block;
//   position: absolute;
//   width: 64px;
//   height: 64px;
//   margin: 8px;
//   border: 8px solid #fff;
//   border-radius: 50%;
//   animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//   border-color: #fff transparent transparent transparent;
// }
// .lds-ring div:nth-child(1) {
//   animation-delay: -0.45s;
// }
// .lds-ring div:nth-child(2) {
//   animation-delay: -0.3s;
// }
// .lds-ring div:nth-child(3) {
//   animation-delay: -0.15s;
// }

// `