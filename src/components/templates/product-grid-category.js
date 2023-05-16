import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Card from "../moleculas/product-card"
import { Input } from "../atoms/input"
import Select from 'react-select'

const options = [
  { value: '1', label: 'Najnowsze' },
  { value: '2', label: 'Najstarsze' },
  { value: '3', label: 'Cena: od najwyższej' },
  { value: '4', label: 'Cena: on najniższej' }
]

export default function ProductGrid({ data }) {

  const [items, setItems] = useState(data)
  const [isLoaded, setIsLoaded] = useState(true)
  const [currentFilter, setCurrentFilter] = useState(options[0].value)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const preSorted = [...data]
    if (currentFilter === '1') {
      setItems(preSorted.sort((a, b) => new Date(b.dateGmt) - new Date(a.dateGmt)))
    } else if (currentFilter === '2') {
      setItems(preSorted.sort((a, b) => new Date(a.dateGmt) - new Date(b.dateGmt)))
    } else if (currentFilter === '3') {
      setItems(preSorted.sort((a, b) => b.price - a.price))
    } else if (currentFilter === '4') {
      setItems(preSorted.sort((a, b) => a.price - b.price))
    }
  }, [currentFilter])

  useEffect(() => {
    setItems(data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <Wrapper>
      <div className="container">
        <Filters>
          <div className="flex">
            <span>Sortuj:</span>
            <Select
              onChange={(e) => { setCurrentFilter(e.value) }}
              isSearchable={false}
              hideSelectedOptions={true}
              className="select"
              classNamePrefix="select"
              options={options}
              defaultValue={options[0]}
            />
          </div>
          <Label className="flex">
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
          </Label>
        </Filters>
        {items.length > 0 ? (
          <div className="grid">
            {items.map((product, index) => (
              <Card key={index} data={product} />
            ))}
          </div>
        ) : (
          <p className="not-found">
            Niestety <b>nie znaleziono</b> tego, czego szukasz
          </p>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(60px, ${80 / 768 * 100}vw, 110px);

  .not-found{
    text-align: center;
    font-size: clamp(24rem, ${32 / 768 * 100}vw, 32rem);
    text-align: center;
    margin-top: 65px;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }

    b{
      color: var(--secondary-500);
    }
  }

  .grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 50px 25px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .select{
    width: 250px;

    @media (max-width: 390px) {
      width: calc(100vw - 48px);
    }
  }

  .select__control{
    background-color: transparent;
    border: none;
    border-radius: 0px;
    box-shadow: unset !important;
    background-color: transparent;
    height: 53px;
    background-color: var(--dark-300);
  }

  .select__indicator-separator{
    display: none;
  }

  .select__input-container, .select__single-value{
    color: var(--primary-500);
    text-align: right;
  }

  .select__value-container{
    padding: 0;
  }

  .select__menu{
    background-color: var(--dark-400);
    margin-top: 0;
    padding-top: 8px;
    border-radius: 0px;
    border-top: none;
    box-shadow: none;
  }

  .select__menu-list{
    padding-top: 0;
    padding-bottom: 8px;
  }

  .select__option {
    background-color: transparent;
    text-align: right;
    padding-right: 36px;
    padding-left: 0;
    color: var(--primary-800);
    transition: all .2s ease-out;
    height: 53px;
    background-color: var(--dark-400);

    &.select__option--is-focused{
      background-color: var(--dark-300);
    }

    &:hover{
      color: var(--primary-100);
    }
  }
`

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  .flex{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    span{
      font-weight: 500;
      text-align: center;
      letter-spacing: 0.03em;
      font-size: clamp(24rem, ${32 / 768 * 100}vw, 32rem);
      
      @media (max-width: 360px) {
        font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
      }
    }
  }

  input{
    height: 53px;
  }

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 30px;
    max-width: 520px;
    width: 100%;
    align-items: flex-start;
    margin: 0 auto 50px auto;
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

  @media (max-width: 1024px) {
    margin-left: 0;
  }

  @media (max-width: 360px) {
    font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
  }

  .input-wrap{
    position: relative;
    display: flex;
    gap: 12px;

    @media (max-width: 390px) {
      flex-wrap: wrap;
    }

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
    min-width: 250px;
    width: 100%;
    padding: 4px 10px;
    height: 53px;
  }
`