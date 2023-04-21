import React from "react"
import Link from "next/link"
import styled from "styled-components"

const OutlinedButton = ({ children, href, className, as, mode = 'primary' }) => (
  <Link mode={mode} className={className} href={href} as={as} >
    <div />
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

  span{
    height: 100%;
    clip-path: polygon(0 0, 100% 0%, calc(100% - 36px) 100%, 0% 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rem;
    letter-spacing: 0.03em;
    text-align: center;
    transition: color var(--transition), background-color var(--transition), border-color var(--transition);
    background-color: transparent;
    border: 3px solid transparent; 
    position: relative;

    &::after{
      content: '';
      position: absolute;
      right: -3px;
      top: -3px;
      transform-origin: 100% 0;
      transform: rotateZ(26.4deg);
      height: 200%;
      width: 3px;
      background-color: transparent;
    }
    
  }

${props => props.mode === 'secondary' ? `
  span{
    border-color: var(--dark-500);
    color: var(--dark-500);

    &::after{
      background-color: var(--dark-500);
    }
  }

  :hover span{
    background-color: var(--primary-500);
    color: var(--dark-300);

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
  span{
    border-color: var(--primary-500);
    color: var(--primary-500);

    &::after{
      background-color: var(--primary-500);
    }
  }

  :hover span{
    border-color: var(--primary-700);
    color: var(--primary-700);

    &::after{
      background-color: var(--primary-700);
    }
  }

  :active span{
    border-color: var(--primary-900);
    color: var(--primary-900);

    &::after{
      background-color: var(--primary-900);
    }
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