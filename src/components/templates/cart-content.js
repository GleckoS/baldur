import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"
import Card from "../moleculas/cart-card"

export default function Content({ data }) {

  const [items, setItems] = useState(() => { [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setItems(data)
    setLoading(false)
  }, [data])

  if (loading)
    return <div className="container">loading...</div>

  return (
    <Wrapper>
      <div className="container">
        <ColumnContent>
          <div className="grid">
            {items?.map((item, index) => (
              <Card data={item} key={item.id + index} />
            ))}
          </div>
          <Link className="back-link" href='/sklep'>
            <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.1212 18.629C10.6028 18.1343 10.6028 17.3323 10.1212 16.8377L2.97703 9.5L10.1212 2.16234C10.6028 1.66767 10.6028 0.865662 10.1212 0.370999C9.63959 -0.123666 8.85873 -0.123666 8.37711 0.370998L0.360878 8.60433C-0.120742 9.09899 -0.120742 9.901 0.360878 10.3957L8.3771 18.629C8.85872 19.1237 9.63959 19.1237 10.1212 18.629Z" fill="#EDE2E2" />
            </svg>
            Wróć do sklepu
          </Link>
        </ColumnContent>
        <Summary>
          <div className="box">
            <h2>Podsumowanie:</h2>
            <div className="flex">
              <span>PRODUKTY:</span>
              <span>&nbsp;zł</span>
            </div>
            <div className="flex">
              <span>WYSYŁKA:</span>
              <span>20&nbsp;zł</span>
            </div>
            <div className="flex">
              <span>RAZEM:</span>
              <span>&nbsp;zł</span>
            </div>
          </div>
          <ButtonFilled className='button' href='/zamowienie'>
            ZAMAWIAM
          </ButtonFilled>
        </Summary>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-top: 80px;

  .container{
    border-bottom: 1px solid #EDE2E2;
    display: grid;
    grid-template-columns: 1fr 435px;
    gap: 24px;
  }

  .back-link{
    display: flex;
    align-items: center;
    gap: 12px;
    line-height: 33px;
    color: var(--primary-500);
  }
`

const ColumnContent = styled.div`
  margin-bottom: 32px;
  .grid{
    display: grid;
    gap: 32px;
  }
`

const Summary = styled.aside`
  max-width: 435px;
  .box {
    background-color: var(--primary-500);
    padding: 24px 24px 60px 24px;
    margin-bottom: 24px;

    .flex{
      display: flex;
      gap: 12px;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      span{
        &:first-child{
          font-size: 20rem;
        }

        &:last-child{
          font-weight: 500;
          font-size: 28rem;
        }
      }

      &:last-child{
        span{
          &:first-child{
            font-size: 28rem;
          }

          &:last-child{
            font-size: 36rem;
          }
        }
      }
    }
    
    h2{
      font-family: var(--text);
      font-size: 32rem;
      font-weight: 500;
      margin-bottom: 60px;
    }

    *{
      color: var(--dark-500);
    }
  }

  .button{
    margin: 0 auto;
  }
`