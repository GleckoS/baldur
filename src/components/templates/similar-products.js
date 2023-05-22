import React from "react"
import styled from "styled-components"
import Card from "../moleculas/product-card"

export default function SimilarProducts({ data, title = 'Podobne produkty' }) {
  return (
    <Wrapper>
      <div className="container">
        <h2 className="anim">{title}</h2>
        <Grid>
          {data.map((product, index) => (
            <Card data={product} key={index} />
          ))}
        </Grid>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 120px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    .card:nth-child(3){
      display: none;
    }
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`