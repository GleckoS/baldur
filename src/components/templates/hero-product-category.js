import HTMLReactParser from "html-react-parser"
import React from "react"
import styled from "styled-components"

export default function Hero({ data = ' ' }) {
  return (
    <Wrapper>
      <div className="container">
        <div className="text anim">
          {data && HTMLReactParser(data)}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(50px, ${90 / 768 * 100}vw, 140px);

  .text{
    display: grid;
    gap: 30px;
    max-width: 820px;

   }
`