import Link from "next/link"
import React from "react"
import styled from "styled-components"
import Grid from "../organisms/blog-grid"

export default function Archive({ categories, posts }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>Kategorie</h2>
        <div className="flex">
          {categories.map(({ name, slug, count }) => (
            <>
              <Link key={slug} href={`/blog/${slug}`}>{name} ({count ? count : 0})</Link>
              <span className="line" />
            </>
          ))}
        </div>
        <Grid posts={posts}/>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
margin-top: 10px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
  @media (max-width: 480px) {
    margin-top: 80px;
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