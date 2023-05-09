import Layout from "../../../layout"
import styled from "styled-components"
import Head from "next/head"

import Hero from "@/components/templates/hero-product"

import client from "../../../apollo/apollo-client"
import { gql } from "@apollo/client"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

const api = new WooCommerceRestApi({
  url: "https://baldur.headlesshub.com",
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3"
})

export default function Post({ cta, data }) {
  debugger
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero data={data} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`

`

export async function getStaticPaths() {

  const products = await api.get("products")

  const paths = products.data.map(el => {
    return {
      params: {
        category: el.categories[0].slug,
        slug: el.slug,
      }
    }
  })

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps(context) {

  const { data: { global } } = await client.query({
    query: gql`
      query Product {
        global : page(id: "cG9zdDoyOQ==") {
          callToAction{
            ctaText
            ctaLink{
              title
              url
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

  const products = await api.get("products", { slug: context.params.slug })
  const attributes = await api.get("products/attributes")

  const data = {
    ...products.data[0],
    attributes: products.data[0].attributes.map(el => {
      let attribute = el

      attributes.data.every(attr => {
        if (attr.id === el.id) {
          attribute = {
            options: attribute.options,
            ...attr
          }
          return false
        }
        return true
      })

      return {
        ...attribute,
        slug: attribute.slug.replace(/pa_/, '') + '.'
      }
    })
  }

  return {
    props: {
      data: data,
      cta: global.callToAction
    }
  }
}