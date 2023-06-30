import HTMLReactParser from "html-react-parser"
import React, { useState } from "react"
import styled from "styled-components"

const fires = [{}, {}, {}, {}, {}]

export default function Slider({ data }) {

  const [chosenReview, setChosenReview] = useState(1)

  return (
    <Wrapper className="anim">
      <Slides chosen={chosenReview} count={data.length}>
        {data.map((item, index) => (
          <div className={index === chosenReview ? "slide active" : "slide"} key={index}>
            <p className="text">{item.author}</p>
            <div className="marks">
              {fires.map((fire, index) => (
                <span className={item.mark > index ? 'mark active' : 'mark'} key={index}>
                  <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5785 9.13115C14.3204 8.7978 14.0062 8.50891 13.7144 8.22001C12.9625 7.55332 12.1096 7.07553 11.3914 6.37551C9.71922 4.75324 9.34888 2.07539 10.415 0.0197754C9.34888 0.275338 8.41742 0.853133 7.62062 1.48648C4.71401 3.79766 3.56933 7.87556 4.93846 11.3757C4.98335 11.4868 5.02824 11.5979 5.02824 11.7423C5.02824 11.9868 4.85991 12.209 4.63546 12.2979C4.37734 12.409 4.108 12.3423 3.89478 12.1646C3.8307 12.1121 3.77737 12.048 3.73766 11.9757C2.46953 10.3867 2.26752 8.1089 3.12043 6.28662C1.24628 7.79778 0.225041 10.3534 0.370933 12.7646C0.438267 13.3202 0.505602 13.8757 0.696383 14.4313C0.853497 15.098 1.1565 15.7647 1.49318 16.3536C2.7052 18.2759 4.80379 19.6537 7.0595 19.9315C9.4611 20.2315 12.031 19.7981 13.8715 18.1536C15.9252 16.3091 16.6435 13.3535 15.5886 10.8201L15.4427 10.5312C15.207 10.0201 14.5785 9.13115 14.5785 9.13115ZM11.0322 16.1313C10.718 16.398 10.2018 16.6869 9.79778 16.798C8.54086 17.2425 7.28395 16.6202 6.54327 15.8869C7.87874 15.5758 8.67553 14.598 8.9112 13.6091C9.10198 12.7201 8.74287 11.9868 8.59698 11.1312C8.46231 10.309 8.48475 9.60894 8.78776 8.84225C9.00098 9.26448 9.22543 9.68672 9.49477 10.0201C10.3589 11.1312 11.7168 11.6201 12.0086 13.1313C12.0535 13.2868 12.0759 13.4424 12.0759 13.6091C12.1096 14.5202 11.7056 15.5202 11.0322 16.1313Z" fill="#EDE2E2" />
                  </svg>
                </span>
              ))}
            </div>
            <div className="content">{HTMLReactParser(item.content)}</div>
          </div>
        ))}
      </Slides>
      <Control>
        <button disabled={chosenReview <= 0} aria-label={`poprzedna opinia`} onClick={() => { setChosenReview(chosenReview <= 0 ? 0 : chosenReview - 1) }} className="arrow left">
          <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.9487 28.9535C16.6838 28.1985 16.6838 26.9744 15.9487 26.2194L5.0444 15.0198L15.9487 3.82018C16.6838 3.06517 16.6838 1.84105 15.9487 1.08604C15.2136 0.331022 14.0217 0.331022 13.2866 1.08604L1.05133 13.6527C0.316224 14.4077 0.316224 15.6318 1.05133 16.3868L13.2866 28.9535C14.0217 29.7085 15.2136 29.7085 15.9487 28.9535Z" fill="#EDE2E2" />
          </svg>
        </button>
        <div className="dots">
          {data.map((item, index) => (
            <button aria-label={`przejdź do ${index+1} elementu slidera`} onClick={() => {setChosenReview(index)}} key={index} className={chosenReview === index ? "dot active" : "dot"} />
          ))}
        </div>
        <button disabled={chosenReview >= data.length - 1} aria-label={`następna opinia`} onClick={() => { setChosenReview(chosenReview >= data.length - 1 ? data.length - 1 : chosenReview + 1) }} className="arrow right">
          <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.05133 1.08604C0.316226 1.84105 0.316226 3.06517 1.05133 3.82018L11.9556 15.0198L1.05133 26.2194C0.316224 26.9744 0.316224 28.1985 1.05133 28.9535C1.78643 29.7085 2.97827 29.7085 3.71338 28.9535L15.9487 16.3868C16.6838 15.6318 16.6838 14.4077 15.9487 13.6527L3.71338 1.08604C2.97828 0.331022 1.78643 0.331022 1.05133 1.08604Z" fill="#EDE2E2" />
          </svg>
        </button>
      </Control>
    </Wrapper>
  )
}

