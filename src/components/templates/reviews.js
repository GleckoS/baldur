import React from "react"
import styled from "styled-components"
import Slider from "../organisms/reviews-slider"

export default function Reviews({ data: { title, text, reviews } }) {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>{title}</h2>
          <p className="text">{text}</p>
        </div>
        <Slider data={reviews} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: #EDE2E2;
  padding: 70px 0;
  margin-top: clamp(80px, ${120 / 768 * 100}vw, 150px);

  @media (max-width: 1024px) {
    overflow: hidden;
  }

  .container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media(max-width: 1024px){
      grid-template-columns: 1fr;
    }
  }

  h2{
    margin-bottom: 24px;
    color: #0A0A0A;
  } 

  .text{
    color: #0A0A0A;
    font-size: clamp(20rem, ${20 / 768 * 100}vw, 24rem);

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
    }
  }
`
