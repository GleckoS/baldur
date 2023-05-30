import styled from 'styled-components'
import Layout from '../layout'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import HTMLReactParser from 'html-react-parser'

export default function Kontakt({ title, content }) {
  return (
    <Layout breadcrumbs={[{ page: 'Polityka prywatności', url: '/polityka-prywatnosci/' }]}>
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

 *{
    overflow-wrap: break-word;

    @media (max-width: 420px) {
      line-break: loose;
    }
  }

  .wp-block-columns{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin: 40px 0;

    @media (max-width: 840px) {
      grid-template-columns: 1fr;
    }
  }

  .wp-block-table{
    overflow-x: auto;

    @media (max-width: 768px) {
      margin-left: calc(-1 * clamp(24px,calc(40vw / 7.68),40px));
      padding: 0 12px;
      width: 100vw;
    }
  }

  table{
    width: 100%;
    margin-top: 40px;
    border-collapse: collapse;
    border-bottom: 1px solid var(--primary-500);
    @media (max-width: 768px) {
      min-width: 768px;
    }

    *{
      vertical-align: top !important;
      text-align: left;
      font-size: clamp(12rem, ${12 / 840 * 100}vw, 16rem);
    }

    td,th{
      padding: 20px clamp(5px, ${5 / 840 * 100}vw, 15px);
      width: 1%;

      :not(:empty) {
          border-top: 1px solid var(--primary-500);
      }
    }

    thead{
      
      th{
        border: 1px solid var(--primary-500);
      }
    }

  }

  hr{
    margin: 40px 0;
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
    font-size: clamp(24rem, ${40 / 768 * 100}vw, 40rem);
    line-height: 110%;
    letter-spacing: -0.02em;
    font-feature-settings: 'pnum' on, 'onum' on;
    color: #EDE2E2;
    max-width: 840px;
    margin: clamp(48px, ${80 / 768 * 100}vw, 80px) 0  clamp( 24px, ${40 / 768 * 100}vw, 40px) 0;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }
  
  h3{
    font-family: var(--text);
    font-weight: 500;
    font-size: clamp(24rem, ${32 / 768 * 100}vw, 32rem);
    line-height: 110%;
    letter-spacing: -0.02em;
    font-feature-settings: 'pnum' on, 'onum' on;
    color: #EDE2E2;
    max-width: 840px;
    margin: 48px 0 20px 0;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  ul {
    margin: 40px 0;

    &:first-child{
      margin-top: 0;
    }

    &:last-child{
      margin-bottom: 0;
    }

    li{
      margin-left: 40px;
    }
    li+li{
      margin-top: 15px;
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
          seo {
            title
            metaDesc
            opengraphSiteName
            opengraphImage {
              mediaItemUrl
            }
          }
          title
          content
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
      title: page.title,
      content: page.content,
      seo: page.seo
    }
  };
}