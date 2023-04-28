import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

export default function Card({ data }) {
  return (
    <Wrapper>
      {/* <Image
        className="image"
      /> */}
      <img src={data.image.src}/>
      <ButtonFilled href={`/sklep/${data.slug}/`}>
        {data.name}
      </ButtonFilled>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 360px;

  .image, img{
    margin-bottom: 20px;
    border: none;
  }
`

