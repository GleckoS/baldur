import React from "react"
import styled from "styled-components"
import Card from "../moleculas/category-card"

export default function Grid({ categories }) {
  return (
    <Wrapper>
      {categories.map((category, index) => (
        <Card key={index} data={category} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(45px, ${60 / 768 * 100}vw, 60px) 45px;
  margin-top: clamp(70px, ${70 / 768 * 100}vw, 110px);
`