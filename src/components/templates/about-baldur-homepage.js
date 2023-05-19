import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import { RunesY } from "../atoms/rune-b"
import { RunesS } from "../atoms/rune-s"
import { RunesB } from "../atoms/rune-y"

export default function About({ data: { image, title, firstTitle, firstText, secondTitle, secondText } }) {
  return (
    <Wrapper>
      <div className="container">
        <RunesY className="first-rune" />
        <RunesS className="second-rune" />
        <RunesB className="third-rune" />
        <svg xmlns="http://www.w3.org/2000/svg" className="third-rune rune" width="39" height="70" fill="none" viewBox="0 0 39 70"><path fill="#9AACB8" d="M-2.965 11.898c2.514.476 4.18 2.173 6.04 3.522 1.508 1.094 2.853 2.408 4.329 3.55 1.583 1.222 3.226 2.365 4.856 3.523.356.255.77.427 1.3.715.091-.425.243-.723.2-.991-.686-4.256-1.44-8.499-2.081-12.76-.276-1.822-.808-3.624-.429-5.534.138-.698-.246-1.497-.39-2.245.644-.905 1.537-1.282 2.598-1.046.894.196 1.816-.053 2.684.75 1.103 1.016 2.695 1.389 3.675 2.727 1.003 1.371 1.34 2.666.79 4.312-.381 1.143-.641 2.405-.592 3.596.123 3.013 1.245 5.83 2.134 8.763.367-.99.758-1.97 1.093-2.975 1.294-3.87 3.362-7.369 5.523-10.768.957-1.506 2.631-2.643 4.166-3.677 1.794-1.214 4.9.763 5.344 3.136.317 1.71.06 3.093-1.178 4.427-1.304 1.405-2.55 2.933-3.48 4.597-.934 1.67-1.471 3.564-2.129 5.382-1.307 3.629-2.538 7.285-3.885 10.901-.748 2.003-.5 4.078-.685 6.119-.042.436.037 1.02-.211 1.278-1.19 1.257-.83 2.648-.402 3.996.68 2.151 1.52 4.246 2.215 6.39.55 1.707.976 3.454 1.48 5.177.706 2.398 1.523 4.762 2.128 7.184.4 1.6.71 3.273.7 4.916-.013 2.33-1.802 3.175-3.928 2.1-2.507-1.267-4.077-3.292-4.83-5.929-.756-2.66-1.313-5.377-2.046-8.047-1.193-4.342-2.18-8.738-3.852-12.955-.922-2.318-1.296-4.847-1.985-7.265-.204-.712-.516-1.461-.981-2.022-3.311-4.001-7.138-7.45-11.423-10.388-1.64-1.123-2.952-2.724-4.93-3.358-.215-.068-.416-.327-.533-.544-.969-1.802-2.507-3.292-2.802-5.43.486-.357.97-.72 1.517-1.127Zm38.638-4.984c.085-.147.19-.276.237-.428.013-.04-.225-.208-.247-.191-.127.104-.226.244-.335.375l.345.244Z" /></svg>
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