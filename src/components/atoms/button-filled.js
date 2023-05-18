import React from "react"
import Link from "next/link"
import styled from "styled-components"

const Button = ({ children, href, className, as, mode = 'primary' }) => (
  <Link mode={mode} className={className} href={href} as={as} >
    <span>
      {children}
    </span>
  </Link >
)

export default styled(Button)`
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
  
  span{
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
    transition: color var(--transition), background-color var(--transition), border-color var(--transition);

    @media (max-width: 360px){
      font-size: clamp(0rem, ${28 / 360 * 100}vw, 28rem);
    }
  }

  ${props => props.mode === 'secondary' ? `
    span{
      background-color: var(--dark-500);
      color: var(--primary-500);
    }

    :hover span{
      background-color: var(--dark-300);
    }

    :active span{
      background-color: var(--primary-500);
      color: var(--primary-700);
    }

    :disabled span{
      background-color: var(--dark-300);
      color: var(--light-900);
    }
  ` : `    
    span{
      background-color: var(--primary-500);
      color: var(--dark-500);
    }

    :hover span{
      background-color: var(--primary-100);
    }

    :active span{
      background-color: var(--primary-600);
      color: var(--dark-500);
    }

    :disabled span{
      background-color: var(--light-700);
      color: var(--dark-200);
    }
  `}
`