import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonOutlined from "../atoms/button-outlined"
import HTMLReactParser from "html-react-parser"

export default function About({ data: { link, image, title, text, linkTitle } }) {
  return (
    <Wrapper>
      <div className="container">
        <Content>
          <h2>{title}</h2>
          <div className="text">
            {HTMLReactParser(text)}
          </div>
          <div className="link-wrap">
            <h3 className="h4">{linkTitle}</h3>
            <ButtonOutlined href={link.url}>
              {link.title}
            </ButtonOutlined>
          </div>
        </Content>
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
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  overflow: hidden;
  .container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`

const Content = styled.div`
  padding-bottom: 11px;

  .text{
    margin: 30px 0 80px;
    display: grid;
    grid-gap: 30px;
  }

  .link-wrap{
    margin-left: 80px;
  }

  h3{
    margin-bottom: 5px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => props.minHeight}px;
  .image{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`