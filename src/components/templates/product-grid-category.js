import React from "react"
import styled from "styled-components"
import Card from "../moleculas/product-card"

export default function ProductGrid({ data }) {
  return (
    <Wrapper>
      <div className="container">
        {data.map((product, index) => (
          <div className="row" key={index}>
            <Card key={index} data={product} />
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(60px, ${80 / 768 * 100}vw, 110px);
`