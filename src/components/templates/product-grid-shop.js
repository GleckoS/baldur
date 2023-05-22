import React from "react"
import styled from "styled-components"
import Card from "../moleculas/product-card"
import Link from "next/link"

export default function ProductGrid({ data }) {
  return (
    <Wrapper>
      <div className="container">
        {data.filter(el => el.products.nodes.length > 0).map((category, index) => (
          <div className="row" key={index}>
            <h2 className="anim">{category.name}</h2>
            <div className="grid">
              {category.products.nodes.map((product, index) => (
                <Card key={index} data={product} />
              ))}
            </div>
            <Link className="show-more anim" href={`/sklep/${category.slug}`}>{'Zobacz więcej >'}</Link>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(60px, ${80 / 768 * 100}vw, 110px);

  .row{
    margin-top: 80px;
  }

  .grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 24px;
    margin-top: 30px;

    .card{
      &:nth-child(4){
        display: none;
      }
    }

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;

      .card{

        &:nth-child(4){
          display: flex;
        }
      }
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
  
  .show-more{
    display: block;
    margin-top: 20px;
    color: var(--primary-500);
    width: fit-content;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: var(--primary-500);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    &:hover::before {
      transform: scaleX(1);
    }
  }
  
`