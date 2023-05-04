import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import Slider from "../organisms/portfolio-slider"

export default function Portfolio({ data: { title, leftText, rightText, secondTitle, background, gallery } }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>{title}</h2>
        <div className="flex">
          <div>
            <div>{HTMLReactParser(leftText)}</div>
          </div>
          <div>
            <div>{HTMLReactParser(rightText)}</div>
          </div>
        </div>
      </div>
      <PortfolioPreview>
        <Image
          className="image"
          src={background.mediaItemUrl}
          alt={background.altText}
          width={background.mediaDetails.width}
          height={background.mediaDetails.height}
        />
        <h2 className="title">{secondTitle}</h2>
      </PortfolioPreview>
      <div className="container">
        <Slider images={gallery} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 100px;

  .flex{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 864px) {
      grid-template-columns: 1fr;
    }
  }

  h2{
    margin-bottom: 45px;
    max-width: 620px;
  }

  p{
    line-height: 180%;
  }
`

const PortfolioPreview = styled.div`
  max-width: 1440px;
  margin: 20px auto 0 auto;
  background: linear-gradient(180deg, #0A0A0A 0%, rgba(0, 0, 0, 0) 65.1%), linear-gradient(180deg, rgba(10, 10, 10, 0.0243902) 16.15%, rgba(10, 10, 10, 0) 23.96%, #0A0A0A 88.02%);
  position: relative;

  .title{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48rem;

    @media (max-width: 480px) {
      margin-bottom: 0;
    }

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${48 / 360 * 100}vw, 48rem);
    }
  }

  .image{
    z-index: -1;
    position: relative;
    width: 100%;
    min-width: fit-content;
    left: 50%;
    transform: translateX(-50%);
    height: fit-content;
    min-height: 300px;
    max-width: 1440px;
  }
`