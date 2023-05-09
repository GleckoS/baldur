import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function Hero({ data: { images, name, price, description, attributes } }) {
  return (
    <Wrapper>
      <div className="container">
        <div className="images">
          {images.map(el => {
            return (
              <div className="image">
                <Image src={el.src} width='1000' height='1000' />
              </div>
            )
          })}
        </div>
        <h1 className="title">
          {name}
        </h1>
        <div className="content">
          <span>{price}zł</span>
          <span>Najniższa cena z ostatnich 30 dni: {price}zł</span>
          {HTMLReactParser(description)}
          <div className="attributes">
            {attributes.map(el => {
              return (
                <div className="attribute">
                  <span>{el.slug}</span>
                  <span>{el.options[0]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container{
    display: grid;
    grid-template-columns: 714fr 503fr;
    grid-template-rows: auto 1fr;
    grid-gap: 0px 24px;
    grid-template-areas: 
    'images title'
    'images content';

    .image{
      grid-area: images;
    }

    .title{
      grid-area: title;
    }

    .content{
      grid-area: content;
    }
  }
`