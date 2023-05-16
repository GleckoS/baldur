import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import Hero from '@/components/templates/hero-checkout'
import Process from '@/components/templates/checkout-process'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Sklep({ cta, categories, posts, hero, reviews }) {
  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep' }, { page: 'Koszyk', url: '/koszyk' }, {page: 'Zamówienie', url: '/zamowienie'}]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero />
        <Process />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Checkout {
        page(id: "cG9zdDoxMDU=") {
          id
        }
      }
    `,
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });


  return {
    props: {
      id: ''
    }
  };
}