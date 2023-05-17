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
        <h1 className="anim">{title}</h1>
        <div className="text anim">
          {HTMLReactParser(text)}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  min-height: clamp(300px, ${450 / 768 * 100}vw, 600px);
  h1{
    max-width: 820px;
    margin: 0 auto;
    text-align: center;
    padding-top: clamp(84px, ${108 / 768 * 100}vw, 200px);
    margin-bottom: clamp(35px, ${50 / 768 * 100}vw, 50px);
  }

  .text{
    max-width: 608px;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 419px) {
      display: none;
    }
  }

  a{
    margin: 0 auto;
  }

  .container{
    position: relative;
    z-index: 1;
  }
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;

  .image{
    position: relative;
    left: 50%;
    bottom: 0;
    top: 0;
    transform: translateX(-50%);
    max-height: 100%;  
    width: fit-content;
    min-height: 350px;

    @media (max-width: 419px) {
      min-height: 300px;
    }
}
`