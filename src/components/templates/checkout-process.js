import React, { useState } from "react"
import styled from "styled-components"
import { Input } from "../atoms/input"
import Image from "next/image"
import Link from "next/link"
import ButtonFilled from "../atoms/button-filled"

export default function Process({ data }) {

  const [form, setForm] = useState({
    name: '',
    surName: '',
    phone: '',
    message: '',

    postCode: '',
    city: '',
    street: '',
    country: '',

    forFirm: false,
    firmName: '',
    firmNip: '',

    paymentMethod: ''
  })

  return (
    <Wrapper>
      <div className="container">
        <Form>
          <fieldset>
            <legend>Dane kontaktowe</legend>
            <label>
              <span>Imię:</span>
              <Input />
            </label>
            <label>
              <span>Nazwisko:</span>
              <Input />
            </label>
            <label>
              <span>Numer Telefonu: </span>
              <Input />
            </label>
            <label>
              <span>Adres Email:</span>
              <Input />
            </label>
          </fieldset>
          <fieldset>
            <legend>Dane  adresowe</legend>
            <label>
              <span>Kod pocztowy:</span>
              <Input />
            </label>
            <label>
              <span>Ulica i Nr lokalu/domu:</span>
              <Input />
            </label>
            <label>
              <span>Kraj: </span>
              <Input />
            </label>
            <label>
              <span>Miasto:</span>
              <Input />
            </label>
          </fieldset>
          <fieldset>
            <label className="check box-wrap">
              <input type='checkbox' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <p>Kupuję na firmę</p>
            </label>
          </fieldset>
          <fieldset className="firm">
            <label>
              <span>Nazwa firmy: </span>
              <Input />
            </label>
            <label>
              <span>NIP:</span>
              <Input />
            </label>
          </fieldset>
          <fieldset className="payment">
            <legend>Wybierz płatność</legend>
            <label className="radio box-wrap">
              <input defaultChecked type="radio" name="payment" value='blik' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/blik.png' width={212} height={133} alt='ikona blik' />
            </label>
            <label className="radio box-wrap">
              <input type="radio" name="payment" value='przelewy24' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/p24.png' width={183} height={72} alt='ikona przelewy 24' />
            </label>
          </fieldset>
          <fieldset className="payment">
            <legend>Wybierz sposób dostawy</legend>
            <label className="radio box-wrap">
              <input defaultChecked type="radio" name="delivery" value='inpost' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/inpost.png' width={152} height={113} alt='ikona blik' />
            </label>
            <label className="radio box-wrap">
              <input type="radio" name="delivery" value='osobisty' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/odbior.png' width={226} height={133} alt='ikona odbioru osobistego' />
            </label>
          </fieldset>
          <div className="summary">
            <div className="flex">
              <span>PRODUKTY: </span>
              <span>zł</span>
            </div>
            <div className="flex">
              <span>WYSYŁKA: </span>
              <span>zł</span>
            </div>
            <div className="flex">
              <span>RAZEM: </span>
              <span>zł</span>
            </div>
          </div>
          <label className="check box-wrap small-text">
            <input type='checkbox' />
            <span className="box">
              <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
              </svg>
              <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
              </svg>
            </span>
            <p>Przeczytałem/am <Link href='/regulamin'>regulamin</Link> i rozumiem <Link href='/polityka-prywatnosci'>politykę prywatności</Link> i cookies</p>
          </label>
          <ButtonFilled className='button' as='button'>
            <span>
              PŁATNOŚĆ
            </span>
          </ButtonFilled>
        </Form>
        <Link className="back-link" href='/koszyk'>
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.1232 18.629C10.6048 18.1343 10.6048 17.3323 10.1232 16.8377L2.97898 9.5L10.1232 2.16233C10.6048 1.66767 10.6048 0.865662 10.1232 0.370998C9.64154 -0.123667 8.86068 -0.123667 8.37906 0.370998L0.362831 8.60433C-0.118789 9.09899 -0.118789 9.901 0.362831 10.3957L8.37906 18.629C8.86068 19.1237 9.64154 19.1237 10.1232 18.629Z" fill="#EDE2E2" />
          </svg>
          Wróć do koszyku
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .back-link{
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--primary-500);
    width: fit-content; 
    margin-top: 40px;
    svg{
      margin-top: 4px;
    }
  }

  .button{
    margin: 50px auto 0;
  }

  .summary{
    margin-top: 90px;
    display: grid;
    gap: 10px;

    .flex{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 23px;
      background-color: var(--primary-500);

      span{
        &:first-child{
          text-transform: uppercase;
          font-size: 24rem;
          color: var(--dark-500);
        }

        &:last-child{
          font-size: 40rem;
          font-weight: 500;
          color: var(--dark-500);
        }
      }
    }
  }
`

const Form = styled.form`
  fieldset{
    margin-top: 60px;
    padding: 0;
    border: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 35px 25px;

    &.firm{
      margin-top: 40px;
    }

    &.payment{
      width: fit-content;
      display: flex;
      flex-wrap: wrap;
    }

    legend{
      margin-bottom: 40px;
      font-size: 36rem;
    }

    label{
      display: grid;
      gap: 10px;

      span{
        font-size: 26rem;
      }
    }
  }

  .radio{
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 46px auto;
    gap: 12px;
    padding: 0 26px;
    height: 133px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .box{
      border: 3px solid #0A0A0A;
      box-sizing: content-box;
    }
    
    input:focus-visible ~ .box{
      outline: 2px solid var(--dark-500) !important ;
      outline-offset: 2px; 
    }
  }

  .check{
    display: grid;
    align-items: center;
    grid-template-columns: 40px auto;
    gap: 15px;
    cursor: pointer;

    p{
      font-size: 36rem;
    }

    &.small-text{
      margin-top: 40px;

      p{
        font-size: clamp(16rem, ${20 / 1440 * 100}vw, 20rem);
        line-height: 200%;

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
    }
  }

  .box-wrap {
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
  }
`