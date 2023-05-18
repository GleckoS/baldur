import React from "react"
import styled from "styled-components"
import HTMLReactParser from "html-react-parser"

export default function TwoColumnText({ data: { title, leftText, rightText } }) {
  return (
    <Wrapper>
      <div className="container">
        <h2 className="anim">{title}</h2>
        <div className="flex">
          <div>
            <div className="anim">{HTMLReactParser(leftText)}</div>
          </div>
          <div>
            <div className="anim">{HTMLReactParser(rightText)}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 70px;

  .container{
    position: relative;
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

  p{
    line-height: 180%;
  }
`