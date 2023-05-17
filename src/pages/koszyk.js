import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import CallToAction from '@/components/templates/call-to-action'
import Hero from '@/components/templates/hero-checkout'
import { useCart } from 'react-use-cart'
import Content from '@/components/templates/cart-content'
import SimilarProducts from '@/components/templates/similar-products'

export default function Cart({ cta }) {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep' }, { page: 'Koszyk', url: '/koszyk' }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero step='1' />
        <Content data={items} />
        <SimilarProducts data={[]}/>
        <CallToAction data={cta} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getStaticProps(props) {
  const { data: { page, global } } = await client.query({
    query: gql`
      query Cart {
        page(id: "cG9zdDoxMDU=") {
          id
        }
        global : page(id: "cG9zdDoyOQ==") {
          reviews {
            title
            text
            reviews {
              author
              content
              mark
            }
          }
          callToAction{
            ctaText
            ctaLink{
              title
              url
            }
          }
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
      cta: global.callToAction,
    }
  };
}