import React from "react"
import styled from "styled-components"
import ButtonOutlined from "../atoms/button-outlined"
import Image from "next/image"

export default function Hero({ data: { title, link, background } }) {
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
        />
      </Background>
      <div className="container">
        <h1>{title}</h1>
        <ButtonOutlined href={link.url}>
          {link.title}
        </ButtonOutlined>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  height: 60vw;
  max-height: 850px;
  min-height: 360px;
  h1{
    max-width: 768px;
    margin: 0 auto;
    text-align: center;
    padding-top: clamp(84px, ${108 / 768 * 100}vw, 200px);
    margin-bottom: clamp(35px, ${50 / 768 * 100}vw, 50px);
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
  overflow: hidden;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .image{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;  
    height: fit-content;
    min-width: 640px;

    @media (max-width: 360px) {
      min-width: 500px;
    }
}
`