import styled from 'styled-components'
import Layout from '../layout'

import Hero from '@/components/templates/hero-with-image'
import TwoColumnFlex from '@/components/templates/how-it-started'
import TwoColumnText from '@/components/templates/two-column-text'
import Cooperation from '@/components/templates/two-column-text-image-under'
import OurKnifes from '@/components/templates/our-knifes'
import Materials from '@/components/templates/materials-about'
import Reviews from '@/components/templates/reviews'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Home({ hero, posts, reviews, categories, proces, results, categoiresData, cooperation, knifes }) {
  return (
    <Layout breadcrumbs={[{page: 'Jak wybieramy materiały', url: '/jak-wybieramy-materialy/'}]}>
      <Wrapper>
        <Hero data={hero} />
        <TwoColumnFlex data={proces} />
        <TwoColumnText data={results} />
        <OurKnifes data={knifes} />
        <Cooperation data={cooperation}/>
        <Materials categories={categories} data={categoiresData} />
        <Reviews data={reviews} />
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
  const { data: { productCategories, posts, global, page: { howWeChoiseMaterials: page } } } = await client.query({
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
        global : page(id: "cG9zdDoyOQ==") {
          reviews {
            title
            text
            reviews {
              author
              content
              mark
            }
          }
        }
        page(id: "cG9zdDoyNTk=") {
          howWeChoiseMaterials {
            heroHow {
              title
              text
              background {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            categoriesHow{
              title
              text
            }
            cooperationHow {
              title
              rightText
              leftText
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            knifesSlider {
              title
              link {
                title
                url
              }
              gallery {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            processHow {
              title
              text
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            resultsHow {
              title
              rightText
              leftText
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
      categories: productCategories.nodes,
      categoiresData: page.categoriesHow,
      posts: posts.nodes,
      reviews: global.reviews,
      hero: page.heroHow,
      cooperation: page.cooperationHow,
      knifes: page.knifesSlider,
      proces: page.processHow,
      results: page.resultsHow
    }
  };
}