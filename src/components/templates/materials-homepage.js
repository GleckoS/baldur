import React from "react"
import styled from "styled-components"
import HTMLReactParser from "html-react-parser"
import Grid from "../organisms/categories-grid"
import { RunesS } from "../atoms/rune-s"
import { RunesT } from "../atoms/rune-t"

export default function Materials({ categories, data: { title, leftTitle, leftText, rightTitle, rightText } }) {
  return (
    <Wrapper>
      <div className="container">
        <RunesT className='rune-first' />
        <RunesS className='rune-second' />
        <h2 className="anim">{title}</h2>
        <div className="flex">
          <div>
            <h3 className="big-text anim">{leftTitle}</h3>
            <div className="anim">{HTMLReactParser(leftText)}</div>
          </div>
          <div>
            <h3 className="big-text anim">{rightTitle}</h3>
            <div className="anim">{HTMLReactParser(rightText)}</div>
          </div>
        </div>
        <Grid categories={categories} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(0px, ${270 / 1440 * 100}vw, 270px);

  .rune-first{
    position: absolute;
    bottom: 0;
    left: -12px;

    @media (max-width: 864px) {
      display: none;
    }
  }

  .rune-second{
    position: absolute;
    bottom: 260px;
    right: 80px;

    @media (max-width: 864px) {
      bottom: unset;
      top: 0;
      right: 10px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .container{
    position: relative;
  }

  @media (max-width: 864px) {
    margin-top: 0;
  }

  .flex{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 864px) {
      grid-template-columns: 1fr;
    }
  }

  h2{
    margin-bottom: 45px;
    max-width: 620px;
  }

  h3{
    margin-bottom: 15px;
  }
`