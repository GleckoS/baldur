import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import HTMLReactParser from 'html-react-parser'
import Image from 'next/image'

export default function Kontakt({ posts, hero: { background, title }, content }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Hero>
          <h1>{title}</h1>
          <Background>
            <Image
              loading="eager"
              className="image"
              src={background.mediaItemUrl}
              alt={background.altText}
              width={background.mediaDetails.width}
              height={background.mediaDetails.height}
              priority={true}
            />
          </Background>
        </Hero>
        <section className='container'>
          {content.paragraph.map((el, index) => (
            <div key={index}>
              <h2>
                § {index + 1}.<br />
                {el.title}
              </h2>
              <div className='text'>
                {HTMLReactParser(el.text)}
              </div>
            </div>
          ))}
        </section>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
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

const Hero = styled.section`
  position: relative;
  h1{
    padding: clamp(50px, ${110 / 768 * 100}vw, 125px) 24px 0 24px;
    text-align: center;
    max-width: 820px;
    margin: 0 auto;
  }
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  max-width: 1440px;
  width: 100vw;


  .image{
    position: relative;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    min-width: fit-content;
    width: 100%;
  }

  &::after{
    content: '';
    inset: 0;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0.57) 0%, #0A0A0A 89.06%);

  }
`

export async function getServerSideProps() {
  const { data: { posts, page: { regulamin: page } } } = await client.query({
    query: gql`
      query Kontakt {
        page(id: "cG9zdDozMDg=") {
          regulamin {
            heroReg {
              title
              background {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            contntReg {
              paragraph {
                title
                text
              }
            }
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
      hero: page.heroReg,
      content: page.contntReg
    }
  };
}