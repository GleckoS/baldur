import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

export default function Card({ data }) {
  return (
    <Wrapper>
      <Image
        quality='80'
        src={data.image.src}
        alt={`kategoria - ${data.name}`}
        width={'360'}
        height={'270'}
      />
      <ButtonFilled href={`/sklep/${data.slug}/`}>
        {data.name}
      </ButtonFilled>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 360px;

  a span{
    font-size: clamp(20rem, ${20 / 768 * 100}vw, 28rem);
  }

  @media (max-width: 872px) {
    width: 312px;

    .image, img{
      width: 100%;
    }

    a{
      min-width: 312px;
    }
  }

  @media (max-width: 760px) {
    max-width: 480px;
    width: 100%;

    a{
      min-width: 100%;
    }
  }

  .image, img{
    margin-bottom: 20px;
    border: none;
  }
`

