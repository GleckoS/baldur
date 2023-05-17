import React from "react"
import Link from "next/link"
import styled from "styled-components"

const OutlinedButton = ({ children, href, className, as, mode = 'primary' }) => (
  <Link mode={mode} className={className} href={href} as={as} >
    <span>
      {children}
    </span>
  </Link >
)

export default styled(OutlinedButton)`
  height: 72px;
  min-width: 356px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: block;
  width: fit-content;
  text-decoration: none;

  @media (max-width: 480px) {
    width: 100%;
    height: 64px;
    min-width: unset;
  }

  span {
    white-space: nowrap;
    padding: 0px 40px 4px 20px;
    font-weight: 500;
    height: 100%;
    clip-path: polygon(0 0, 100% 0%, calc(100% - 36px) 100%, 0% 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rem;
    letter-spacing: 0.03em;
    text-align: center;
    background-color: transparent;
    border: 3px solid transparent; 
    position: relative;
    transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1), color .4s;

    @media (max-width: 360px){
      font-size: clamp(0rem, ${28 / 360 * 100}vw, 28rem);
    }

    &::after{
      content: '';
      position: absolute;
      right: -2px;
      top: -1px;
      transform-origin: 100% 0;
      transform: rotateZ(26.4deg);
      height: 124%;
      width: 3px;
      background-color: transparent;

      @media (max-width: 480px) {
        transform: rotateZ(29deg);
      }
    }
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: var(--primary-500);
      z-index: -1;
      transform: scaleX(0);
      transform-origin: left top;
      transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
  &:hover span {
    &::before {
      transform: scaleX(1) skewX(-26.4deg);
    }
  }

  ${props => props.mode === 'secondary' ? `
    :hover span{
      background-color: var(--primary-500);
      color: var(--dark-900);

      &::after{
        background-color: var(--dark-500);
      }
    }

    :active span{
      background-color: var(--primary-600);
      color: var(--dark-300);

      &::after{
        background-color: var(--dark-600);
      }
    }

    :disabled span{
      background-color: var(--light-900);
      color: var(--light-900);

      &::after{
        background-color: var(--light-900);
      }
    }
  ` : `    
    span {
      border-color: var(--primary-500);
      color: var(--primary-500);
      &::after{
        background-color: var(--primary-500);
      }
    }
    &:hover {
      span {
        color: var(--dark-900);
      }
    }
    &:active span {
      transform: scale(0.97);
    }

    :disabled span{
      background-color: var(--light-900);
      color: var(--light-900);

      &::after{
        background-color: var(--light-900);
      }
    }
  `}
`