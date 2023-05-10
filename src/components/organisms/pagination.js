import Link from "next/link"
import React, { useMemo } from "react"
import styled from "styled-components"
import { PAGE_ITEM_COUNT } from "../../constants/blog-item-counts"

// urlBasis = 'https://example.com/blog/'

export default function Pagination({ currentPage, itemCount, urlBasis }) {
  const pagesCount = useMemo(() => {
    let count = itemCount - PAGE_ITEM_COUNT
    return (Math.ceil(count / PAGE_ITEM_COUNT)) + 1
  }, [itemCount])

  const buttons = useMemo(() => {
    let arr = []
    for (let i = 0; i < pagesCount; i++) {
      arr.push(i + 1)
    }
    return arr
  }, [pagesCount])

  if (itemCount < PAGE_ITEM_COUNT + 1) {
    return null
  }

  return (
    <Wrapper>
      <Button disabled={currentPage <= 1} as={currentPage <= 1 ? 'button' : null} href={`${urlBasis}/strona/${currentPage - 1}`} className='arrow left' >
        <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.9487 29.1002C16.6838 28.3452 16.6838 27.1211 15.9487 26.3661L5.0444 15.1665L15.9487 3.96691C16.6838 3.2119 16.6838 1.98778 15.9487 1.23277C15.2136 0.477751 14.0217 0.477751 13.2866 1.23276L1.05133 13.7994C0.316224 14.5544 0.316224 15.7786 1.05133 16.5336L13.2866 29.1002C14.0217 29.8553 15.2136 29.8553 15.9487 29.1002Z" fill="white" />
        </svg>
      </Button>
      <div className="center">
        {itemCount < 51 ? (
          <>
            {buttons.map(el => (
              <Button as={currentPage === el ? 'div' : null} key={el} href={`${urlBasis}/strona/${el}`} active={currentPage === el} >
                {el}
              </Button>
            ))}
          </>
        ) : (
          <>
            {currentPage > 3
              && <Button href={`${urlBasis}`} >
                {1}
              </Button>
            }
            {currentPage > 4
              && <Button as='div' className="not" disabled>
                ...
              </Button>
            }

            {buttons.map((el, index) => {
              if (currentPage < 4 && (index < 6)) { // first 4 pages
                return (
                  <Button as={currentPage === el ? 'div' : null} key={el} href={`${urlBasis}/strona/${el}`} active={currentPage === el}>
                    {el}
                  </Button>
                )
              }
              if (currentPage > pagesCount - 3 && (index > pagesCount - 7)) { // last 4 pages
                return (
                  <Button as={currentPage === el ? 'div' : null} key={el} href={`${urlBasis}/strona/${el}`} active={currentPage === el}>
                    {el}
                  </Button>
                )
              }
              if (index >= currentPage - 3 && index <= currentPage + 1) { // all othher pages
                return (
                  <Button as={currentPage === el ? 'div' : null} key={el} href={`${urlBasis}/strona/${el}`} active={currentPage === el}>
                    {el}
                  </Button>
                )
              }
              return null
            })}

            {(currentPage === 1 || pagesCount - currentPage > 3)
              && <Button as='div' className="not" disabled>
                ...
              </Button>
            }
            {(currentPage === 1 || pagesCount - currentPage > 2)
              && (
                <Button href={`${urlBasis}/strona/${pagesCount}`}>
                  {pagesCount}
                </Button>
              )}
          </>
        )}
      </div>
      <Button disabled={currentPage >= pagesCount} as={currentPage >= pagesCount ? 'button' : null} href={`${urlBasis}/strona/${currentPage + 1}`} className={'arrow right'}>
        <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1.05133 1.23276C0.316226 1.98778 0.316226 3.2119 1.05133 3.96691L11.9556 15.1665L1.05133 26.3661C0.316224 27.1211 0.316224 28.3452 1.05133 29.1002C1.78643 29.8553 2.97827 29.8553 3.71338 29.1002L15.9487 16.5336C16.6838 15.7786 16.6838 14.5544 15.9487 13.7994L3.71338 1.23276C2.97828 0.477751 1.78643 0.47775 1.05133 1.23276Z" fill="white" />
        </svg>
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-top: 80px;
 
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
  }
`

const Button = styled(Link)`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  background-color: transparent;
 
  &.not{
    cursor: default;
  }
 
  &.arrow{
    padding: 10px;

    &:disabled{
      cursor: default;
      svg path{
        fill: #8D8D8D;
      }
    }

  }

  color: ${props => props.active ? '#8D8D8D' : 'var(--primary-500)'};
  cursor: ${props => props.active ? 'default' : 'pointer'};
`