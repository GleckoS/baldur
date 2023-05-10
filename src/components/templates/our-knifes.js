import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"
import Slider from "../organisms/knifes-slider"

export default function OurKnifes({ data: { title, link, gallery } }) {
  return (
    <Wrapper>
    <Slider items={gallery} />
      <div className="container">
        <div>
          <h2>{title}</h2>
          <ButtonFilled mode="secondary" href={link.url}>
            {link.title}
          </ButtonFilled>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: #EDE2E2;
  padding: 70px 0;
  margin-top: clamp(80px, ${120 / 768 * 100}vw, 150px);

  .container{
    margin-top: 40px;
  }

  h2{
    margin-bottom: 40px;
    color: #0A0A0A;
    text-align: center;
  } 

  a{
    margin: 0 auto;

    &:focus-visible{
      outline-color: var(--dark-500);
    }
  }
`
