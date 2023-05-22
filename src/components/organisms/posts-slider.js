import React, { useState } from "react"
import Card from "../moleculas/blog-slider-card"
import styled from "styled-components"

export default function Slider({ posts }) {
  const [transform, setTransform] = useState(1)

  return (
    <>
      <Grid className={`slide-${transform}`}>
        {posts.map((post, index) => (
          <Card setTransform={setTransform} key={index} data={post} index={index} />
        ))}
      </Grid>
      <Control>
        <button disabled={transform <= 0} aria-label={`Poprzedni artykuł`} onClick={() => { setTransform(transform <= 0 ? 0 : transform - 1) }} className="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="41" fill="none" viewBox="0 0 22 41"><path fill="#EDE2E2" d="M21.242 39.763a2.71 2.71 0 0 0 0-3.76L6.249 20.604l14.993-15.4a2.71 2.71 0 0 0 0-3.759 2.54 2.54 0 0 0-3.66 0L.758 18.725a2.71 2.71 0 0 0 0 3.759l16.824 17.279a2.54 2.54 0 0 0 3.66 0Z"/></svg>
        </button>
        <div className="dots">
          {posts.map((post, index) => (
            <button aria-label={`Przejdź do ${index + 1} artykułu`} key={index} onClick={() => { setTransform(index) }} className={index === transform ? 'active' : ''} />
          ))}
        </div>
        <button disabled={transform >= 2} aria-label={`Następny artykuł`} onClick={() => { setTransform(transform >= 2 ? 2 : transform + 1) }} className="arrow arrow-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="41" fill="none" viewBox="0 0 22 41"><path fill="#EDE2E2" d="M.758 1.445a2.71 2.71 0 0 0 0 3.76l14.993 15.399-14.993 15.4a2.71 2.71 0 0 0 0 3.759 2.54 2.54 0 0 0 3.66 0l16.824-17.28a2.71 2.71 0 0 0 0-3.759L4.418 1.445a2.54 2.54 0 0 0-3.66 0Z"/></svg>
        </button>
      </Control>
    </>
  )
}

const Control = styled.div`
  margin-top: 32px;
  display: none;
  gap: 92px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1260px) {
    display: flex;
  }

  @media (max-width: 480px) {
    gap: 12px;
    justify-content: space-between;
  }

  .arrow {
    padding: 10px;
    border: none;
    background-color: transparent;
    svg {
      transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    &:hover {
      svg {
        transform: translateX(-5px);
      }
    }
    &.arrow-next:hover {
      svg {
        transform: translateX(5px);
      }
    }
  }

  .dots{
    display: flex;
    align-items: center;
    gap: 16px;

    button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid var(--primary-500);
      transition: background-color .4s, transform .4s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      &.active{
        background-color: var(--primary-500);
      }
      &:not(.active):hover {
        transform: scale(.95);
      }
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px;
  min-width: fit-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1260px) {
    transform: translateX(0);
    transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1), left .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    &.slide-0{
      left: 0%;
      transform: translateX(0%);
    }

    &.slide-1{
      left: calc(50vw - clamp(24px,calc(40vw / 7.68),40px));
      transform: translateX(-50%);
    }

    &.slide-2{
      left: calc(100vw - clamp(24px,calc(40vw / 7.68),40px) - clamp(24px,calc(40vw / 7.68),40px));
      transform: translateX(-100%);
    }

    @media (max-width: 480px){
      gap: 12px;
    }
  }
`