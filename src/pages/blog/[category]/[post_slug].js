import Layout from "../../../layout"
import styled from "styled-components"
import Head from "next/head"

import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"
import Hero from "@/components/templates/post-hero"
import Content from "@/components/templates/post-content"

export default function Post({ page: { categories, slug, title, excerpt, featuredImage, content } }) {
  return (
    <Layout breadcrumbs={[{ page: 'Blog', url: '/blog/' }, { page: categories.nodes[0].name, url: `/blog/${categories.nodes[0].slug}` }, { page: title, url: `/blog/${categories.nodes[0].slug}/${slug}` }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={{ title: title, text: excerpt, background: featuredImage.node }} />
        {content && <Content data={content} />}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`

`

export async function getStaticPaths() {
  const { data: { posts } } = await client.query({
    query: gql`
      query paths {
        posts {
          nodes {
            slug
            categories {
              nodes{
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

  return {
    paths: posts.nodes.map(el => {
      return {
        params: {
          category: el.categories.nodes[0]?.slug || 'brak',
          post_slug: el.slug,
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { data: { page } } = await client.query({
    query: gql`
      query Post($slug: String) {
        page : postBy(slug: $slug) {
          slug
          title
          excerpt
          content
          categories {
            nodes{
              slug
              name
            }
          }
          featuredImage {
            node {
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
    `,
    variables: {
      slug: params.post_slug,
    },
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  return {
    props: {
      page: page

    }
  }
}