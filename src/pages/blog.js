import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import Hero from '@/components/templates/hero-blog'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import Archive from '@/components/templates/blog-archive'

export default function Kontakt({ categories, posts, hero }) {
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
        <Archive categories={categories} posts={posts} />
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
  const { data: { categories, posts, page: { blog: page } } } = await client.query({
    query: gql`
      query Kontakt {
        categories {
          nodes {
            name
            slug
            count
          }
        }
        posts {
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
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  return {
    props: {
      posts: posts.nodes,
      hero: page.heroBlog,
      categories: categories.nodes
    }
  };
}