import Image from "next/image"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

export default function Slider({ images }) {
  const [current, setCurrent] = useState(0)

  return (
    <Wrapper>
      <button aria-label={`poprzednie zdjęcie`} onClick={() => { setCurrent(current <= 0 ? images.length - 1 : current - 1) }} className="left">
        <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.9487 28.9535C16.6838 28.1985 16.6838 26.9744 15.9487 26.2194L5.0444 15.0198L15.9487 3.82018C16.6838 3.06517 16.6838 1.84105 15.9487 1.08604C15.2136 0.331022 14.0217 0.331022 13.2866 1.08604L1.05133 13.6527C0.316224 14.4077 0.316224 15.6318 1.05133 16.3868L13.2866 28.9535C14.0217 29.7085 15.2136 29.7085 15.9487 28.9535Z" fill="#EDE2E2" />
        </svg>
      </button>
      <button aria-label={`następne zdjęcie`} onClick={() => { setCurrent(current >= images.length - 1 ? 0 : current + 1) }} className="right">
        <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1.05133 1.08604C0.316226 1.84105 0.316226 3.06517 1.05133 3.82018L11.9556 15.0198L1.05133 26.2194C0.316224 26.9744 0.316224 28.1985 1.05133 28.9535C1.78643 29.7085 2.97827 29.7085 3.71338 28.9535L15.9487 16.3868C16.6838 15.6318 16.6838 14.4077 15.9487 13.6527L3.71338 1.08604C2.97828 0.331022 1.78643 0.331022 1.05133 1.08604Z" fill="#EDE2E2" />
        </svg>
      </button>
      <BigImages>
        {images.map((image, index) => (
          <ImageWrapper key={index} display={current === index ? 'block' : 'none'} >
            <Image
              quality={100}
              src={image.mediaItemUrl}
              alt={image.altText}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
            />
          </ImageWrapper>
        ))}
      </BigImages>
      <SmallImages >
        {images.map((image, index) => (
          <ImageWrapper onClick={() => { setCurrent(index) }} key={index} display={current === index ? 'none' : 'block'} >
            <Image
              src={image.mediaItemUrl}
              alt={image.altText}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
            />
          </ImageWrapper>
        ))}
      </SmallImages>
      <Buttons>
        {images.map((image, index) => (
          <button className={current === index ? "active dot" : "dot"} key={index} onClick={() => { setCurrent(index) }}></button>
        ))}
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: clamp(40px, ${80 / 768 * 100}vw, 120px);
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 210px;
  position: relative;

  .left{
    background-color: transparent;
    border: none;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 1024px) {
      top: 300px;
    }

    @media (max-width: 768px) {
      top: 200px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .right{
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 1024px) {
      top: 300px;
    }

    @media (max-width: 768px) {
      top: 200px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  } 

`

const BigImages = styled.div`
  width: fit-content;
  margin: 0 auto;
  img{
    margin: 0 46px;
    max-width: calc(100% - 92px);
    height: fit-content;
    display: ${props => props.current !== props.index ? "none" : "block"};

    @media (max-width: 640px) {
      margin: 0;
      max-width: calc(100% + clamp(24px,calc(40vw / 7.68),40px) + clamp(24px,calc(40vw / 7.68),40px));
      margin-left: calc(-1 * clamp(24px,calc(40vw / 7.68),40px));
    }
  }
`

const SmallImages = styled.div`
  display: flex;
  gap: 25px;
  margin: -92px 0 0 0;
  width: max-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  img{
    height: 210px;
    width: fit-content;

    @media (max-width: 480px) {
      height: 150px;
    }

    @media (max-width: 360px) {
      height: clamp(130px, ${150 / 360 * 100}vw, 150px);
    }
  }

  @media (max-width: 1240px) {
    margin-top: 40px;
  }
`

const ImageWrapper = styled.div`
  display: ${props => props.display};
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center ;
  gap: 16px;
  margin-top: 32px;

  .dot{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid var(--primary-500);
    transition: background-color .2s ease-out;

    &.active{
      background-color: var(--primary-500);
    }
  }
`