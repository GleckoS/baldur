import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"
import Card from "../moleculas/cart-card"
import { gql } from "@apollo/client"
import client from "../../apollo/apollo-client"
import { useCart } from "react-use-cart"
import { Input } from "../atoms/input"
import axios from "axios"
import { toast } from "react-toastify"

export default function Content() {
  const {
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const [renderedItems, setRenderedItems] = useState([])
  const [sum, setSum] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDiscountVisible, setIsDiscountVisible] = useState(false)
  const [discountInputValue, setDiscountInputValue] = useState('')
  const [discount, setDiscount] = useState(null)

  useEffect(() => {
    const discount = JSON.parse(localStorage.getItem('discount'))
    axios.put('/api/coupon-validation', { code: discount.code })
      .then(({ data }) => {
        if (data.code) {
          setDiscount(data)
          setDiscountInputValue(discount.code)
          setIsDiscountVisible(true)
        } else {
          setDiscount(null)
        }
      })
  }, [])

  const validateCoupon = async () => {
    if (!discountInputValue) return toast('Wpisz kod rabatowy')
    axios.put('/api/coupon-validation', { code: discountInputValue })
      .then(({ data }) => {
        if (data.code) {
          setDiscount(data)
          localStorage.setItem('discount', JSON.stringify(data))
          setDiscountInputValue('')
        } else {
          toast('Nieprawidłowy kod rabatowy')
        }
      })
      .catch(() => {
        toast('Nieprawidłowy kod rabatowy')
      })
  }

  useEffect(() => {
    (async () => {
      if (items?.length > 0) {
        const { data: { products } } = await client.query({
          query: gql`
          query Kontakt($posts: [String]) {
            products(where: {slugIn: $posts}) {
              nodes {
                ... on SimpleProduct {
                  name
                  slug
                  id
                  uri
                  stockQuantity
                  price(format: RAW)
                  regularPrice(format: RAW)
                  salePrice(format: RAW)
                  acf : product {
                    repeater {
                      text
                      image {
                        altText
                        mediaItemUrl
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                  image {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        `,
          variables: {
            posts: items.map(el => el.id)
          }
        });
        let currentSum = 0
        setRenderedItems(products.nodes.map(el => {
          const item = items.find(item => item.id === el.slug)
          currentSum += (item?.quantity || 1) * el.price
          return {
            ...el,
            quantity: item?.quantity || 1
          }
        }))
        setSum(currentSum)
        setLoading(false)
      } else {
        setRenderedItems([products.nodes])
        setLoading(false)
      }
    })()
  }, [items])

  if (loading)
    return <div className="container">loading...</div>

  return (
    <Wrapper>
      <div className="container">
        <div className="grid">
          {renderedItems?.map((item, index) => (
            <Card updateItemQuantity={updateItemQuantity} removeItem={removeItem} data={item} key={item.id + index} />
          ))}
        </div>
        <div className="other">
          <CheckBox>
            <input defaultChecked={isDiscountVisible} onChange={(e) => { setIsDiscountVisible(e.currentTarget.checked) }} type='checkbox' />
            <span className="box">
              <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
              </svg>
              <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
              </svg>
            </span>
            <p>Mam kod rabatowy</p>
          </CheckBox>
          <Discount>
            {isDiscountVisible && (
              <>
                <p>Kod rabatowy:</p>
                <div className="input-wrap">
                  <Input value={discountInputValue} onChange={(e) => { setDiscountInputValue(e.currentTarget.value) }} />
                  <button onClick={validateCoupon}>ZASTOSUJ</button>
                </div>
              </>
            )}
          </Discount>
          <Link className="back-link" href='/sklep'>
            <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.1212 18.629C10.6028 18.1343 10.6028 17.3323 10.1212 16.8377L2.97703 9.5L10.1212 2.16234C10.6028 1.66767 10.6028 0.865662 10.1212 0.370999C9.63959 -0.123666 8.85873 -0.123666 8.37711 0.370998L0.360878 8.60433C-0.120742 9.09899 -0.120742 9.901 0.360878 10.3957L8.3771 18.629C8.85872 19.1237 9.63959 19.1237 10.1212 18.629Z" fill="#EDE2E2" />
            </svg>
            Wróć do sklepu
          </Link>
        </div>
        <Summary>
          <div className="box">
            <h2>Podsumowanie:</h2>
            <div className="flex">
              <span>PRODUKTY:</span>
              <span>{sum}&nbsp;zł</span>
            </div>
            <div className="flex">
              <span>WYSYŁKA:</span>
              <span>20&nbsp;zł</span>
            </div>
            {discount && (
              <div className="flex">
                <span>KOD RABATOWY ({discount.code}):</span>
                <span>{Math.round(Number(discount.amount))}&nbsp;{discount.discount_type === "percent" ? '%' : 'zł'}</span>
              </div>
            )}
            <div className="flex">
              <span>RAZEM:</span>
              <span>{(() => {
                if (discount) {
                  if (discount.discount_type === "percent") {
                    return Math.round(sum * (1 - Number(discount.amount) / 100)) + 20
                  } else {
                    return Math.round(sum - Number(discount.amount)) + 20
                  }
                }
                return sum + 20
              })()}&nbsp;zł</span>
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

const CheckBox = styled.label`
  display: grid;
  grid-template-columns: 40px auto;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  cursor: pointer;

  span{
    display: block;
  }

  input{
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  input ~ .box{
    margin-top: 4px;
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    overflow: hidden;

    .left{
      position: absolute;
      left: 2px;
      top: 2px;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: all .2s ease-out .2s;
    }

    .right{
      position: absolute;
      right: 2px;
      top: 2px;
      opacity: 0;
      transform: translate(50%, -50%);
      transition: all .2s ease-out;
    }
  }

  input:focus-visible ~ .box{
    outline: 2px solid var(--primary-500) ;
    outline-offset: 2px; 
  }

  input:checked ~ .box{
    .left{
      transform: unset;
      opacity: 1;
    }
    .right{
      transform: unset;
      opacity: 1;
    }
  }

  p{
    font-size: clamp(16rem, ${20 / 1440 * 100}vw, 20rem);

    @media (max-width: 864px) {
      font-size: clamp(16rem, ${20 / 768 * 100}vw, 20rem);
    }

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
    }

    a{
      color: var(--secondary-500);
      text-decoration: underline;
    }
  }
`

const Discount = styled.div`
  button{
    height: 53px;
    border: none;
    background-color: var(--primary-500);
    padding: 0 30px;
    color: var(--dark-500);
    font-weight: 500;
    font-size: 24rem;
    padding-bottom: 2px;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  input{
    height: 53px;
  }

  p{
  }

  .input-wrap{
    display: flex;
    margin-top: 10px;

    @media (max-width: 520px) {
      flex-direction: column;
      gap: 10px;
    }
  }
`

const Wrapper = styled.section`
  padding-top: 80px;

  @media (max-width: 720px) {
    padding-top: 10px;
  }

  .container{
    border-bottom: 1px solid #EDE2E2;
    padding-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr 435px;
    grid-template-rows: 1fr auto;
    gap: 24px;
    grid-template-areas: 
    'items summary'
    'other summary';

    @media (max-width: 1240px) {
      grid-template-columns: 1fr;
      max-width: 768px;
      margin: 0 auto;

      grid-template-areas: 
      'items'
      'summary'
      'other';
    }
  }

  .grid{
    grid-area: items;
    display: grid;
    gap: 32px;
  }

  .other{
    grid-area: other;
  }

  .back-link{
    display: flex;
    align-items: center;
    gap: 12px;
    line-height: 33px;
    color: var(--primary-500);
    margin-top: 40px;
  }
`

const Summary = styled.aside`
  max-width: 435px;
  grid-area: summary;
  position: sticky;
  top: 100px;
  height: fit-content;

  @media (max-width: 1240px){
    max-width: unset;
    position: static;
  }

  @media (max-width: 480px){
    width: calc(100% + 48px);
    margin-left: -24px;
  }

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

          @media (max-width: 360px) {
            font-size: clamp(0rem, ${20 / 360 * 100}vw, 20rem);
          }
        }

        &:last-child{
          font-weight: 500;
          font-size: 32rem;

          @media (max-width: 360px) {
            font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
          }
        }
      }

      &:last-child{
        span{
          &:first-child{
            font-size: 24rem;

            @media (max-width: 360px) {
              font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
            }
          }

          &:last-child{
            font-size: 40rem;

            @media (max-width: 360px) {
              font-size: clamp(0rem, ${40 / 360 * 100}vw, 40rem);
            }
          }
        }
      }
    }
    
    h2{
      font-family: var(--text);
      font-size: 32rem;
      font-weight: 500;
      margin-bottom: 60px;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${32 / 360 * 100}vw, 32rem);
      }
    }

    *{
      color: var(--dark-500);
    }
  }

  .button{
    margin: 0 auto;

    @media (max-width: 480px){
      margin: 0 24px;
      width: calc(100% - 48px);
    }
  }
`