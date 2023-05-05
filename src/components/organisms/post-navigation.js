import Image from "next/image"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

export default function Navigation() {
  return (
    <Wrapper>
      <p>Spis treści</p>
      <Link href='/sklep'>Sprawdź nasze produkty!</Link>
      <Image className="right" src="/aside-decoration.png" alt="me" width="312" height="41" />
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  background: #141414;
  padding: 20px;
  height: fit-content;

  img{
    margin-top: 30px;
  }
`