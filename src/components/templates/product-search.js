import React, { useEffect, useState } from "react"
import styled from "styled-components"
import client from "../../apollo/apollo-client"
import { gql } from "@apollo/client"
import { Input } from "../atoms/input"
import Link from "next/link"
import Image from "next/image"

export default function Search() {

  const [search, setSearch] = useState('')
  const [arr, setArr] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    if (search.length > 0) {
      getData()
      setIsLoaded(false)
    } else {
      setArr([])
    }

    async function getData() {
      const { data } = await client.query({
        query: gql`
        query search($search: String!) {
          products(where: {search: $search}, first: 3) {
            nodes {
              uri
              name
              featuredImage {
                node {
                  altText
                  sourceUrl(size: THUMBNAIL)
                }
              }
            }
          }
        }
      `,
        variables: {
          search: search
        }
      })

      setArr(data.products.nodes)
      setIsLoaded(true)
    }
  }, [search])

  return (
    <Wrapper>
      <div className="container">
        <Label>
          <div className={isLoaded ? "input-wrap" : "input-wrap loading"}>
            Szukaj: <Input onChange={(e) => { setSearch(e.currentTarget.value) }} />
            <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
              <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.1" />
              </circle>
              <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.2" />
              </circle>
              <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.3" />
              </circle>
            </svg >
          </div>
          <Results className={arr.length > 0 ? 'active' : ''}>
            {arr.map((el, index) => (
              <Link key={el.name + index} className="item" href={el.uri}>
                <div className="images">
                  {el.featuredImage?.node ? (
                    <Image
                      src={el.featuredImage.node.sourceUrl}
                      alt={el.featuredImage.node.altText}
                      width={78}
                      height={53}
                    />
                  ) : (
                    <Image
                      src='/placeholder.jpg'
                      alt='image placeholder'
                      width={78}
                      height={53}
                    />
                  )}
                </div>
                <span>
                  {el.name}
                </span>
                <svg width="15" height="25" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.34836 0.968629C0.740001 1.59347 0.740001 2.60653 1.34836 3.23137L10.3726 12.5L1.34836 21.7686C0.739999 22.3935 0.739999 23.4065 1.34836 24.0314C1.95672 24.6562 2.94307 24.6562 3.55144 24.0314L13.6772 13.6314C14.2856 13.0065 14.2856 11.9935 13.6772 11.3686L3.55144 0.968629C2.94308 0.34379 1.95673 0.34379 1.34836 0.968629Z" fill="#0A0A0A" />
                </svg>
              </Link>
            ))}
          </Results>
        </Label>
      </div >
    </Wrapper >
  )
}

const Wrapper = styled.section`
  margin-top: 110px;


  .images{
    position: relative;
    overflow: hidden;
    height: 53px;
    width: 78px;
    
    img{
      position: absolute;
      object-fit: cover;
      inset: 0;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      max-width: none;
    }
  }

`

const Results = styled.div`
  position: absolute;
  z-index: 10;
  bottom: -10px;
  right: 0;
  left: 0;
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease-out;
  display: grid;
  gap: 4px;

  .item{
    color: var(--dark-500);
    display: block;
    background-color: #fff;
    height: 53px;
    pointer-events: none;

    display: grid;
    align-items: center;
    grid-template-columns: 78px 1fr 13px;
    padding-right: 16px;
    gap: 10px;

    span{
      text-align: left;
      font-size: 20rem;
      line-height: 100%;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      padding: 5px 0;
      -webkit-box-orient: vertical;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
      }
    }

    svg{
      transition: transform .3s ease-out;
    }

    &:hover{
      svg{
        transform: translateX(5px);
      }
    }
  }
`

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: clamp(24rem, ${32 / 768 * 100}vw, 32rem);
  text-align: center;
  letter-spacing: 0.03em;
  color: var(--primary-500);
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  position: relative;

  @media (max-width: 360px) {
    font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
  }

  &:focus-within{
    ${Results}{
      &.active{
        opacity: 1;
        pointer-events: all;

        .item{
          pointer-events: all;
        }
      }
    }
  }

  .input-wrap{
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    > svg{
      transition: opacity .2s ease-out;
      opacity: 0;
      position: absolute;
      right: -13px;
      top: 0;
      height: 53px;
      width: 53px;
    }

    &.loading{
      > svg{
        opacity: 1;
      }
    }
  }

  input{
    max-width: 450px;
    width: 100%;
    padding: 4px 10px;
    height: 53px;
  }
`