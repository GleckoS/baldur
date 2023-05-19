import Image from "next/image"
import Link from "next/link"
import React from "react"
import { toast } from "react-toastify"
import styled from "styled-components"

export default function Card({ removeItem, updateItemQuantity, data }) {

  const removeHandler = () => {
    removeItem(data.slug)
    toast(`Usunięto ${data.name} z koszyka`)
  }

  return (
    <Wrapper>
      <ImageBox href={data.uri}>
        {data.image ? (
          <Image
            src={data.image.mediaItemUrl}
            alt={data.image.altText}
            width={300}
            height={200}
          />
        ) : (
          <Image
            src="/placeholder.jpg"
            alt="placeholder"
            width={300}
            height={200}
          />
        )}
      </ImageBox>
      <span className="line" />
      <div className="content">
        <p className="title">{data.name}</p>
        <div className="price">
          {data.salePrice && <span className="discount">{data.salePrice}zł</span>}
          <span className={data.salePrice ? 'discounted regular' : 'regular'}>{data.regularPrice}zł</span>
        </div>
        <div className="flex">
          <span className="counter-title">Ilość sztuk:</span>
          <div className="control">
            <button disabled={data.quantity <= 1} onClick={() => { updateItemQuantity(data.slug, data.quantity <= 1 ? 1 : data.quantity - 1) }}>
              <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.2 0.5H1.8C0.804375 0.5 0 1.30437 0 2.3V43.7C0 44.6956 0.804375 45.5 1.8 45.5H43.2C44.1956 45.5 45 44.6956 45 43.7V2.3C45 1.30437 44.1956 0.5 43.2 0.5ZM33.3 24.35C33.3 24.5975 33.0975 24.8 32.85 24.8H12.15C11.9025 24.8 11.7 24.5975 11.7 24.35V21.65C11.7 21.4025 11.9025 21.2 12.15 21.2H32.85C33.0975 21.2 33.3 21.4025 33.3 21.65V24.35Z" fill="#EDE2E2" />
              </svg>
            </button>
            {data.quantity}
            <button disabled={data.quantity >= data.stockQuantity} onClick={() => { updateItemQuantity(data.slug, data.quantity >= data.stockQuantity ? data.stockQuantity : data.quantity + 1) }}>
              <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.2 0.5H1.8C0.804375 0.5 0 1.30437 0 2.3V43.7C0 44.6956 0.804375 45.5 1.8 45.5H43.2C44.1956 45.5 45 44.6956 45 43.7V2.3C45 1.30437 44.1956 0.5 43.2 0.5ZM33.3 24.35C33.3 24.5975 33.0975 24.8 32.85 24.8H24.3V33.35C24.3 33.5975 24.0975 33.8 23.85 33.8H21.15C20.9025 33.8 20.7 33.5975 20.7 33.35V24.8H12.15C11.9025 24.8 11.7 24.5975 11.7 24.35V21.65C11.7 21.4025 11.9025 21.2 12.15 21.2H20.7V12.65C20.7 12.4025 20.9025 12.2 21.15 12.2H23.85C24.0975 12.2 24.3 12.4025 24.3 12.65V21.2H32.85C33.0975 21.2 33.3 21.4025 33.3 21.65V24.35Z" fill="#EDE2E2" />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <button className="remove" onClick={removeHandler}>x usuń</button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1px 1fr;
  align-items: center;
  gap: 16px;
  padding: 50px 0;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1px 1fr;
    max-width: 300px;
    margin: 0 auto;
  }

  .content{
  }

  .line{
    width: 1px;
    height: calc(100% + 100px);
    background-color: var(--primary-500);

    @media (max-width: 720px) {
      width: 100%;
      height: 1px;
    }
  }

  .remove{
    color: var(--secondary-500);
    border: none;
    background-color: transparent;
  }

  .title{
    font-size: 40rem;
    font-weight: 500;
    margin-bottom: 20px;
    @media (max-width: 720px) {
      text-align: center;
      
      font-size: clamp(0rem, ${40 / 360 * 100}vw, 40rem);
    }
  }

  .price{
    display: flex;
    gap: 20px;

    @media (max-width: 720px) {
      justify-content: center;
    }
  }

  .counter-title{
    font-size: 32rem;

    @media (max-width: 360px){
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .flex{
    display: flex;
    align-items: center;
    gap: 40px;
    margin-top: 25px;
    margin-bottom: 40px;

    @media (max-width: 720px){
      flex-direction: column;
      gap: 25px;
    }

    &.gap{
      flex-direction: row-reverse;
      justify-content: space-between;
    }

    button{
      width: 45px;
      height: 45px;
      border: none;
      background-color: transparent;
    }

    .control{
      display: grid;
      grid-template-columns: 45px 50px 45px;
      align-items: center;
      text-align: center;

      

      button{
        cursor: pointer;
        transition: opacity .2s ease-out;
        opacity: 0.8;
        &:hover{
          opacity: 1;
        }
        &:disabled{
          opacity: 0.2;
          cursor: default;
        }
      }
    }
  }

  .discount{
    display: block;
    font-size: 32rem;

    @media (max-width: 360px){
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .regular{
    font-size: 32rem;
    display: block;
    &.discounted{
      text-decoration: var(--error-500) solid 3px line-through; 
    }

    @media (max-width: 360px){
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }
`

const ImageBox = styled(Link)`
  display: block;
  border: 1px solid var(--primary-500);
  width: 300px;
  aspect-ratio: 3/2;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;

  
  @media (max-width: 720px){
    max-width: 300px;
    width: 100%;
  }

  img{
    position: absolute;
    object-fit: cover;
    inset: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    max-width: none;
  }

`