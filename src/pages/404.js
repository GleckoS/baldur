import Head from "next/head"
import Error from "@/components/templates/error"
import Layout from "../layout"

export default function Category({ posts, reviews, cta }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strony nie znaleziono</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main>
        <Error />
      </main>
    </Layout>
  )
}