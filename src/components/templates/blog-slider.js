import React from "react"
import styled from "styled-components"
import Slider from "../organisms/posts-slider"
import { RunesXM } from "../atoms/runes-xm"

export default function Blog({ posts }) {
  return (
    <Wrapper>
      <div className="container">
        <h2 className="anim">Blog</h2>
        <p className="annotation anim">Chcesz dowiedzieć się więcej o projektowaniu i wytwarzaniu noży <strong>wysokiej klasy?</strong> Wskazówki i artykuły dotyczące ostrzy
          i egzotycznych materiałów, których używam, znajdziesz na moim blogu.</p>
        <h2 className="title anim">Zobacz najnowsze posty!</h2>
        <Slider posts={posts} />
        <RunesXM />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(80px, ${200 / 1440 * 100}vw, 200px);
  position: relative;

  .rune{
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);

    @media (max-width: 1260px) {
      bottom: -40px;
      right: 10%;
      left: unset;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  h2{
    text-align: center;
    margin-bottom: 30px;
  }

  .annotation{
    text-align: center;
    margin: 0 auto;
    max-width: 610px;
  }

  .title{
    text-align: center;
    margin: 100px auto 40px auto;
  }
`