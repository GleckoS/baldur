import Layout from "../../../layout"
import styled from "styled-components"
import Head from "next/head"

import ProductGrid from "@/components/templates/product-grid-category"
import CallToAction from "@/components/templates/call-to-action"
import Reviews from "@/components/templates/reviews"
import Blog from "@/components/templates/blog-slider"

import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"
import Hero from "@/components/templates/hero-product-category"

export default function Category({ category, posts, reviews, cta }) {
  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep/' }, { page: category.name, url: `/sklep/${category.slug}` }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={category.description} />
        <ProductGrid data={category.products.nodes} />
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
  const { data: { productCategories } } = await client.query({
    query: gql`
      query Homepage {
        productCategories {
          nodes {
            slug
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
    paths: productCategories.nodes.map(el => {
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
  const { data: { productCategory, posts, global } } = await client.query({
    query: gql`
      query Category($catID: ID!) {
        productCategory(id: $catID, idType: SLUG) {
          slug
          name
          description
          products(first: 100000) {
            nodes {
              uri
              ... on SimpleProduct {
                acf : product{
                  description{
                    line
                  }
                }
                id
                name
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
      }
    `,
    variables: {
      catID: params.category
    },
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
      posts: posts,
      category: productCategory
    }
  }
}