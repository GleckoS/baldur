import Image from "next/image"
import React from "react"
import styled from "styled-components"
import HTMLReactParser from "html-react-parser"

export default function TwoColumnFlex({ data: { image, title, text } }) {
  return (
    <Wrapper>
      <div className="container">
        <Content>
          <h2>{title}</h2>
          <div className="text">
            {HTMLReactParser(text)}
          </div>
        </Content>
        <ImageWrapper width={image.mediaDetails.width} minHeight={image.mediaDetails.height}>
          <ImageBox>
            <Image
              className="image"
              src={image.mediaItemUrl}
              alt={image.altText}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
            />
          </ImageBox>
        </ImageWrapper>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  overflow: hidden;
  padding-bottom: 100px;
  margin-bottom: -100px;

  .rune{
    position: absolute;
    right: 0;
    bottom: -70px;

    @media (max-width: 864px){
      bottom: 50%;
      transform: translateY(100%);
    }

    @media (max-width: 640px) {
      display: none; 
    }
  }

  .container{
    display: grid;
    grid-template-columns: 608px 1fr;
    align-items: center;
    position: relative;

    @media (max-width: 864px) {
      grid-template-columns: 1fr;
    }
  }
`

const Content = styled.div`
  padding-bottom: 11px;
  max-width: 608px;

  .text{
    margin: 30px 0 clamp(40px, ${40 / 768 * 100}vw, 80px);
    display: grid;
    grid-gap: 30px;
  }

  .link-wrap{
    margin-left: 80px;

    @media (max-width: 768px) {
      margin-left: 0;
    }

    .h4{
      @media (max-width: 480px) {
        text-align: center;
      }
    }

    span{
      @media (max-width: 480px) {
        font-size: clamp(0rem, ${25 / 480 * 100}vw, 25rem) !important;
      }
      @media (max-width: 360px) {
        font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem) !important;
      }
    }
  }

  h3{
    margin-bottom: 5px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => props.minHeight}px;
  @media (max-width: 864px){
    min-height: unset;
    width: calc(100% + clamp(48px,calc(80vw / 7.68),80px));
    transform: translateX(calc(-1 * clamp(24px,calc(40vw / 7.68),40px)));
    overflow: hidden;
  }
`

const ImageBox = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1240px) {
    left: -100px;
  }
  @media (max-width: 1024px) {
    left: -200px;
  }
  @media (max-width: 864px){
    position: relative;
    left: unset;
    top: unset;
    transform: unset;
    width: 100%;
    height: fit-content;
    left: 50%;
    transform: translateX(-50%);
    min-width: 520px;
  }

  img{
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 480px) {
      left: 60%;
    }
  }

  &::after{
    content: '';
    inset: -2px;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0) 20.77%, #0A0A0A 100%);
  }
`