import Image from "next/image"
import Link from "next/link"
import React from "react"
import styled from "styled-components"
import { htmlDelete } from "../../utils/html-delete"
import { slugTransform } from "../../utils/slug-transform"

export default function Navigation({ headings }) {

  const scroll = (e) => {
    document.getElementById(slugTransform(e.target.textContent)).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Wrapper>
      <p className="title">Spis treści</p>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <button onClick={e => { scroll(e) }}>
              {htmlDelete(heading)}
            </button>
          </li>
        ))}
      </ul>
      <Link className="top" href='/sklep'>Sprawdź nasze produkty!</Link>
      <Image src="/aside-decoration.png" alt="me" width="312" height="41" />
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  background: #141414;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 100px;

  max-width: 484px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 948px) {
    position: relative;
    top: 0;
  }

  @media (max-width: 420px) {
    width: 100vw;
    margin-left: -24px;
    margin-right: -24px;
  }

  img{
    display: block;
    margin: 0 auto;
    max-width: 352px;
    width: 100%;
    height: fit-content;
  }

  .title{
    font-weight: 500;
    font-size: 32rem;
    line-height: 84%;
    letter-spacing: 0.02em;
    margin-bottom: 15px;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
    }
  }

  img{
    margin-top: 30px;
  }

  li{
    list-style: numeric inside;
    margin-bottom: 20px;

    button{
      border: none;
      background-color: transparent;
      color: var(--primary-500);
    }
  }

  .top{
    margin-top: 30px;
    text-decoration: underline;
    color: var(--primary-500);
    font-size: 24rem;
    font-weight: 500;
    letter-spacing: 0.02em;

    margin: 0 auto;
    display: block;
    width: fit-content;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }
`