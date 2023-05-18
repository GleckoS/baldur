import React from "react"
import styled, { keyframes } from "styled-components"

export default function Loader() {
  return (
    <Wrapper>
      <div className="wrap">
        <div />
        <div />
        <div />
      </div>
    </Wrapper>
  )
}

const loaderAnimation = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`

const Wrapper = styled.div`
    position: fixed;
    z-index: 2000;
    inset: 0;
    background: rgba(0, 0, 0, 0.22);
    display: flex;
    justify-content: center;
    align-items: center;

    .wrap{
        width: 80px;
        height: 80px;
        position: relative;
    }

    .wrap div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #fff;
        animation: ${loaderAnimation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .wrap div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
    }
    .wrap div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
    }
    .wrap div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
    }
`