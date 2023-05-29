import styled from 'styled-components'
import Layout from '../layout'

import Hero from '@/components/templates/hero-with-image'
import TwoColumnFlex from '@/components/templates/how-it-started'
import TwoColumnText from '@/components/templates/two-column-text'
import OurValues from '@/components/templates/our-values'
import Portfolio from '@/components/templates/portfolio'
import CallToAction from '@/components/templates/call-to-action'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Kontakt({ posts, cta, hero, howItStarted, ourMission, ourValues, portfolio }) {
  return (
    <Layout breadcrumbs={[{page: 'O Baldur', url: '/o-nas/'}]}>
      <Wrapper>
        <Hero data={hero}/> 
        <TwoColumnFlex data={howItStarted} />
        <TwoColumnText data={ourMission} />
        <OurValues data={ourValues} />
        <Portfolio data={portfolio} />
        <CallToAction data={cta} />
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
  const { data: { posts, global, page: { aboutBaldur: page } } } = await client.query({
    query: gql`
      query Kontakt {
        global : page(id: "cG9zdDoyOQ==") {
          callToAction{
            ctaText
            ctaLink{
              title
              url
            }
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
        page(id: "cG9zdDoyMDc=") {
          aboutBaldur {
            heroAbout {
              title
              text
              background : backogrund {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            howItStarted {
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
            ourMission {
              title
              leftText
              rightText
            }
            ourValues {
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
            portfolio {
              title
              leftText
              rightText
              secondTitle: tytulPodCzesciaTekstowa
              background {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
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
      hero: page.heroAbout,
      howItStarted: page.howItStarted,
      ourMission: page.ourMission,
      ourValues: page.ourValues,
      portfolio: page.portfolio,
      posts: posts.nodes,
      cta: global.callToAction,
    }
  };
}