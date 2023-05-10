import styled from 'styled-components'
import Layout from '../../../layout'
import Head from 'next/head'
import { PAGE_ITEM_COUNT } from '../../../constants/blog-item-counts'

import Hero from '@/components/templates/hero-blog'
import Archive from '@/components/templates/blog-archive'

import { gql } from "@apollo/client"
import client from "../../../apollo/apollo-client"

export default function Kontakt({ categories, posts, hero, currPage }) {
  return (
    <Layout breadcrumbs={[{ page: 'Blog', url: '/blog/' }, { page: `Strona ${currPage}`, url: `/blog/strona/${currPage}` }]}>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={hero} />
        <Archive currPage={currPage} urlBasis='/blog' categories={categories} posts={posts} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getStaticPaths() {
  const { data: { posts } } = await client.query({
    query: gql`
    query Paths {
      posts {
        pageInfo {
          offsetPagination {
            total
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

  const arr = []
  for (let i = 2; i <= Math.ceil(posts.pageInfo.offsetPagination.total / PAGE_ITEM_COUNT); i++) {
    arr.push({
      page: i
    })
  }

  return {
    paths: arr.map(el => {
      return {
        params: {
          page: String(el.page)
        }
      }
    }),
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  if (params.page < 2) {
    return {
      redirect: {
        permanent: false,
        destination: "/blog",
      },
      props: {}
    }
  }
  if (isNaN(params.page)) {
    return {
      props: {},
      notFound: true
    };
  }

  const { data: { categories, posts, page: { blog: page } } } = await client.query({
    query: gql`
      query Kontakt($count: Int, $offset: Int) {
        categories {
          nodes {
            name
            slug
            count
          }
        }
        posts(where: {offsetPagination: {offset: $offset, size: $count}}) {
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
      count: PAGE_ITEM_COUNT,
      offset: PAGE_ITEM_COUNT * (params.page - 1)
    },
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  });

  const notFound = posts.nodes.length <= 0;

  return {
    props: {
      posts: posts,
      hero: page.heroBlog,
      categories: categories.nodes,
      currPage: params.page
    },
    notFound
  };
}