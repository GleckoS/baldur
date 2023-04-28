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
  margin-top: 270px;
  .flex{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  h2{
    margin-bottom: 45px;
    max-width: 620px;
  }

  h3{
    font-family: var(--text);
    font-size: 30rem;
    margin-bottom: 15px;
    font-weight: 500;
  }
`