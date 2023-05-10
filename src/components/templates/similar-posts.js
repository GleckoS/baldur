import React from "react"
import styled from "styled-components"
import Slider from "../organisms/posts-slider"

export default function SimilarPosts({ data }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>ZOBACZ INNE POSTY!</h2>
        <Slider posts={data} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 200px;
  overflow: hidden;

  h2{
    font-family: var(--text);
    font-style: italic;
    font-weight: 500;
    font-size: 36px;
    letter-spacing: 0.05em;
    margin-bottom: 30px;
  }
`