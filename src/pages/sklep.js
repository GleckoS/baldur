import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import Hero from '@/components/templates/hero-shop'
import Categories from '@/components/templates/categories-shop'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

const api = new WooCommerceRestApi({
  url: "https://baldur.headlesshub.com",
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3"
})

export default function Sklep({ categories, posts, hero }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={hero} />
        <Categories data={categories}/>
        {/* <Blog posts={posts.nodes} /> */}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  overflow: hidden;
  margin-bottom: -11px;
  padding-bottom: 11px;
`

export async function getStaticProps() {
  const { data: { posts, page: { shop: page } } } = await client.query({
    query: gql`
      query Sklep {
        posts(first: 3) {
          nodes {
            uri
            excerpt
            title
            featuredImage {
              node{
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
          shop {
            heroShop {
              title
              text
              background {
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
      }
    `,
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  const categoires = await api.get("products/categories")

  return {
    props: {
      hero: page.heroShop,
      posts: posts,
      categories: categoires.data,
    }
  };
}