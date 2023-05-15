import React, { useEffect, useState } from "react"
import styled from "styled-components"
import client from "../../apollo/apollo-client"
import { gql } from "@apollo/client"
import { Input } from "../atoms/input"
import Link from "next/link"

export default function Search() {

  const [search, setSearch] = useState('')
  const [arr, setArr] = useState([])

  useEffect(() => {
    if (search.length > 0) {
      getData()
    } else {
      setArr([])
    }

    async function getData() {
      const { data } = await client.query({
        query: gql`
        query search($search: String!) {
          products(where: {search: $search}, first: 3) {
            nodes {
              slug
              name
            }
          }
        }
      `,
        variables: {
          search: search
        }
      })

      setArr(data.products.nodes)
    }
  }, [search])


  return (
    <Wrapper>
      <div className="container">
        <Label>
          Szukaj: <Input onChange={(e) => { setSearch(e.currentTarget.value) }} />
          <Results className={arr.length > 0 ? 'active' : ''}>
            {arr.map(el => (
              <Link className="item" href={el.slug}>
                {el.name}
              </Link>
            ))}
          </Results>
        </Label>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 110px;
`

const Results = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0;
  left: 0;
  background-color: #fff;
  transform: translateY(100%);
  padding: 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease-out;

  .item{
    padding: 10px;
    color: var(--dark-500);
    display: block;
  }
`

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 32rem;
  text-align: center;
  letter-spacing: 0.03em;
  color: var(--primary-500);
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  position: relative;

  &:focus-within{
    ${Results}{
      &.active{
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  input{
    max-width: 450px;
    width: 100%;
  }
`