const Control = styled.div`
  @media (max-width: 1024px) {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 80px;
      margin-top: 32px;
  }

  @media (max-width: 360px) {
    gap: 12px;
    justify-content: space-between;
  }

  .dots{
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 1024px) {
      position: unset;
      transform: unset;
    }

    .dot{
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid var(--primary-500);
      transition: background-color .4s, transform .4s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      &:not(.active):hover {
        transform: scale(.95);
      }
      @media (max-width: 1024px) {
        border: 1px solid var(--dark-500);
      }

      &.active{
        background-color: var(--primary-500);

        @media (max-width: 1024px) {
          background-color: var(--dark-500);
        }
      }
    }
  }

  .arrow {
    svg {
      transition: transform .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    &:hover {
      svg {
        transform: translateX(-5px);
      }
    }
    &.right:hover {
      svg {
        transform: translateX(5px);
      }
    }
  }
  .left{
    background-color: transparent;
    border: none;
    position: absolute;
    left: 32px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 1024px) {
      position: unset;
      transform: unset;

      path{
        fill: var(--dark-500);
      }
    }
  }

  .right{
    background-color: transparent;
    border: none;
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 1024px) {
      position: unset;
      transform: unset;

      path{
        fill: var(--dark-500);
      }
    }
  } 
`

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    overflow: visible;
    max-width: 532px;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    max-width: calc(100vw - clamp(24px,calc(40vw / 7.68),40px) - clamp(24px,calc(40vw / 7.68),40px));
  }

  @media (max-width: 420px) {
    overflow: hidden;
  }

  *{
    color: var(--primary-500) !important;
  }
`

const Slides = styled.div`
  width: fit-content;
  display: flex;
  width: calc(100% * ${props => props.count});
  position: relative;
  left: calc(-100% * ${props => props.chosen});
  transition: left .2s ease-out;


  .slide{
    padding: 48px 102px 100px 102px;
    background: #0A0A0A;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    cursor: grab;

    :active{
      cursor: grabbing;
    }

    .text,.marks,.content{
      transition: opacity .3s ease-out;
      opacity: 0;
      user-select: none;
    }
    &.active{
      .text,.marks,.content{
        opacity: 1;
      }
    }

    @media (max-width: 1024px) {
      padding-bottom: 48px;
      margin: 0 16px;
      .text,.marks,.content{
        opacity: 1;
      }
    }

    @media (max-width: 640px) {
      padding: 48px 32px;
      width: calc(100vw - clamp(24px,calc(40vw / 7.68),40px) - clamp(24px,calc(40vw / 7.68),40px));;
    }

    @media (max-width: 420px) {
      margin: 0;
      box-shadow: none;
    }

    @media (max-width: 355px) {
      padding: 24px 16px;
    }
  }

  .marks{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 32px;

    .mark{
      &.active{
        svg{
          path{
            fill: var(--secondary-500);
          }
        }
      }
    }
  }

  .content{
    font-size: 16rem;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
    }
  }
`