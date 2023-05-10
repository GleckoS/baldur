import React from "react"
import styled from "styled-components"
import Card from "../moleculas/blog-card"

export default function Grid({ posts }) {
  return (
    <Wrapper>
      {posts.map((el, index) => (
        <React.Fragment key={index} >
          <Card data={el} />
          <span className={`line ${(index + 1) % 3 === 0 ? "fourth" : ""} ${(index - 1) % 2 === 0 ? "third" : ""}`} />
        </React.Fragment>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px;
  margin-top: 80px;

  .line{
    border: 2px solid #EEEBEB;
    
    display: none;

    &:last-child{
      display: none !important;
    }

    &.fourth{
      display: block;
      grid-column-start: 1;
      grid-column-end: 4;
    }

    @media (max-width: 1024px) {
      &.fourth{
        display: none;
      }

      &.third{
        display: block;
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }

    @media (max-width: 640px) {
      display: none !important;
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 80px auto 0 auto;
  }
`