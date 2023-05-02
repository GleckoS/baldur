import React, { useState } from "react"
import styled from "styled-components"
import Form from "../organisms/form"

export default function Contact({ data }) {

  const [chosenMethod, setChosenMethod] = useState("Customowy nóż")

  return (
    <Wrapper>
      <div className="container">
        <div className="methods">
          <button onClick={() => { setChosenMethod('Customowy nóż') }} className={chosenMethod === 'Customowy nóż' ? 'active' : ''}>
            <span>Customowy nóż</span>
            <svg width="93" height="107" viewBox="0 0 93 107" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M35.327 32.8396C34.2243 33.9591 34.2243 35.7742 35.327 36.8937L51.6834 53.5L35.327 70.1063C34.2243 71.2258 34.2243 73.0409 35.327 74.1604C36.4296 75.2799 38.2174 75.2799 39.3201 74.1604L57.673 55.527C58.7757 54.4075 58.7757 52.5925 57.673 51.473L39.3201 32.8396C38.2174 31.7201 36.4297 31.7201 35.327 32.8396Z" fill="#0A0A0A" />
            </svg>
          </button>
          <button onClick={() => { setChosenMethod('Konsultacje') }} className={chosenMethod === 'Konsultacje' ? 'active' : ''}>
            <span>Konsultacje</span>
            <svg width="93" height="107" viewBox="0 0 93 107" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M35.327 32.8396C34.2243 33.9591 34.2243 35.7742 35.327 36.8937L51.6834 53.5L35.327 70.1063C34.2243 71.2258 34.2243 73.0409 35.327 74.1604C36.4296 75.2799 38.2174 75.2799 39.3201 74.1604L57.673 55.527C58.7757 54.4075 58.7757 52.5925 57.673 51.473L39.3201 32.8396C38.2174 31.7201 36.4297 31.7201 35.327 32.8396Z" fill="#0A0A0A" />
            </svg>
          </button>
          <button onClick={() => { setChosenMethod('Pytanie o materiał') }} className={chosenMethod === 'Pytanie o materiał' ? 'active' : ''}>
            <span>Pytanie o materiał</span>
            <svg width="93" height="107" viewBox="0 0 93 107" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M35.327 32.8396C34.2243 33.9591 34.2243 35.7742 35.327 36.8937L51.6834 53.5L35.327 70.1063C34.2243 71.2258 34.2243 73.0409 35.327 74.1604C36.4296 75.2799 38.2174 75.2799 39.3201 74.1604L57.673 55.527C58.7757 54.4075 58.7757 52.5925 57.673 51.473L39.3201 32.8396C38.2174 31.7201 36.4297 31.7201 35.327 32.8396Z" fill="#0A0A0A" />
            </svg>
          </button>
        </div>
        <div className="form">
          <p>Chętnie doradzę Ci w doborze odpowiednich materiałów lub pomogę w zaprojektowaniu idealnego noża. Wypełnij formularz, aby umówić się na konsultację.</p>
          <Form />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 100px;

  .container{
    display: grid;
    grid-template-columns: auto 1fr;

    @media (max-width: 864px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 768px) {
      padding: 0;
    }
  }

  .methods{
    display: grid;
    gap: 32px;
    height: fit-content;
    max-width: 395px;

    @media (max-width: 864px){
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: center;
      gap: 0;
      max-width: unset;
      width: fit-content;
      margin: 0 auto;
    }

    button{
      background: #A8A8A8;
      font-family: var(--title);
      font-size: clamp(16rem, ${19 / 768 * 100}vw, 36rem);
      color: var(--dark-500);
      text-align: left;
      border: none;
      display: grid;
      grid-template-columns: 1fr 93px;
      align-items: center;
      gap: 10px;
      transition: background-color .2s ease-out;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
      }

      svg{
        opacity: 0;
        transform: translateX(-4px);
        transition: all .2s ease-out;
      }

      span{
        padding: 30px;
      }

      &.active{
        background-color: var(--primary-500);
        svg{
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media (max-width: 864px){
        display: block;
        padding: 0 4px;
        text-align: center;
        min-height: clamp(60px, ${116 / 768 * 100}vw, 116px);

        svg{
          display: none;
        }
        span{
          padding: 0;
          text-align: center;
        }
      }
    }
  }

  .form{
    padding: 40px 60px;
    background: var(--dark-500);
    border: 2px solid #EDE2E2;

    p{
      font-size: clamp(18rem, ${32 / 1440 * 100}vw, 32rem);

      @media (max-width: 864px) {
        font-size: clamp(18rem, ${32 / 768 * 100}vw, 32rem);
      }

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem);
      }
    }

    @media (max-width: 768px) {
      padding: 45px 25px;
      border-left: none;
      border-right: none;
    }
  }
`