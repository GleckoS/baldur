import React from "react"
import styled from "styled-components"
import { Gutenberg } from "../organisms/gutenberg-wrapper"
import Navigation from "../organisms/post-navigation"
import HTMLReactParser from "html-react-parser"

export default function Content({ data }) {
  return (
    <Wrapper>
      <div className="container">
        <Navigation />
        <Gutenberg >{HTMLReactParser(data)}</Gutenberg>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container{
    display: grid;
    grid-template-columns: 352px 1fr;
    gap: 40px;
  }
`