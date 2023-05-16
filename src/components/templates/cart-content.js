import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"

export default function Content({ data }) {
  debugger
  return (
    <Wrapper>
      <div className="container">
        <Grid>

        </Grid>
        <Summary>
          <div className="box">
            <h2>Podsumowanie:</h2>
            <div className="flex ">

            </div>
          </div>
          <ButtonFilled href='/zamowienie'>
            ZAMAWIAM
          </ButtonFilled>
        </Summary>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-bottom: 24px;
  border-bottom: 1px solid #EDE2E2;
`

const Grid = styled.div`

`

const Summary = styled.aside`
  .box {
    background-color: var(--primary-500);
    padding: 24px;
    margin-bottom: 24px;
  }
`