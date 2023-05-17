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
        <button aria-label='otwórz mobile menu' onClick={() => { setIsMobileMenuOpen(true) }} className="burger">
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
        <Link href='/koszyk' aria-label='Koszyk' className="cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="39" viewBox="0 0 38.2 43.7">
            <path d="M23.5 16.6 21.4 15s2.5-1.8 4.3-5.4 1.7-3.5 2.6-4.6c.9-1.2 1.7-1.8 1.9-2.4.1-.6-1.8-2.7-2.8-2.5-1.1.1-8.4 13-8.4 13L3.7 37s9.1-1.3 19.8-20.4z" fill="#fff" className="knife1" />
            <path d="M35.3 4.5c-1.1.2-8.3 13.1-8.3 13.1l-4.2 6.6-1.6 2.5-9 14-.5.8s.8-.1 2.2-.8c2-.9 5.1-2.9 8.9-7.1 1.5-1.6 3-3.6 4.6-5.9 1.3-1.9 2.7-4.2 4.1-6.7l-2.1-1.6s2.5-1.8 4.3-5.4c1.8-3.7 1.7-3.5 2.6-4.7.9-1.1 1.7-1.8 1.9-2.3.1-.6-1.8-2.7-2.9-2.5z" fill="#fff" className="knife2" />
            <path d="m28 27.2-.1-.1-4.4-3.4-.2-.2-1.9-1.4-.5-.4-4.1-3.1-.6-.5-2.3-1.8L0 38.2v5.4h25.5v-7.4l4.7-7.3-2.2-1.7zm-5.3 8.1v5.3H2.8v-1.3l11.8-18.5.6.5 4.6 3.5 2 1.5 4.4 3.4-3.5 5.6z" fill="#fff" />
            <path d="m21.8 26.3-2-1.5-4.6-3.5-.6-.5L2.8 39.2v1.3h19.8v-5.3l3.6-5.6-4.4-3.3zm-3.4 11.2H9.9v-3.1h8.5v3.1z"/>
            <path d="M9.9 34.4h8.5v3.1H9.9z" fill="#fff" /></svg>
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
    svg {
      overflow: visible;
      path {
        transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1);
        &.knife2 {
          transition-delay: 100ms;
        }
      }
    }
    &:hover {
      .knife1 {
        transform: translate(3px,-5px);
      }
      .knife2 {
        transform: translate(3px,-5px);
      }
    }

    @media (max-width: 480px){
      width: 30px;
      height: 34px;
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