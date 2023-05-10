import Layout from "../../../layout"
import styled from "styled-components"
import Head from "next/head"

import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"
import Archive from "@/components/templates/blog-category-archive"
import { PAGE_ITEM_COUNT } from "../../../constants/blog-item-counts"

export default function Category({ background, category, catSlug, posts }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Archive currPage='1' urlBasis={`/blog/${catSlug}`} background={background} category={category} posts={posts} />
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
  const { data: { categories } } = await client.query({
    query: gql`
      query paths {
        categories {
          nodes {
            name
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
    paths: categories.nodes.map(el => {
      return {
        params: {
          category: el.slug,
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { data: { categories, posts, page } } = await client.query({
    query: gql`
      query Category($category: String, $cat: [String], $count: Int) {
        categories(where: {name: $cat}) {
          nodes {
            name
          }
        }
        posts(where: {offsetPagination: {offset: 0, size: $count}, categoryName: $category}) {
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
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
        page(id: "cG9zdDo2Mg==") {
          blog {
            heroBlog {
              background{
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
    variables: {
      category: params.category,
      cat: params.category,
      count: PAGE_ITEM_COUNT
    },
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  return {
    props: {
      posts: posts,
      category: categories.nodes[0].name,
      catSlug: params.category,
      background: page.blog.heroBlog.background
    }
  }
}