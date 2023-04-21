import Logo from "@/components/atoms/logo"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

export default function Header() {
  return (
    <Wrapper>
      <div className="container">
        <div className="placeholder"/>
        <button className="burger">
          <div />
          <div />
          <div />
        </button>
        <Navigation>
          <Link href='/sklep/'>Sklep</Link>
          <Link href='/o-nas/'>O baldur</Link>
          <Link className="logo" href='/'>
            <Logo />
          </Link>
          <Link href='/blog/'>Blog</Link>
          <Link href='/kontakt/'>Kontakt</Link>
        </Navigation>
        <button className="cart">
          <svg width="34" height="39" viewBox="0 0 34 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.0942 6.65414C32.1324 5.91801 30.8073 6.1741 30.1349 7.22505L24.8528 15.4847L23.2289 18.0238L20.907 16.2449L22.5312 13.7048L21.3706 12.8152L26.653 4.55779C27.3253 3.50521 27.0911 2.05404 26.1312 1.31662C25.1695 0.580495 23.8443 0.836586 23.1719 1.88624L17.8914 10.1469L16.2671 12.6869V12.6879L13.9458 10.9089L0.00177877 32.7117L0 38.1216L25.5004 38.1203V30.6958L30.1904 23.3615L27.8691 21.5815H27.8703L29.4943 19.0415L28.334 18.1528L33.616 9.89544C34.2884 8.84286 34.0548 7.39012 33.0946 6.65394L33.0942 6.65414ZM22.6671 29.7174V35.0186L2.83521 35.0205V33.6908L14.642 15.2299L26.2455 24.1246L22.6671 29.7174Z" fill="var(--primary-500)" />
            <path d="M9.91687 28.8151H18.417V31.9229H9.91687V28.8151Z" fill="var(--primary-500)" />
          </svg>
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background-color: var(--black-500);
  position: sticky;
  height: 80px;
  top: 0;

  .placeholder{
    
  }

  .container{
    height: 100%;
    max-width: 1260px;
    padding: 0 clamp(24px, calc(40vw / 7.68), 40px);
    margin: 0 auto;
    display: grid;
    align-items: center;
    grid-template-columns: 68px 1fr 68px;
  }

  svg path{
    transition: fill var(--transition);
  }

  .burger{
    display: none;
    position: relative;
    width: 48px;
    height: 34px;
    background-color: transparent;
    border: none;

    div{
      width: 100%;
      height: 7px;
      background-color: var(--primary-500);
      position: absolute;
    }
    div:nth-child(1){
      top: 0;
      left: 0;
    }

    div:nth-child(2){
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    div:nth-child(3){
      bottom: 0;
      left: 0;
    }
  }

  .cart{
    width: fit-content;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;

    &:hover{
      svg path{
        fill: var(--primary-200);
      }
    }

    &:active{
      svg path{
        fill: var(--primary-800);
      }
    }
  }

  .logo{
    &:hover{
      svg path{
        fill: var(--primary-200);
      }
    }

    &:active{
      svg path{
        fill: var(--primary-800);
      }
    }
  }
`

const Navigation = styled.nav`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  gap: 60px;
  align-items: center;
  a{
    font-family: var(--title);
    color: var(--primary-500);
    transition: color var(--transition);

    &:hover{
      text-decoration: underline;
    }

    &:active{
      color: var(--primary-800);
    }
  }
`