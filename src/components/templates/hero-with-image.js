import React from "react"
import styled from "styled-components"
import Image from "next/image"
import HTMLReactParser from "html-react-parser"

export default function Hero({ data: { title, text, background } }) {
  return (
    <Wrapper>
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
      <div className="container">
        <h1>{title}</h1>
        <div className="text">{HTMLReactParser(text)}</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  height: clamp(300px, ${500 / 768 * 100}vw, 800px);
  
  h1{
    text-align: center;
    margin-bottom: 20px;
    font-size: clamp(32rem, ${40 / 768 * 100}vw, 64rem);

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .text{
    text-align: center;
    max-width: 607px;
    margin: 0 auto;
    margin-bottom: 80px;

    *{
      
      font-size: 20rem;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
      }
    }

    @media (max-width: 480px) {
      text-align: center;
      margin-bottom: unset;
    }
  }

  .container{
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  @media (max-width: 480px) {
    bottom: unset;
    height: 300px;
  }

  .image{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-height: 100%;
    width: fit-content;
  }

  &::after{
    content: '';
    inset: 0;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0.57) 0%, #0A0A0A 89.06%);

  }
`