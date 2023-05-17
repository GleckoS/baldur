import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function Cooperation({ data: { title, leftText, rightText, image } }) {
  return (
    <Wrapper>
      <div className="container">
        <h2 className="anim">{title}</h2>
        <div className="flex">
          <div>
            <div className="anim">{HTMLReactParser(leftText)}</div>
          </div>
          <div>
            <div className="anim">{HTMLReactParser(rightText)}</div>
          </div>
        </div>
      </div>
      <PortfolioPreview>
        <Image
          className="image anim animNotTransform"
          src={image.mediaItemUrl}
          alt={image.altText}
          width={image.mediaDetails.width}
          height={image.mediaDetails.height}
        />
      </PortfolioPreview>
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

  .container{
    position: relative;
    z-index: 2;
  }
`

const PortfolioPreview = styled.div`
  max-width: 1440px;
  margin: -6% auto 0 auto;
  background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0) 20.77%, #0A0A0A 100%);
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