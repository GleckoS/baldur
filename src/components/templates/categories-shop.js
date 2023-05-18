import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

export default function Categories({ data }) {
  return (
    <Wrapper>
      <div className="container">
        <h2 className="anim">Kategorie</h2>
        <p className="big-text anim">Sprawdź dostępne kategorie produktów. </p>
        <Grid>
          {data.map((category, index) => (
            <ButtonFilled key={category.slug + index} href={`/sklep/${category.slug}`} className="anim">
              {category.name}
            </ButtonFilled>
          ))}
        </Grid>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  margin-top: clamp(50px, ${70 / 768 * 100}vw, 70px);

  h2{
    margin-bottom: 30px;
  }

  a{
    min-width: 282px;
    height: 51px;
    width: fit-content;

    @media (max-width: 340px){
      min-width: 262px;
    }
    span{
      font-size: 20rem;
      text-transform: uppercase;
      clip-path: polygon(0 0,100% 0%,calc(100% - 24px) 100%,0% 100%);

      @media (max-width: 360px) {
        font-size: clamp(0rem , ${20 / 360 * 100}vw,20rem);
      }
    }
  }
`

const Grid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;

  @media (max-width: 480px) {
    justify-content: left;
  }
`