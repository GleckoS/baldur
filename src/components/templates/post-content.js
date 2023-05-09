import React, { useEffect } from "react"
import styled from "styled-components"
import { Gutenberg } from "../organisms/gutenberg-wrapper"
import Navigation from "../organisms/post-navigation"
import HTMLReactParser from "html-react-parser"
import useHeadings from "../../hooks/create-headings"
import { slugTransform } from "../../utils/slug-transform"

export default function Content({ data }) {
  const headings = useHeadings(data)

  useEffect(() => {
    document.getElementById('content').querySelectorAll('h2').forEach(el => {
      el.id = slugTransform(el.innerText)
    })
  }, [])


  return (
    <Wrapper>
      <div className="container">
        <Navigation headings={headings} />
        <Gutenberg id='content'>{HTMLReactParser(data)}</Gutenberg>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container{
    display: grid;
    grid-template-columns: 352px 1fr;
    gap: 60px;
    width: fit-content;
    margin: 0 auto;

    @media (max-width: 1024px) {
      gap: 24px;
    }

    @media (max-width: 948px) {
      grid-template-columns: 1fr;
    }
  }
`