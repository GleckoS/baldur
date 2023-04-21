import React from "react"
import styled from "styled-components"
import ButtonOutlined from "../atoms/button-outlined"

export default function Hero() {
  return (
    <Wrapper>
      <div className="container">
        <h1>Tu pasja i kunszt łączą
          się każdego dnia</h1>
        <ButtonOutlined href='/sklep/'>
          IDŹ DO SKLEPU
        </ButtonOutlined>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h1{
    max-width: 768px;
    margin: 0 auto;
    text-align: center;
    margin-top: clamp(84px, ${108 / 768 * 100}vw, 200px);
    margin-bottom: clamp(35px, ${50 / 768 * 100}vw, 50px);
  }

  a{
    margin: 0 auto;
  }
`