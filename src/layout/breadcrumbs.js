import Link from "next/link"
import React from "react"
import styled from "styled-components"

export default function Breadcrumbs({ data }) {
  if (!data) return null
  return (
    <Wrapper className="container anim">
      <div className="ul">
        <div className="item">
          <Link href="/">Strona główna</Link>
        </div>
        <span>{'>'}</span>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="item" key={index}>
              <Link tabIndex={index === data.length - 1 ? '-1' : '0'} className={index === data.length - 1 ? 'last' : ''} href={item.url}>{item.page}</Link>
            </div>
            <span>{'>'}</span>
          </React.Fragment>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin-top: 30px !important;
  position: relative;
  z-index: 40;

  @media (max-width: 864px) {
    display: none;
  }

  .ul{
    top: 0;
    display: flex;
    gap: 8px;
    position: absolute;
  }

  div{
    list-style: none;

    a{
      font-weight: 400;
      font-size: 20rem;
      line-height: 125%;
      letter-spacing: -0.02em;
      color: rgba(255, 255, 255, 0.8);
      transition: color .2s ease-out;

      &:hover{
        color: #fff;
      }
    }
  }

  .last{
    pointer-events: none;
  }

  span{
    &:last-child{
      display: none;
    }
  }
`