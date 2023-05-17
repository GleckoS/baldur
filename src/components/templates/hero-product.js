import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React, { useState } from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

import LightGallery from "lightgallery/react"
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import { useCart } from "react-use-cart"
import { toast } from "react-toastify"


export default function Hero({ data: { stockQuantity = '1', image, galleryImages, name, id, price, regularPrice, salePrice, description = ' ', attributes, slug } }) {
  const { getItem, updateItemQuantity, addItem, inCart } = useCart();

  const [quantity, setQuantity] = useState(1)

  function enforceMinMax({ currentTarget: el }) {
    if (el.value == '0') {
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

  const clickHandler = () => {
    if (inCart(id)) {
      if (getItem(id).quantity !== quantity) {
        updateItemQuantity(id, quantity)
        toast.warn(`${name} ilość w koszyku została zaktualizowana`)
      } else {
        toast.warn(`${name} jest już w koszyku!`)
      }
    } else {
      addItem({ id: slug, price }, quantity)
      toast(`${name} został dodany do koszyka`)
    }
  }

  return (
    <Wrapper>
      <div className="container">
        <LightGallery mode="lg-fade" plugins={[lgZoom]}>
          {image?.mediaItemUrl ? (
            <Image
              src={image.mediaItemUrl}
              alt={image.altText}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
            />
          ) : (
            <img
              src='/placeholder.jpg'
              alt='placeholder image'
            />
          )}
          {galleryImages?.nodes?.map((el, index) => (
            <Image
              key={el.mediaItemUrl + index}
              src={el.mediaItemUrl}
              alt={el.altText}
              width={el.mediaDetails.width}
              height={el.mediaDetails.height}
            />
          ))}
        </LightGallery>
        <h1 className="title">
          {name}
        </h1>
        <div className="content">
          <p className="sub-title">{name}</p>
          <p className="price">{regularPrice}zł</p>
          <p className="small">Najniższa cena z ostatnich 30 dni: {regularPrice}zł</p>
          <div className="text">
            {HTMLReactParser(description)}
          </div>
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
            <ButtonFilled onClick={clickHandler} as='button'>
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

  @media (max-width: 864px){
    padding-top: 20px;
  }

  .sub-title{
    display: none;

    @media (max-width: 864px) {
      display: block;
    }
  }

  .container{
    display: grid;
    grid-template-columns: 714fr 503fr;
    grid-template-rows: auto 1fr;
    gap: 0px 24px;
    grid-template-areas: 
    'images title'
    'images content';

    @media (max-width: 864px) {
      grid-template-columns: auto;
      grid-template-rows: auto auto auto;
      gap: 40px;
      grid-template-areas: 
      'title'
      'images'
      'content';
    }

    .counter{
      display: flex;
      gap: 16px;
      margin-top: 80px;
      position: relative;

      @media (max-width: 864px) {
        width: fit-content;
        margin: 80px auto 0 auto;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        width: 100%;
      }

      .up{
        position: absolute;
        left: 22px;
        top: -12px;
        transform: translateY(-100%);
        background-color: transparent;
        border: none;
        width: fit-content;
        height: fit-content;

        @media (max-width: 480px){
          right: calc(50% - 55px);
          left: unset;
          top: 32px;
          transform: translateY(-50%) translateX(50%) rotateZ(90deg);
          transform-origin: 50% 50%;
        }
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

        @media (max-width: 480px){
          left: calc(50% - 55px);
          top: 32px;
          transform: translateY(-50%) translateX(-50%) rotateZ(90deg);
          transform-origin: 50% 50%;
        }
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

        @media (max-width: 480px){
          width: 63px;
          height: 63px;
          font-size: 32rem;
        }

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

    .lg-react-element {
      grid-area: images;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
      height: fit-content;

      img{
        max-width: 100%;
        height: fit-content;

        &:first-child{
          grid-column: 1 / 3;
        }
      }

      @media (max-width: 420px) {
        grid-template-columns: 1fr;

        img{
          &:first-child{
            grid-column: unset;
          }
        }
      }
    }

    .title{
      grid-area: title;
      font-size: clamp(30rem, ${40 / 768 * 100}vw, 42rem);
      font-weight: 500;
      font-family: var(--text);

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${30 / 360 * 100}vw, 30rem);
      }
    }

    .sub-title{
      font-size: clamp(30rem, ${40 / 768 * 100}vw, 42rem);
      font-weight: 500;
      font-family: var(--text);

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${30 / 360 * 100}vw, 30rem);
      }
    }

    .content{
      grid-area: content;

      button{
        min-width: unset;

        @media (max-width: 480px) {
          width: 100%;
          span{
            font-size: 20rem;
          }
        }
      }

      .text{
        max-width: 505px;
        font-size: clamp(18rem, ${24 / 768 * 100}vw, 24rem);

        @media (max-width: 360px) {
          font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem);
        }
      }

      .price{
        font-size: 40rem;
        font-weight: 500;
        margin: 20px 0 10px 0;

        @media (max-width: 360px) {
          font-size: clamp(0rem, ${40 / 360 * 100}vw, 40rem);
        }
      }

      .small{
        font-size: 16rem;
        margin-bottom: 36px;

        @media (max-width: 360px) {
          font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
        }
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

            @media (max-width: 360px) {
              font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
            }
          }
        }
      }
    }
  }
`