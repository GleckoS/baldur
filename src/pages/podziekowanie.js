import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'
import Success from '@/components/templates/checkout-success'
import Error from '@/components/templates/checkout-error'

export default function Result({ status }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        {status ? <Success /> : <Error />}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  padding-top: clamp(90px, ${160 / 768 * 100}vw, 160px);
  position: relative;

  .background{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    height: fit-content;
    pointer-events: none;
    max-height: 115%;

    &.error{
      max-height: 130%;
    }
  }

  h1{
    text-align: center;
    max-width: 600px;
    font-family: var(--text);
    font-style: normal;
    font-weight: 500;
    font-size: clamp(24rem, ${48 / 768 * 100}vw, 48rem);
    line-height: 120%;
    text-align: center;
    letter-spacing: -0.02em;
    margin: 0 auto 10px;
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  .text{
    max-width: 560px;
    margin: 0 auto 50px;
    text-align: center;
    font-weight: 400;
    font-size: clamp(16rem, ${20 / 768 * 100}vw, 20rem);
    line-height: 138%;
    text-align: center;
    text-transform: uppercase;
    font-feature-settings: 'pnum' on, 'onum' on;

    @media (max-width: 480px){
      margin-bottom: 40px;
    }
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
    }

    strong{
      font-size: clamp(16rem, ${24 / 768 * 100}vw, 24rem);
      @media (max-width: 360px) {
        font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
      }
    }
  }

  .annotation{
    max-width: 660px;
    margin: 0 auto 50px;
    font-size: clamp(16rem, ${24 / 768 * 100}vw, 24rem);
    line-height: 138%;
    text-align: center;
    font-feature-settings: 'pnum' on, 'onum' on;

    @media (max-width: 480px){
      margin-bottom: 40px;
    }
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
    }
  }

  a{
    margin: 0 auto;

    @media (max-width: 480px) {
      height: 51px;
    }

    span{
      font-size: clamp(18rem, ${28 / 768 * 100}vw, 28rem);

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem);
        clip-path: polygon(0 0,100% 0%,calc(100% - 24px) 100%,0% 100%);
      }
    }
  }
`

export async function getServerSideProps() {
  return { props: {} }
}