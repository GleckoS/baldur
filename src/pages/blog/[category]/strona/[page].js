import Layout from "../../../../layout"
import styled from "styled-components"

import client from "../../../../apollo/apollo-client"
import { gql } from "@apollo/client"
import Archive from "@/components/templates/blog-category-archive"
import { PAGE_ITEM_COUNT } from "../../../../constants/blog-item-counts"

export default function Category({ currPage, background, category, catSlug, posts }) {
  return (
    <Layout breadcrumbs={[{ page: 'Blog', url: '/blog/' }, { page: category.name, url: `/blog/${catSlug}` }, { page: `Strona ${currPage}`, url: `/blog/${catSlug}/strona/${currPage}` }]}>
      <Wrapper>
        <Archive currPage={currPage} urlBasis={`/blog/${catSlug}`} background={background} category={category} posts={posts} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
`

export async function getStaticPaths() {
  const { data: { categories } } = await client.query({
    query: gql`
      query paths {
        categories {
          nodes {
            name
            slug
            count
          }
        }
      }
    `,
    context: {
      fetchOptions: {
        next: { revalidate: 1 },
      },
    }
  });

  const paths = []

  categories.nodes.forEach(el => {
    for (let i = 2; i <= Math.ceil(el.count / PAGE_ITEM_COUNT); i++) {
      paths.push({
        params: {
          category: el.slug,
          page: i.toString()
        }
      })
    }
  })

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  if (params.page < 2) {
    return {
      redirect: {
        permanent: false,
        destination: `/blog/${params.category}`,
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

  try {
    const { data: { categories, posts, page } } = await client.query({
      query: gql`
      query Category($category: String, $cat: [String], $count: Int) {
        categories(where: {name: $cat}) {
          nodes {
            seo {
              title
              metaDesc
              opengraphSiteName
              opengraphImage {
                mediaItemUrl
              }
            }
            name
            count
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
          next: { revalidate: 1 },
        },
      }
    });

    return {
      props: {
        posts: posts,
        category: categories.nodes[0],
        catSlug: params.category,
        background: page.blog.heroBlog.background,
        currPage: params.page,
        seo: categories.nodes[0].seo
      }
    }
  }
  catch (err) {
    return {
      notFound: true
    }
  }
}