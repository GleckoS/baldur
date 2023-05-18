import styled from 'styled-components'
import Layout from '../layout'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import HTMLReactParser from 'html-react-parser'

export default function Kontakt({ title, content }) {
  return (
    <Layout breadcrumbs={[{page: 'Polityka prywatności', url: '/polityka-prywatnosci/'}]}>
      <Wrapper>
        <div className='container'>
          <h1>{title}</h1>
          <div>{HTMLReactParser(content)} </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`

  .wp-block-columns{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  tbody tr{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  h1{
    padding: clamp(50px, ${110 / 768 * 100}vw, 125px) 24px 0 24px;
    text-align: center;
    max-width: 820px;
    margin: 0 auto;
  }
  h2{
    font-family: var(--text);
    font-weight: 500;
    font-size: clamp(32rem, ${40 / 768 * 100}vw, 40rem);
    line-height: 110%;
    letter-spacing: -0.02em;
    font-feature-settings: 'pnum' on, 'onum' on;
    color: #EDE2E2;
    max-width: 840px;
    margin: 80px 0 40px 0;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .text{
    columns: 2;
    column-gap: 24px;

    @media (max-width: 840px) {
      columns: 1;
    }

    *{
      font-weight: 400;
      font-size: clamp(18rem, ${24 / 768 * 100}vw, 24rem);
      line-height: 138%;
      letter-spacing: -0.02em;
      font-feature-settings: 'pnum' on, 'onum' on;
      color: #EDE2E2;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem);
      }
    }

    ol li{
      list-style: inside decimal;

      ol{
        margin: 40px 0;

        li{
        list-style: inside lower-latin;
        }
      }
    }

    li+li{
      margin-top: 24px;
    }

    a{
      text-decoration: underline;
      word-break: break-all;
      color: #EDE2E2;
    }
  }
`

export async function getServerSideProps() {
  const { data: { page } } = await client.query({
    query: gql`
      query Kontakt {
        page(id: "cG9zdDozMDY=") {
          title
          content
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
      title: page.title,
      content: page.content
    }
  };
}