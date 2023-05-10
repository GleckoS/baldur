import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Cart({ cta }) {
  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep' }, { page: 'Koszyk', url: '/koszyk' }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Cart {
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
    props: {}
  };
}