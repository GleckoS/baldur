import styled from 'styled-components'
import Layout from '../layout'

import Hero from '@/components/templates/hero-homepage'
import AboutShop from '@/components/templates/about-shop-homepage'
import Materials from '@/components/templates/materials-homepage'
import About from '@/components/templates/about-baldur-homepage'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import Blog from '@/components/templates/blog-slider'
import Head from 'next/head'

const api = new WooCommerceRestApi({
  url: "https://baldur.headlesshub.com",
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3"
})

export default function Home({ hero, aboutShop, materials, categories, baldur, posts }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Główna</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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
  margin-bottom: -11px;
  padding-bottom: 11px;
`

export async function getStaticProps() {
  const { data: { posts, page: { homepage: page } } } = await client.query({
    query: gql`
      query Homepage {
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
        next: { revalidate: .1 },
      },
    }
  });

  const categoires = await api.get("products/categories")

  return {
    props: {
      hero: page.hero,
      aboutShop: page.aboutShop,
      materials: page.materials,
      categories: categoires.data,
      baldur: page.baldur,
      posts: posts.nodes
    }
  };
}