import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function About({ data: { image, title, firstTitle, firstText, secondTitle, secondText } }) {
  return (
    <Wrapper>
      <div className="container">
        <ImageWrapper minHeight={image.mediaDetails.height}>
          <Image
            className="image"
            src={image.mediaItemUrl}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
          />
        </ImageWrapper>
        <Content>
          <h2>{title}</h2>
          <h3>{firstTitle}</h3>
          <div className="text">
            {HTMLReactParser(firstText)}
          </div>
          <h3>{secondTitle}</h3>
          <div className="text">
            {HTMLReactParser(secondText)}
          </div>
        </Content>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(70px, ${85/768*100}vw, 250px);
  overflow: hidden;
  .container{
    display: grid;
    grid-template-columns: 1fr 608px;
    gap: 80px;
    align-items: center;

    @media (max-width: 1240px) {
        gap: 0;
    }

    @media (max-width: 864px){
      display: flex;
      flex-direction: column-reverse;
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => props.minHeight}px;

  @media (max-width: 864px){
    min-height: unset;
    width: 100%;
  }

  .image{
    position: absolute;
    right:   0;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 1240px) {
      right: -100px;
      z-index: -1;
    }
    @media (max-width: 1024px) {
      right: -200px;
    }
    @media (max-width: 864px){
      position: relative;
      left: unset;
      top: unset;
      transform: unset;

      height: fit-content;
      left: 50%;
      transform: translateX(-50%);
      min-width: 520px;

      max-width: 768px;
      width: 100%;
    }
  }
`

const Content = styled.div`
  .text{
    display: grid;
    grid-gap: 30px;
  }

  h3{
    margin-top: 45px;
    margin-bottom: 15px;
    font-family: var(--text);
    font-weight: 500;
    font-size: clamp(24rem, ${30 / 768 * 100}vw, 30rem);

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }
`