import HTMLReactParser from "html-react-parser"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

export default function CallToAction({ data: { ctaText: text, ctaLink: link } }) {
  return (
    <Wrapper>
      <div className="container">
        <div>{HTMLReactParser(text)}</div>
        <ButtonFilled href={link.url}>
          {link.title}
        </ButtonFilled>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: clamp(80px, ${80 / 768 * 100}vw, 150px) 0 0 0;

  .container{
    max-width: 1000px;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;

    @media (max-width: 864px) {
      flex-direction: column;
    }
  }

  p{
    font-size: clamp(20rem, ${20 / 768 * 100}vw, 30rem);
    font-weight: 400;

    @media (max-width: 864px){
      padding: 0 30px;
    }

    @media (max-width: 640px){
      padding: 0;
    }
  }
`