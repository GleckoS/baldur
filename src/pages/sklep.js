import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import Hero from '@/components/templates/hero-shop'
import Categories from '@/components/templates/categories-shop'
import ProductGrid from '@/components/templates/product-grid-shop'
import CallToAction from '@/components/templates/call-to-action'
import Reviews from '@/components/templates/reviews'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Sklep({ cta, categories, posts, hero, reviews }) {
  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep/' }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={hero} />
        <Categories data={categories} />
        <ProductGrid data='TODO' />
        <CallToAction data={cta} />
        <Reviews data={reviews} />
        <Blog posts={posts} />
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
  const { data: { productCategories, posts, global, page: { shop: page } } } = await client.query({
    query: gql`
      query Sklep {
        productCategories {
          nodes {
            image {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            slug
            name
          }
        }
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

  return {
    props: {
      hero: page.heroShop,
      posts: posts.nodes,
      categories: productCategories.nodes,
      reviews: global.reviews,
      cta: global.callToAction
    }
  };
}