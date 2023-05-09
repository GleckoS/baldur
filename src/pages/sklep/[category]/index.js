import Layout from "../../../layout"
import styled from "styled-components"
import Head from "next/head"

import CallToAction from "@/components/templates/call-to-action"
import Reviews from "@/components/templates/reviews"
import Blog from "@/components/templates/blog-slider"

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"
import ProductGrid from "@/components/templates/product-grid-category"

const api = new WooCommerceRestApi({
  url: "https://baldur.headlesshub.com",
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3"
})

export default function Category({ posts, reviews, cta }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <ProductGrid data='TODO'/>
        <CallToAction data={cta} />
        <Reviews data={reviews} />
        <Blog posts={posts.nodes} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  overflow: hidden;
  margin-bottom: -11px;
  padding-bottom: 11px;
`

export async function getStaticPaths() {
  const categoires = await api.get("products/categories")

  return {
    paths: categoires.data.map(el => {
      return {
        params: {
          category: el.slug
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { data: { posts, global } } = await client.query({
    query: gql`
      query Category {
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
      reviews: global.reviews,
      cta: global.callToAction,
      posts: posts
    }
  }
}