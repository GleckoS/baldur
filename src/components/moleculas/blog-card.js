import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"


export default function Card({ data: { title, uri, excerpt, featuredImage: image } }) {
  return (
    <Wrapper>
      <Link href={uri} aria-label={`link do artykułu - ${title}`}/>
        <Image
          className="image"
          quality='100'
          src={image.node.mediaItemUrl}
          alt={image.node.altText}
          width={image.node.mediaDetails.width}
          height={image.node.mediaDetails.height}
        />
        <div className="text">
          <h3>{title}</h3>
          {HTMLReactParser(excerpt)}
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

  a{
    color: var(--primary-500);
    display: block;
    position: absolute;
    inset: 0;
  }

  .text{
    padding: 24px 24px 36px 24px;
  }

  h3{
    font-size: 24rem;
    font-family: var(--text);
    margin-bottom: 8px;
    font-weight: 500;
  }

  p{
    text-align: left;
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
    margin: 0 auto ;
    span{
      font-size: 20rem;
      clip-path: polygon(0 0,100% 0%,calc(100% - 24px) 100%,0% 100%);
    }
  }
`