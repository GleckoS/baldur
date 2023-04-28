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
            quality='100'
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
  margin-top: 270px;
  overflow: hidden;
  .container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => props.minHeight}px;
  .image{
    position: absolute;
    right:   0;
    top: 50%;
    transform: translateY(-50%);
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
    font-size: 30rem;
    font-weight: 500;
  }
`