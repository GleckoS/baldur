import React from "react"
import styled from "styled-components"
import Card from "../moleculas/blog-card"

export default function Blog({ posts }) {
  return (
    <Wrapper>
      <div className="container">
        <h2>Blog</h2>
        <p className="annotation">Chcesz dowiedzieć się więcej o projektowaniu i wytwarzaniu noży <strong>wysokiej klasy?</strong> Wskazówki i artykuły dotyczące ostrzy
          i egzotycznych materiałów, których używam, znajdziesz na moim blogu.</p>
        <h2 className="title">Zobacz najnowsze posty!</h2>
        <Grid>
          {posts.map((post, index) => (
            <Card key={index} data={post} />
          ))}
        </Grid>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 200px;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 34px;
`