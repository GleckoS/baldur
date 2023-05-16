import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function Description({ data: { repeater } }) {
  return (
    <Wrapper>
      <div className="container">
        {repeater?.map((el, image) => (
          <div className="flex" key={image}>
            <div className="text">
              {HTMLReactParser(el.text)}
            </div>
            {el.image && (
              <Image
                src={el.image.mediaItemUrl}
                alt={el.image.altText}
                width={el.image.mediaDetails.width}
                height={el.image.mediaDetails.height}
              />
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 120px;

  .container > * {
    margin-top: 20px;
    @media (max-width: 1024px) {
      margin-top: clamp(50px, ${80 / 768 * 100}vw, 80px);
    }
  }

  .flex{
    display: flex;
    gap: clamp(50px, ${128 / 1440 * 100}vw, 128px);
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: 1120px) {
      gap: 50px;
    }

    @media (max-width: 1024px) {
      flex-direction: column;
      max-width: 768px;
      gap: 40px;

      img{
        width: 100%;
        height: fit-content;
      }
    }

    h2{
      margin-bottom: 45px;
    }

    h3{
      font-weight: 500;
      font-family: var(--text);
      font-size: clamp(24rem, ${30 / 768 * 100}vw, 30rem);
      margin-bottom: 20px;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
      }
    }
  }
`