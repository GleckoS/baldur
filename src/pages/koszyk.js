import styled from 'styled-components'
import Layout from '../layout'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import CallToAction from '@/components/templates/call-to-action'
import Hero from '@/components/templates/hero-checkout'
import Content from '@/components/templates/cart-content'
import SimilarProducts from '@/components/templates/similar-products'
import { useCart } from "react-use-cart"
import CartEmpty from '@/components/templates/cart-empty'
import { useEffect, useState } from 'react'

export default function Cart({ cta, highlightedProducts }) {
  const { isEmpty } = useCart()

  const [cartState, setCartState] = useState(false)

  useEffect(() => {
    setCartState(isEmpty)
  }, [isEmpty])

  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep' }, { page: 'Koszyk', url: '/koszyk' }]}>
      <Wrapper>
        <Hero step={isEmpty ? '0' : '1'} />
        {cartState
          ? <CartEmpty />
          : <Content setCartState={setCartState} />
        }
        <SimilarProducts title='Polecane produkty' data={highlightedProducts} />
        <CallToAction data={cta} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getStaticProps(props) {
  const { data: { page, global, highlightedProducts } } = await client.query({
    query: gql`
      query Cart {
        highlightedProducts : products(where: {featured: true}, first: 3) {
          nodes {
            uri
            ... on SimpleProduct {
              acf : product{
                description{
                  line
                }
              }
              id
              databaseId
              name
              slug
              stockQuantity
              price(format: RAW)
              regularPrice(format: RAW)
              salePrice(format: RAW)
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
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
      highlightedProducts: highlightedProducts.nodes,
    }
  };
}