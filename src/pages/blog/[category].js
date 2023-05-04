import Layout from "../../layout"
import styled from "styled-components"
import Head from "next/head"

import client from "../../apollo/apollo-client"
import { gql } from "@apollo/client"
import Archive from "@/components/templates/blog-category-archive"

export default function Category({ background, category, posts }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Archive background={background} category={category} posts={posts} />
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
  console.log(params)
  const { data: { categories, posts, page } } = await client.query({
    query: gql`
      query Category($category: String, $cat: [String]) {
        categories(where: {name: $cat}) {
          nodes {
            name
          }
        }
        posts(where: {categoryName: $category}) {
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
      cat: params.category
    },
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  return {
    props: {
      posts: posts.nodes,
      category: categories.nodes[0].name,
      background: page.blog.heroBlog.background
    }
  }
}