import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"


export default function Card({ className, index, setTransform = () => { }, data: { title, uri, excerpt, featuredImage: image } }) {
  return (
    <Wrapper className={className}>
      <Link onFocus={() => { setTransform(index) }} href={uri} aria-label={`link do artykułu - ${title}`} />
      <div>
        <div className="image-wrap">
          <Image
            className="image"
            quality='80'
            src={image.node.mediaItemUrl}
            alt={image.node.altText}
            width={image.node.mediaDetails.width}
            height={image.node.mediaDetails.height}
          />
        </div>
        <div className="text">
          <h3>{title}</h3>
          {HTMLReactParser(excerpt)}
        </div>
      </div>
      <ButtonFilled className='button' as='div'>
        <span>
          ZOBACZ WIĘCEJ
        </span>
      </ButtonFilled>
      <Image className="left" src="/left.png" alt="me" width="105" height="114" />
      <Image className="right" src="/right.png" alt="me" width="105" height="114" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #141414;
  position: relative;
  padding-bottom: 60px;
  width: 396px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 480px){
    padding-bottom: 80px;
  }

  .image-wrap{
    width: 100%;
    height: fit-content;
    aspect-ratio: 1.5/1;
    position: relative;
    overflow: hidden;

    .image{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      min-width: 100%;
      min-height: 100%;
      height: auto;
      width: auto;
    }
  }

  @media (max-width: 480px) {
    width: 80vw;
  }

  a{
    color: var(--primary-500);
    display: block;
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  .text{
    padding: 24px 24px 36px 24px;

    @media (max-width: 480px) {
      padding: 24px 15px 36px 15px;
    }
  }

  h3{
    font-size: 24rem;
    font-family: var(--text);
    margin-bottom: 8px;
    font-weight: 500;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  p{
    text-align: left;
    font-size: 20rem;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
    }
  }

  .left{
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .right{
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .button{
    min-width: unset;
    height: 51px;
    width: fit-content;
    max-width: 85%;
    margin: 0 auto;
    span{
      font-size: 20rem;
      clip-path: polygon(0 0,100% 0%,calc(100% - 24px) 100%,0% 100%);

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
      }
    }
  }
`