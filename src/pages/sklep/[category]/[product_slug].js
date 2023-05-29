import Layout from "../../../layout"
import styled from "styled-components"

import Hero from "@/components/templates/hero-product"
import Description from "@/components/templates/product-description"
import Reviews from "@/components/templates/reviews"
import Characteristics from "@/components/templates/product-characteristics"
import SimilarProducts from "@/components/templates/similar-products"
import CallToAction from "@/components/templates/call-to-action"

import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"

export default function Post({ similarProducts, productCategory, cta, data, reviews }) {
  return (
    <Layout breadcrumbs={[{ page: 'Sklep', url: '/sklep/' }, { page: productCategory.name, url: `/sklep/${productCategory.slug}` }, { page: data.name, url: `/sklep/${data.slug}` }]}>
      <Wrapper>
        <Hero data={data} />
        <Description data={data.acf} />
        <Reviews data={reviews} />
        <Characteristics data={data.attributes} />
        {similarProducts.length > 0 && (
          <SimilarProducts data={similarProducts} />
        )}
        <CallToAction data={cta} />
      </Wrapper>
    </Layout >
  )
}

const Wrapper = styled.main`

`

export async function getServerSideProps({ params }) {
  try {
    const { data: { similarProducts, productCategory, product, global } } = await client.query({
      query: gql`
      query Product($catSlug: String, $slug: ID!, $catID: ID!) {
        productCategory(id: $catID, idType: SLUG) {
          slug
          name
        }
        similarProducts : products(where: {stockStatus: IN_STOCK, category: $catSlug}, first: 4){
          nodes {
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
              uri
              stockQuantity
              stockStatus
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
          excerpt
          description
          name
          ... on SimpleProduct {
            id
            databaseId
            slug
            stockQuantity
            stockStatus
            price(format: RAW)
            regularPrice(format: RAW)
            salePrice(format: RAW)
            acf : product {
              repeater {
                text
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
        slug: params.product_slug,
        catSlug: params.category
      },
      context: {
        fetchOptions: {
          next: { revalidate: 1 },
        },
      }
    })
    return {
      props: {
        data: product,
        cta: global.callToAction,
        reviews: global.reviews,
        productCategory: productCategory,
        similarProducts: similarProducts.nodes.filter(el => el.id !== product.id)
      }
    }
  }
  catch (err) {
    console.log(err)
    return {
      notFound: true,
    }
  }
}