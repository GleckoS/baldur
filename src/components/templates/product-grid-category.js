import React from "react"
import styled from "styled-components"

export default function ProductGrid({ data }) {
  return (
    <Wrapper>
      <div className="container">

      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(60px, ${80 / 768 * 100}vw, 110px);
`