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
  height: clamp(300px, ${500 / 768 * 100}vw, 600px);

  @media (max-width: 420px){
    height: auto;
  }

  .container{
    max-width: 1094px;
    box-sizing: content-box;
  }
  
  h1{
    margin-bottom: 20px;
    font-size: clamp(32rem, ${40 / 768 * 100}vw, 64rem);

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .text{
    max-width: 607px;
    margin-bottom: clamp(40px, ${60 / 768 * 100}vw, 80px);

    *{
      font-size: 20rem;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
      }
    }
  }

  .container{
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  max-width: fit-content;
  width: 100vw;

  @media (max-width: 480px) {
    bottom: unset;
    height: 300px;
  }

  @media (max-width: 420px) {
    position: relative;
  }

  .image{
    position: relative;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    max-height: fit-content;
    width: fit-content;
    max-width: 1440px;
  }

  &::after{
    content: '';
    inset: -2px;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0.27) 0%, #0A0A0A 89.06%);
  }
`