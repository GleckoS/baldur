import HTMLReactParser from "html-react-parser"
import React from "react"
import styled from "styled-components"

export default function Faq({ data: { title, questions } }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>{title}</h2>
        <Grid>
          {questions.map((el, index) => (
            <details open={!index} key={index}>
              <summary className="h4">
                <svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.6639 36.1123C11.5491 36.9741 12.9843 36.9741 13.8694 36.1123L27 23.328L40.1306 36.1123C41.0157 36.9741 42.4509 36.9741 43.3361 36.1123C44.2213 35.2504 44.2213 33.8531 43.3361 32.9913L28.6028 18.6464C27.7176 17.7846 26.2824 17.7846 25.3972 18.6464L10.6639 32.9913C9.7787 33.8531 9.7787 35.2504 10.6639 36.1123Z" fill="#EDE2E2" />
                </svg>
                <span>{`${index + 1 < 10 ? 0 : ''}${index + 1}. `}{el.question}</span>
              </summary>
              <div className="text">
                {HTMLReactParser(el.response)}
              </div>
            </details>
          ))}
        </Grid>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 200px;
  h2{
    margin-bottom: 80px;
    max-width: 600px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 128px 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  details[open]{
    svg{
      transform: rotateZ(180deg);
    }
  }

  svg{
    transition: transform .2s ease-out;
  }

  summary{
    display: grid;
    grid-template-columns: 55px 1fr;
    gap: 10px;
    font-family: var(--text);
    list-style: none;
    cursor: pointer;

    font-size: clamp(20rem, ${32 / 768 * 100}vw, 32rem);

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
    }

    &::-webkit-details-marker {
      display: none;
    }
  }

  .text{
    margin-top: 32px;
  }
`