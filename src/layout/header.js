import Logo from "@/components/atoms/logo"
import Link from "next/link"
import React, { useState } from "react"
import styled from "styled-components"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Wrapper>
      <Overlay onClick={() => { setIsMobileMenuOpen(false) }} className={isMobileMenuOpen ? 'active' : ''} />
      <div className="container">
        <div className="placeholder" />
        <button aria-label='otwórz mobile meni' onClick={() => { setIsMobileMenuOpen(true) }} className="burger">
          <div />
          <div />
          <div />
        </button>
        <MobileMenu className={isMobileMenuOpen ? 'active' : ''}>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/sklep'>Sklep</Link>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/o-nas'>O baldur</Link>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/jak-wybieramy-materialy'>Jak wybieramy materiały</Link>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/blog'>Blog</Link>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/kontakt'>Kontakt</Link>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/polityka-prywatnosci'>Polityka prywatności</Link>
          <Link tabIndex={isMobileMenuOpen ? '0' : '-1'} href='/regulamin'>Regulamin</Link>
          <button aria-label='zamknij mobilne meni' tabIndex={isMobileMenuOpen ? '0' : '-1'} className="close" onClick={() => { setIsMobileMenuOpen(false) }}>
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.4998 12.0688L27.5686 0L31 3.47012L18.9703 15.4998L31 27.5686L27.5686 31L15.4998 18.9703L3.47012 31L0 27.5686L12.0688 15.4998L0 3.47012L3.47012 0L15.4998 12.0688Z" fill="#EDE2E2" />
            </svg>
          </button>
        </MobileMenu>
        <Navigation>
          <Link className="desctop" href='/sklep/'>Sklep</Link>
          <Link className="desctop" href='/o-nas/'>O baldur</Link>
          <Link aria-label='logo' className="logo" href='/'>
            <Logo />
          </Link>
          <Link className="desctop" href='/blog/'>Blog</Link>
          <Link className="desctop" href='/kontakt/'>Kontakt</Link>
        </Navigation>
        <Link href='/koszyk' aria-label='koszyk' className="cart">
          <svg width="34" height="39" viewBox="0 0 34 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.0942 6.65414C32.1324 5.91801 30.8073 6.1741 30.1349 7.22505L24.8528 15.4847L23.2289 18.0238L20.907 16.2449L22.5312 13.7048L21.3706 12.8152L26.653 4.55779C27.3253 3.50521 27.0911 2.05404 26.1312 1.31662C25.1695 0.580495 23.8443 0.836586 23.1719 1.88624L17.8914 10.1469L16.2671 12.6869V12.6879L13.9458 10.9089L0.00177877 32.7117L0 38.1216L25.5004 38.1203V30.6958L30.1904 23.3615L27.8691 21.5815H27.8703L29.4943 19.0415L28.334 18.1528L33.616 9.89544C34.2884 8.84286 34.0548 7.39012 33.0946 6.65394L33.0942 6.65414ZM22.6671 29.7174V35.0186L2.83521 35.0205V33.6908L14.642 15.2299L26.2455 24.1246L22.6671 29.7174Z" fill="var(--primary-500)" />
            <path d="M9.91687 28.8151H18.417V31.9229H9.91687V28.8151Z" fill="var(--primary-500)" />
          </svg>
        </Link>
      </div>
    </Wrapper>
  )
}

const MobileMenu = styled.div`
  position: fixed;
  z-index: 102;
  left: 0;
  top: 0;
  bottom: 0;
  width: 360px;
  max-width: 100%;
  background-color: #0A0A0AF5;
  padding: 135px 0;
  display: none;
  transition: transform .3s ease-out;
  transform: translateX(-100%);

  .close{
    position: absolute;
    right: 20px;
    top: 30px;
    background-color: transparent;
    border: none;
  }

  &.active{
    transform: translateX(0);
  }

  @media (max-width: 996px) {
    display: block;
    backdrop-filter: blur(4px);
  }

  a{
    display: block;
    margin-top: 15px;
    height: fit-content;
    padding: 10px 0 10px 40px;
    margin-right: 20px;

    font-weight: 500;
    color: #FFFFFF;
    position: relative;
    transition: color .3s ease-out;

    &::before{
      content: '';
      background: linear-gradient(90deg, #EDE2E2 26.56%, #0A0A0AEE 100%);
      position: absolute;
      z-index: -1;
      inset: 0;
      opacity: 1;
      transform: translateX(-100%);
      transition: transform .3s ease-out;
    }

    &:hover{
      color: #000;

      &::before{
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
`

const Overlay = styled.div`
  position: fixed;
  z-index: 101;
  inset: 0;
  display: none;
  pointer-events: none;

  @media (max-width: 996px) {
    display: block;
  }

  &.active{
    pointer-events: all;
  }

`

const Wrapper = styled.header`
  position: sticky;
  z-index: 100;
  height: 80px;
  top: 0;
  overflow-x: hidden;
  background-color: #0A0A0ACC;
  backdrop-filter: blur(10px);

  .placeholder{
    @media (max-width: 996px) {
      display: none;
    }
  }
  @media (max-width: 996px) {
    background-color: var(--dark-500);
    backdrop-filter: unset;
  }

  @media (max-width: 480px) {
    .logo{
      width: 150px;
    }
  }

  .container{
    height: 100%;
    max-width: 1260px;
    padding: 0 clamp(24px, calc(40vw / 7.68), 40px);
    margin: 0 auto;
    display: grid;
    align-items: center;
    grid-template-columns: 68px 1fr 68px;

    @media (max-width: 480px) {
      grid-template-columns: auto 1fr auto;
    }
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

    @media (max-width: 996px) {
      display: block;
    }

    @media (max-width: 480px){
      width: 38px;
      height: 26px;
    }

    div{
      width: 100%;
      height: 7px;
      background-color: var(--primary-500);
      position: absolute;

      @media (max-width: 480px){
        height: 5px;
      }
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

    @media (max-width: 480px){
      width: 30px;
      height: 34px;
    }

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

    text-decoration: underline 2px transparent;
    transition: text-decoration-color 0.2s ease-out;
    &:hover{
      text-decoration-color: currentColor;
    }

    &:active{
      color: var(--primary-800);
    }
  }

  @media (max-width: 996px) {
    .desctop{
      display: none;
    }
  }
`