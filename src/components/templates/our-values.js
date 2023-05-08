import HTMLReactParser from "html-react-parser"
import React from "react"
import styled from "styled-components"

export default function OurValues({ data: { title, text } }) {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>{title}</h2>
          <div>
            {HTMLReactParser(text)}
          </div>
        </div>
        <VideoWrap>
          <video src="/fire.mp4" type="video/mp4" autoPlay loop muted playsInline />
        </VideoWrap>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 100px;

  h2{
    margin-bottom: 30px;
  }
  
  .container{
    display: grid;
    grid-template-columns: 608px 1fr;
    gap: 32px;
    align-items: center;
    position: relative;

    @media (max-width: 1024px) {
      grid-template-columns: 508px 1fr;
    }
    @media (max-width: 864px) {
    padding-top: 60px;
      grid-template-columns: 1fr;
    }

    &::after{
      content: "";
      position: absolute;
      left: clamp(24px,calc(40vw / 7.68),40px);
      top: 0;
      right: clamp(24px,calc(40vw / 7.68),40px);
      height: 2px;
      background-color: #EEEBEB;
    }

    &::before{
      content: "";
      position: absolute;
      left: clamp(24px,calc(40vw / 7.68),40px);
      bottom: 0;
      right: clamp(24px,calc(40vw / 7.68),40px);
      height: 2px;
      background-color: #EEEBEB;
    }
  }
`

const VideoWrap = styled.div`
  position: relative;
  z-index: -1;
  width: fit-content;

  @media (max-width: 1240px) {
    left: -100px;
  }

  @media (max-width: 940px) {
    left: -160px;
  }

  @media (max-width: 864px) {
    margin: -150px auto 0 auto;
    left: auto;
    max-width: 100%;

    video{
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    margin-top: -120px;
    overflow: hidden;

    video{
      min-width: 430px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &::after{
    content: "";
    position: absolute;
    inset: -2px;
    background: radial-gradient(47.65% 50.84% at 50% 50%,rgba(0,0,0,0) 0%,#0A0A0A 100%);
  }
`