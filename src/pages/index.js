import styled from 'styled-components'
import Layout from '../layout'

import Hero from '@/components/templates/hero-homepage'
import AboutShop from '@/components/templates/about-shop-homepage'
import Materials from '@/components/templates/materials-homepage'
import About from '@/components/templates/about-baldur-homepage'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Home({ hero, aboutShop, materials, categories, baldur, posts }) {
  return (
    <Layout>
      <Wrapper>
        <Hero data={hero} />
        <AboutShop data={aboutShop} />
        <Materials data={materials} categories={categories} />
        <About data={baldur} />
        <Blog posts={posts} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  overflow: hidden;
  margin-bottom: calc(-1 * clamp(80px, ${220 / 1440 * 100}vw, 220px));
  padding-bottom: clamp(80px, ${220 / 1440 * 100}vw, 220px);
`

export async function getStaticProps() {
  const { data: { productCategories, posts, page: { homepage: page } } } = await client.query({
    query: gql`
      query Homepage {
        productCategories {
          nodes {
            image {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            slug
            name
          }
        }
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
        page(id: "cG9zdDo1") {
          homepage{
            hero{
              title
              link{
                title
                url
              }
              background{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            aboutShop : about{
              title
              text
              linkTitle
              link{
                title
                url
              }
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            materials{
              title
              leftTitle
              leftText
              rightTitle
              rightText
            }
            baldur{
              title
              firstTitle
              firstText
              secondTitle
              secondText
              image{
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
        next: { revalidate: 1 },
      },
    }
  });

  return {
    props: {
      hero: page.hero,
      aboutShop: page.aboutShop,
      materials: page.materials,
      categories: productCategories.nodes,
      baldur: page.baldur,
      posts: posts.nodes
    }
  };
}