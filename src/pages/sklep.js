import styled from 'styled-components'
import Layout from '../layout'
import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import Head from 'next/head'
import Blog from '@/components/templates/blog-slider'

export default function Sklep({ posts, id }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
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
  const { data: { posts, page: { id } } } = await client.query({
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
          id
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
      id,
      posts
    }
  };
}