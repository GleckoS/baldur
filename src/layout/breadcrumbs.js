import Link from "next/link"
import React from "react"
import styled from "styled-components"

export default function Breadcrumbs({ data }) {
  if (!data) return null
  return (
    <Wrapper className="container anim">
      <ul>
        <li className="item">
          <Link href="/">Strona główna</Link>
        </li>
        <span>{'>'}</span>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <li className="item" key={index}>
              <Link href={item.url}>{item.page}</Link>

            </li>
            <span>{'>'}</span>
          </React.Fragment>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin-top: 30px !important;
  position: relative;

  @media (max-width: 864px) {
    display: none;
  }

  ul{
    top: 0;
    display: flex;
    gap: 8px;
    position: absolute;
  }

  li{
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

  span{
    &:last-child{
      display: none;
    }
  }
`