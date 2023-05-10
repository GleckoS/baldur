import React from "react"
import styled from "styled-components"
import Grid from "../organisms/blog-grid"
import Image from "next/image"
import Pagination from "../organisms/pagination"

export default function Archive({ currPage, urlBasis, background, category, posts }) {
  return (
    <Wrapper>
      <Background width={background.mediaDetails.width}>
        <Image
          loading="eager"
          className="image"
          src={background.mediaItemUrl}
          alt={background.altText}
          width={background.mediaDetails.width}
          height={background.mediaDetails.height}
        />
      </Background>
      <div className="container">
        <h1>{category}</h1>
        <Grid posts={posts.nodes} />
        <Pagination currentPage={Number(currPage)} itemCount={posts.pageInfo.offsetPagination.total} urlBasis={urlBasis} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-top: 300px;
  position: relative;

  @media (max-width: 768px){
    padding-top: 200px;
  }

  h1{
    text-transform: capitalize;
    font-size: clamp(32rem, ${64 / 768 * 100}vw, 64rem);

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  .flex{
    margin-top: 15px;
    display: flex;
    gap: 75px;

    @media (max-width: 480px){
      gap: 24px;
      flex-wrap: wrap;
    }

    a{
      font-weight: 500;
      font-size: clamp(20rem, ${36 / 768 * 100}vw, 36rem);
      line-height: 149%;
      letter-spacing: 0.02em;
      text-decoration-line: underline;
      color: #CCC4C4;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
      }
    }

    .line{
      display: block;
      width: 3px;
      background-color: #EEEBEB;
      margin: 5px 0;

      &:last-child{
        display: none;
      }

      @media (max-width: 640px) {
        display: none;
      }
    }
  }
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  overflow: hidden;
  transform: translateX(-50%);
  max-width: ${props => props.width}px;

  @media (max-width: 480px) {
    bottom: unset;
    height: 300px;
    min-width: 120vw;
  }

  .image{
    position: relative;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-height: 100%;
    width: 150vw;
    max-width: inherit;
    height: auto;

    @media (max-width: 768px) {
      height: fit-content;
    }
    @media (max-width: 480px) {
      height: 100%;
      width: auto;
    }
  }

  &::after{
    content: '';
    inset: -2px;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0.57) 0%, #0A0A0A 89.06%);

    @media (max-width: 480px){
      background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0.17) 0%, #0A0A0A 89.06%);;
    }
  }
`