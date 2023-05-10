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

  td{
    border: 1px solid var(--primary-500);
  }

  .left{
    min-width: 291px;
    padding: 15px 21px;
    font-weight: 500;
    font-size: 40rem;
    line-height: 125%;
    width: fit-content;
  }

  .right{
    padding: 15px 21px;
    font-size: 40rem;
    line-height: 125%;
  }
`