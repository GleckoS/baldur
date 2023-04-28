import React from "react"
import styled from "styled-components"
import HTMLReactParser from "html-react-parser"
import Grid from "../organisms/categories-grid"

export default function Materials({ categories, data: { title, leftTitle, leftText, rightTitle, rightText } }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>{title}</h2>
        <div className="flex">
          <div>
            <h3>{leftTitle}</h3>
            <div>{HTMLReactParser(leftText)}</div>
          </div>
          <div>
            <h3>{rightTitle}</h3>
            <div>{HTMLReactParser(rightText)}</div>
          </div>
        </div>
        <Grid categories={categories} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(0px, ${270 / 1440 * 100}vw, 270px);

  @media (max-width: 864px) {
    margin-top: 0;
  }

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

  h3{
    font-family: var(--text);
    font-size: clamp(24rem, ${30 / 768 * 100}vw, 30rem);
    margin-bottom: 15px;
    font-weight: 500;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }
`