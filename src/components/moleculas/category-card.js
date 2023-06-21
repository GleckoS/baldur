import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"
import Link from "next/link"

export default function Card({ data }) {
  return (
    <Wrapper className="anim">
      <Link href={`/sklep/${data.slug}/`}>
        <div className="image-wrap">
          <Image
            src={data.image.mediaItemUrl}
            alt={`kategoria - ${data.name}`}
            width={'360'}
            height={'270'}
          />
        </div>
        <ButtonFilled className='button' as='div'>
          <span>
            {data.name}
          </span>
        </ButtonFilled>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 360px;


  &:hover{
    img{
      transform: scale(1.07);
    }

    span {
        color: var(--primary-500);
      &::before {
        transform: scaleX(0)
      }
    }
  }

  img{
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-wrap{
    overflow: hidden;
    position: relative;
    width: 360px;
    height: 270px;
    margin-bottom: 20px;
  }

  a{
    display: block;

    span{
      text-transform: uppercase;
    }
  }

  span{
    font-size: clamp(20rem, ${20 / 768 * 100}vw, 28rem);
  }

  @media (max-width: 872px) {
    width: 312px;

    .image, img{
      width: 100%;
      aspect-ratio: 360/270;
      height: auto;
    }

    .button{
      min-width: 312px;
    }
  }

  @media (max-width: 760px) {
    max-width: 360px;
    width: 100%;

    .button{
      min-width: 100%;
    }
  }

  .image, img{
    margin-bottom: 20px;
    border: none;
  }
`

