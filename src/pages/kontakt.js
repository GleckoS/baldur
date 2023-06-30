import styled from 'styled-components'
import Layout from '../layout'

import Faq from '@/components/templates/faq'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import Contact from '@/components/templates/contact'

export default function Kontakt({ posts, faq }) {
  return (
    <Layout breadcrumbs={[{page: 'Kontakt', url: '/kontakt'}]}>
      <Wrapper>
        <Contact/>
        <Faq data={faq}/>
        <Blog posts={posts.nodes} />
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
  const { data: { posts, page: { contact: page, seo } } } = await client.query({
    query: gql`
      query Kontakt {
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
        page(id: "cG9zdDoxODM=") {
          seo {
            title
            metaDesc
            opengraphSiteName
            opengraphImage {
              mediaItemUrl
            }
          }
          contact{
            faq{
              title
              questions{
                question
                response
              }
            }
          }
        }
      }
    `,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    }
  });

  return {
    props: {
      posts: posts,
      faq: page.faq,
      seo: seo
    }
  };
}