import React from "react"
import styled from "styled-components"
import HTMLReactParser from "html-react-parser"
import Grid from "../organisms/categories-grid"

export default function Materials({ categories, data: { title, text } }) {
  return (
    <Wrapper>
      <div className="container">
        <h2 className="anim">{title}</h2>
        <div className="text anim">
          {HTMLReactParser(text)}
        </div>
        <Grid categories={categories} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(0px, ${270 / 1440 * 100}vw, 270px);

  .container{
    position: relative;
  }

  h2{
    margin-bottom: 30px;
    max-width: 620px;
  }

  .text{
    max-width: 820px;
    line-height: 180%;
  }

  .grid{
    margin-top: 50px;
  }
`