import React from "react"
import styled from "styled-components"

export default function Characteristics({ data }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>
          Dane techniczne
          oraz materiały
        </h2>
        <Grid>
          <tbody>
            {data.nodes.map(el => (
              <tr key={el.slug}>
                <td className="left">{el.name}</td>
                <td className="right">
                  {el.terms.nodes.map((inEl, i, arr) => (
                    <span key={inEl.name}>{inEl.name}{i + 1 < arr.length ? ' + ' : ''}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Grid>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 60px;

  h2{
    max-width: 500px;
  }
`

const Grid = styled.table`
  margin-top: 40px;
  border: 1px solid var(--primary-500);
  border-collapse: collapse;
  width: 100%;

  @media (max-width: 480px) {
    display: block;
    border: none;

    *{
      border: none !important;
      display: block;
      padding: 0 !important;
    }

    span{
      display: inline !important;
    }

    tr{
      display: grid;
      gap: 10px;
      margin-top: 25px;
    }
  }

  td{
    border: 1px solid var(--primary-500);
  }

  .left{
    min-width: 291px;
    padding: 15px 21px;
    font-weight: 500;
    font-size: clamp(30rem, ${40 / 768 * 100}vw, 40rem);
    line-height: 125%;
    width: fit-content;

    @media (max-width: 720px) {
      min-width: 250px;
    }
    @media (max-width: 580px) {
      min-width: 200px;
    }
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${30 / 360 * 100}vw, 30rem);
    }
  }

  .right{
    padding: 15px 21px;
    font-size: clamp(20rem, ${36 / 768 * 100}vw, 36rem);
    line-height: 125%;
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
    }
  }
`