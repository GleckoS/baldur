import styled from 'styled-components'
import Layout from '../../layout'
import Head from 'next/head'

import Hero from '@/components/templates/hero-blog'

import { gql } from "@apollo/client"
import client from "../../apollo/apollo-client"
import Archive from '@/components/templates/blog-archive'
import { PAGE_ITEM_COUNT } from '../../constants/blog-item-counts'

export default function Kontakt({ categories, posts, hero }) {
  return (
    <Layout breadcrumbs={[{ page: 'Blog', url: '/blog/' }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={hero} />
        <Archive currPage='1' urlBasis='/blog' categories={categories} posts={posts} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getServerSideProps() {
  const { data: { categories, posts, page: { blog: page } } } = await client.query({
    query: gql`
      query Kontakt($count: Int) {
        categories {
          nodes {
            name
            slug
            count
          }
        }
        posts(where: {offsetPagination: {offset: 0, size: $count}}) {
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
              title
              text
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
      hero: page.heroBlog,
      categories: categories.nodes
    }
  };
}