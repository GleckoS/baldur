import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function Card({ data }) {
  return (
    <Wrapper>
      <ImageBox>
        {data.image ? (
          <Image
            src={data.image.url}
            alt={data.image.alt}
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
      <div>
        <p>{data.title}</p>
        <div>
          <span>Ilość sztuk:</span>
          <span>{data.quantity}</span>
        </div>
        <div>
          <button className="remove">x usuń</button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1px 1fr;
  align-items: center;
  gap: 24px;
  padding: 50px 0;

  .line{
    width: 1px;
    height: calc(100% + 100px);
    background-color: var(--primary-500);
  }

  .remove{
    color: var(--secondary-500);
  }
`

const ImageBox = styled.div`
  border: 1px solid var(--primary-500);
  width: 300px;
  aspect-ratio: 3/2;
  box-sizing: content-box;

`