import Layout from "../../../layout"
import styled from "styled-components"
import Head from "next/head"

import Hero from "@/components/templates/hero-product"
import Reviews from "@/components/templates/reviews"
import Characteristics from "@/components/templates/product-characteristics"
import SimilarProducts from "@/components/templates/similar-products"
import CallToAction from "@/components/templates/call-to-action"

import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"

export default function Post({ category, cta, data, reviews }) {
  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep/' }, { page: category.name, url: `/sklep/${category.slug}` }, { page: data.name, url: `/sklep/${data.slug}` }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={data} />
        <Reviews data={reviews} />
        <Characteristics data={data.attributes} />
        <SimilarProducts />
        <CallToAction data={cta} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`

`

export async function getStaticPaths() {

  const { data: { products } } = await client.query({
    query: gql`
      query Homepage {
        products {
          nodes {
            slug
            productCategories {
              nodes {
                slug
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

  const paths = products.nodes.map(el => {
    return {
      params: {
        category: el.productCategories.nodes[0].slug,
        slug: el.slug,
      }
    }
  })

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {

  const { data: { productCategory, product, global } } = await client.query({
    query: gql`
      query Product($slug: ID!, $catID: ID!) {
        productCategory(id: $catID, idType: SLUG) {
          slug
          name
        }
        product(idType: SLUG, id: $slug){
          attributes {
            nodes {
              ... on GlobalProductAttribute {
                name
                slug
                terms {
                  nodes {
                    name
                  }
                }
              }
            }
          }
          description
          slug
          name
          ... on SimpleProduct {
            stockQuantity
            regularPrice(format: RAW)
            salePrice(format: RAW)
          }
          image {
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
          galleryImages {
            nodes {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
          }
        }
        global : page(id: "cG9zdDoyOQ==") {
          callToAction{
            ctaText
            ctaLink{
              title
              url
            }
          }
          reviews {
            title
            text
            reviews {
              author
              content
              mark
            }
          }
        }
      }
    `,
    variables: {
      catID: params.category,
      slug: params.slug
    },
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  return {
    props: {
      data: product,
      cta: global.callToAction,
      reviews: global.reviews,
      category: productCategory
    }
  }
}