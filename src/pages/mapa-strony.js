import styled from 'styled-components'
import Layout from '../layout'
import Link from 'next/link'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"

export default function Kontakt({ posts, categories }) {
  return (
    <Layout breadcrumbs={[{page: 'Mapa strony', url: '/mapa-strony/'}]}>
      <Wrapper>
        <div className='container'>
          <h1>Mapa strony</h1>
          <Link href='/'>Strona główna</Link>
          <Link href='/'>Sklep</Link>
          {categories.map(({ name, slug }) => (
            <Link key={slug} className='sub' href={`/sklep/${slug}`}>{name}</Link>
          ))}
          <Link href='/'>O Baldur</Link>
          <Link href='/'>Jak wybieramy materiały</Link>
          <Link href='/'>Blog</Link>
          {posts.map(({ uri, title }) => (
            <Link key={title} className='sub' href={`${uri}`}>{title}</Link>
          ))}
          <Link href='/kontakt'>Kontakt</Link>
          <Link href='/koszyk'>Koszyk</Link>
          <Link href='/polityka-prywatnosci'>Polityka prywatności</Link>
          <Link href='/regulamin'>Regulamin</Link>
        </div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  margin-top: 125px;

  *{
    line-height: 110% !important;
  }

  h1{
    font-size: 64rem;
    font-family: var(--text);
    font-weight: 700;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${64 / 360 * 100}vw, 64rem);
    }
  }

  a{
    display: block;
    margin-top: 80px;
    font-weight: 500;
    font-size: 40rem;
    line-height: 165%;
    letter-spacing: -0.02em;
    text-decoration-line: underline;
    font-feature-settings: 'pnum' on, 'onum' on;
    color: #EDE2E2;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${40 / 360 * 100}vw, 40rem);
    }
  }

  .sub{
    margin-top: 40px;
    font-size: 32rem;
    font-weight: 400;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .sub + .sub{
    margin-top: 20px;
  }

`

export async function getServerSideProps() {
  const { data: { productCategories, posts } } = await client.query({
    query: gql`
      query Kontakt {
        productCategories {
          nodes {
            slug
            name
          }
        }
        posts(first: 3) {
          nodes {
            uri
            title
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
    props: {
      posts: posts.nodes,
      categories: productCategories.nodes,
    }
  };
}