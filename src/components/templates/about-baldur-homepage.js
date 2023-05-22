import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import { RunesB } from "../atoms/rune-b"
import { RunesS } from "../atoms/rune-s"
import { RunesY } from "../atoms/rune-y"

export default function About({ data: { image, title, firstTitle, firstText, secondTitle, secondText } }) {
  return (
    <Wrapper>
      <div className="container">
        <RunesB className="first-rune" />
        <RunesS className="second-rune" />
        <RunesY className="third-rune" />
        <ImageWrapper minHeight={image.mediaDetails.height} className="anim animNotTransform">
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
        <Content>
          <h2 className="anim">{title}</h2>
          <h3 className="big-text anim">{firstTitle}</h3>
          <div className="text anim">
            {HTMLReactParser(firstText)}
          </div>
          <h3 className="big-text anim">{secondTitle}</h3>
          <div className="text anim">
            {HTMLReactParser(secondText)}
          </div>
        </Content>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(70px, ${85 / 768 * 100}vw, 250px);
  overflow: hidden;
  padding-bottom: 150px;
  margin-bottom: -150px;

  @media (max-width: 864px) {
    padding-bottom: 0;
    padding-top: calc(clamp(70px, ${85 / 768 * 100}vw, 250px) + 150px);
    margin-top: -150px;
    margin-bottom: calc(-1 * clamp(70px, ${100 / 864 * 100}vw, 100px) - clamp(80px,13.88888888888889vw,200px)) ;
  }

  .first-rune{
    position: absolute;
    left: 20px;
    bottom: -150px;

    @media (max-width: 864px){
      bottom: unset;
      top: -100px;
      left: 60px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .second-rune{
    position: absolute;
    left: 70px;
    bottom: -90px;

    @media (max-width: 864px){
      bottom: unset;
      top: -200px;
      left: 80px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .third-rune{
    position: absolute;
    top: 10px;
    right: 40px;

    @media (max-width: 864px){
      bottom: unset;
      top: 55%;
      right: -10px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .container{
    display: grid;
    grid-template-columns: 1fr 608px;
    gap: 80px;
    align-items: center;
    position: relative;

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
`

const Content = styled.div`
  .text{
    display: grid;
    grid-gap: 30px;
  }

  h3{
    margin-top: 45px;
    margin-bottom: 15px;
  }
`

const ImageBox = styled.div`
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

  img{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    height: fit-content;

  }

  &::after{
    content: '';
    inset: -2px;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0) 20.77%, #0A0A0A 100%);;
  }
`