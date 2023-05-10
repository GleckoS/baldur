import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React, { useState } from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

export default function Hero({ data: { stockQuantity = '1', image, galleryImages, name, regularPrice, salePrice, description, attributes } }) {

  const [quantity, setQuantity] = useState(1)

  function enforceMinMax({ currentTarget: el }) {
    if (el.value == '0') {
      // setQuantity(el.value - 10)
    } else if (el.value != "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        setQuantity(el.min)
      } else if (parseInt(el.value) > parseInt(el.max)) {
        setQuantity(el.max)
      } else {
        setQuantity(el.value)
      }

    } else {
      setQuantity(el.value)
    }
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="images">
          <Image
            src={image.mediaItemUrl}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
          />

          {galleryImages.nodes.map((el, index) => {
            return (
              <Image
                key={el.mediaItemUrl + index}
                src={el.mediaItemUrl}
                alt={el.altText}
                width={el.mediaDetails.width}
                height={el.mediaDetails.height}
              />
            )
          })}
        </div>
        <h1 className="title">
          {name}
        </h1>
        <div className="content">
          <p className="price">{regularPrice}zł</p>
          <p className="small">Najniższa cena z ostatnich 30 dni: {regularPrice}zł</p>
          {HTMLReactParser(description)}
          <div className="attributes">
            {attributes.nodes.map(el => {
              if (el.slug === 'pa_mdl') return null
              return (
                <div key={el.slug} className="attribute">
                  <span className="name">{el.slug.replace(/pa_/, '') + '.'}</span>
                  <span className="value">{el.terms.nodes[0].name}</span>
                </div>
              )
            })}
          </div>
          <div className="counter">
            <button onClick={() => { setQuantity(quantity >= stockQuantity ? stockQuantity : quantity + 1) }} className="up">
              <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.06626 15.4487C1.82127 16.1838 3.04539 16.1838 3.80041 15.4487L15 4.5444L26.1996 15.4487C26.9546 16.1838 28.1787 16.1838 28.9337 15.4487C29.6888 14.7136 29.6888 13.5217 28.9337 12.7866L16.3671 0.551329C15.6121 -0.183775 14.3879 -0.183775 13.6329 0.551328L1.06626 12.7866C0.311247 13.5217 0.311247 14.7136 1.06626 15.4487Z" fill="#EDE2E2" />
              </svg>
            </button>
            <button onClick={() => { setQuantity(quantity <= 1 ? 1 : quantity - 1) }} className="down">
              <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M28.9337 0.551331C28.1787 -0.183774 26.9546 -0.183774 26.1996 0.55133L15 11.4556L3.80041 0.551328C3.04539 -0.183777 1.82127 -0.183777 1.06626 0.551327C0.311247 1.28643 0.311247 2.47827 1.06626 3.21338L13.6329 15.4487C14.3879 16.1838 15.6121 16.1838 16.3671 15.4487L28.9337 3.21338C29.6888 2.47828 29.6888 1.28643 28.9337 0.551331Z" fill="#EDE2E2" />
              </svg>
            </button>
            <input onBlur={() => { setQuantity(quantity === '' ? '1' : quantity) }} value={quantity} onChange={el => { enforceMinMax(el) }} type="number" min='1' max={stockQuantity} />
            <ButtonFilled as='button'>
              <span>
                Dodaj do koszyka
              </span>
            </ButtonFilled>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-top: clamp(100px, ${120 / 768 * 100}vw, 140px);
  .container{
    display: grid;
    grid-template-columns: 714fr 503fr;
    grid-template-rows: auto 1fr;
    grid-gap: 0px 24px;
    grid-template-areas: 
    'images title'
    'images content';

    .counter{
      display: flex;
      gap: 16px;
      margin-top: 80px;
      position: relative;
      .up{
        position: absolute;
        left: 22px;
        top: -12px;
        transform: translateY(-100%);
        background-color: transparent;
        border: none;
        width: fit-content;
        height: fit-content;
      }
      .down{
        position: absolute;
        left: 22px;
        bottom: -12px;
        transform: translateY(100%);
        background-color: transparent;
        border: none;
        width: fit-content;
        height: fit-content;
      }
      input{
        width: 72px;
        height: 72px;
        border: none;
        background-color: var(--primary-500);
        display: flex;
        text-align: center;
        color: var(--dark-500);
        font-size: 40rem;
        font-weight: 500;

        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type=number] {
          -moz-appearance: textfield;
        }
      }
    }

    .images{
      grid-area: images;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;

      img{
        max-width: 100%;
        height: fit-content;

        &:first-child{
          grid-column: 1 / 3;
        }
      }
    }

    .title{
      grid-area: title;
      font-size: 48rem;
      font-weight: 500;
      font-family: var(--text);
    }

    .content{
      grid-area: content;

      .price{
        font-size: 40rem;
        font-weight: 500;
        margin: 20px 0 10px 0;
      }

      .small{
        font-size: 16rem;
        margin-bottom: 36px;
      }

      .attributes{
        margin-top: 50px;
        display: grid;
        gap: 30px;
        
        .attribute{
          display: flex;
          gap: 16px;

          .name{
            font-family: var(--title);
            text-transform: uppercase;
            font-size: 24rem;
            min-width: 75px;
          }
        }
      }
    }
  }
`