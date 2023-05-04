import Image from "next/image"
import React, { useState } from "react"
import styled from "styled-components"

export default function Slider({ items }) {
  const [transform, setTransform] = useState(1)
  return (
    <div className="container">
      <Grid className={`slide-${transform}`}>
        {items.map((image, index) => (
          <Image
            key={index}
            className="image"
            src={image.mediaItemUrl}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
          />
        ))}
      </Grid>
      <Control>
        <button disabled={transform <= 0} aria-label={`poprzedni artykuł`} onClick={() => { setTransform(transform <= 0 ? 0 : transform - 1) }} className="arrow">
          <svg width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M21.2419 39.7629C22.2527 38.7248 22.2527 37.0416 21.2419 36.0034L6.24855 20.604L21.2419 5.20456C22.2527 4.16642 22.2527 2.48326 21.2419 1.44511C20.2312 0.406967 18.5924 0.406967 17.5816 1.44511L0.758076 18.7243C-0.252693 19.7624 -0.252693 21.4456 0.758075 22.4837L17.5816 39.7629C18.5924 40.801 20.2312 40.801 21.2419 39.7629Z" fill="#000000" />
          </svg>
        </button>
        <div className="dots">
          {items.map((image, index) => (
            <button aria-label={`przeskroluj do ${index + 1} artykuła`} key={index} onClick={() => { setTransform(index) }} className={index === transform ? 'active' : ''} />
          ))}
        </div>
        <button disabled={transform >= 2} aria-label={`następny artykuł`} onClick={() => { setTransform(transform >= 2 ? 2 : transform + 1) }} className="arrow">
          <svg width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.75808 1.44511C-0.252689 2.48326 -0.252689 4.16642 0.75808 5.20456L15.7514 20.604L0.758077 36.0034C-0.252692 37.0416 -0.252692 38.7248 0.758077 39.7629C1.76884 40.801 3.40763 40.801 4.41839 39.7629L21.2419 22.4837C22.2527 21.4456 22.2527 19.7624 21.2419 18.7243L4.4184 1.44511C3.40763 0.406968 1.76885 0.406968 0.75808 1.44511Z" fill="#000000" />
          </svg>
        </button>
      </Control>
    </div>
  )
}

const Control = styled.div`
  margin-top: 32px;
  display: none;
  gap: 92px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1260px) {
    display: flex;
  }

  @media (max-width: 480px) {
    gap: 12px;
    justify-content: space-between;
  }

  .arrow{
    padding: 10px;
    border: none;
    background-color: transparent;
  }

  .dots{
    display: flex;
    align-items: center;
    gap: 16px;

    button{
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid var(--dark-500);
      transition: background-color .2s ease-out;

      &.active{
        background-color: var(--dark-500);
      }
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  min-width: fit-content;
  width: fit-content;
  max-width: 100%;

  img{
    height: 290px;
    width: fit-content;

    @media (max-width: 480px){
      width: 80vw;
      height: fit-content;
    }
  }

  @media (max-width: 1260px) {
    transform: translateX(0);
    transition: left .2s ease-out, transform .2s ease-out;
    &.slide-0{
      left: 0%;
      transform: translateX(0%);
    }

    &.slide-1{
      left: calc(50vw - clamp(24px,calc(40vw / 7.68),40px));
      transform: translateX(-50%);
    }

    &.slide-2{
      left: calc(100vw - clamp(24px,calc(40vw / 7.68),40px) - clamp(24px,calc(40vw / 7.68),40px));
      transform: translateX(-100%);
    }
  }

  @media (max-width: 480px){
    gap: 12px;
  }
`