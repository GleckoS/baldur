import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonFilled from "../atoms/button-filled"
import Link from "next/link"

export default function Card({ data: { name, image, regularPrice, salePrice, acf, uri } }) {

  return (
    <Wrapper className="card">
      <Link href={uri} className="shop-link" />
      <div className="mobile-wrap">
        <div className="images">
          {image ? (
            <Image
              src={image.mediaItemUrl}
              alt={image.altText}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
            />
          ) : (
            <Image
              src='/placeholder.jpg'
              alt='image placeholder'
              width={398}
              height={264}
            />
          )}
        </div>
        <div className="content">
          <p className="name">{name}</p>
          <div className="flex">
            <div>
              {acf?.description?.map(el => (
                <p key={el.line}>{el.line}</p>
              ))}
            </div>
            <div>
              <span className={salePrice ? 'discounted regular' : 'regular'}>{regularPrice}zł</span>
              {salePrice && <span className="discount">{salePrice}zł</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <ButtonFilled className='shop-button' as='button'>
          <span>
            Kup teraz
          </span>
        </ButtonFilled>
        <button className="cart">
          <span>
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9928 11.4483V7.16263H10.6449V4.30549H14.9928V0.0197754H17.8913V4.30549H22.2391V7.16263H17.8913V11.4483H14.9928ZM9.19565 30.0198C8.39855 30.0198 7.71642 29.7403 7.14927 29.1812C6.58116 28.6212 6.2971 27.9483 6.2971 27.1626C6.2971 26.3769 6.58116 25.7041 7.14927 25.1441C7.71642 24.585 8.39855 24.3055 9.19565 24.3055C9.99275 24.3055 10.6749 24.585 11.242 25.1441C11.8101 25.7041 12.0942 26.3769 12.0942 27.1626C12.0942 27.9483 11.8101 28.6212 11.242 29.1812C10.6749 29.7403 9.99275 30.0198 9.19565 30.0198ZM23.6884 30.0198C22.8913 30.0198 22.2092 29.7403 21.642 29.1812C21.0739 28.6212 20.7899 27.9483 20.7899 27.1626C20.7899 26.3769 21.0739 25.7041 21.642 25.1441C22.2092 24.585 22.8913 24.3055 23.6884 24.3055C24.4855 24.3055 25.1681 24.585 25.7362 25.1441C26.3034 25.7041 26.587 26.3769 26.587 27.1626C26.587 27.9483 26.3034 28.6212 25.7362 29.1812C25.1681 29.7403 24.4855 30.0198 23.6884 30.0198ZM26.587 22.8769H4.30435L8.61594 15.1626L3.39855 4.30549H0.5V1.44835H5.24638L11.4058 14.3055H21.587L27.2029 4.30549H30.5L23.2899 17.1626H10.7899L9.19565 20.0198H26.587V22.8769Z" fill="#0A0A0A" />
            </svg>
          </span>
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--primary-500);
  position: relative;
  height: 100%;

  .shop-link{
    position: absolute;
    inset: 0;
    display: block;
  }

  .images{
    position: relative;
    overflow: hidden;
    aspect-ratio: 398/264;
    z-index: -1;
    
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

  .flex{
    margin-top: 10px;
    display: flex;
    gap: 6px;
    align-items: flex-end;
    justify-content: space-between;
  }

  .discount{
    display: block;
  }

  .regular{
    display: block;
    &.discounted{
      text-decoration: var(--error-500) solid 3px line-through; 
    }
  }

  img{
    width: 100%;
    height: fit-content;
  }

  .content{
    padding: 28px 24px 32px 24px;
  }

  .name{
    font-weight: 500;
  }

  .buttons{
    padding: 0 24px 28px 24px;
    display: flex;

    .shop-button{
      min-width: unset;
      width: 100%;
      height: 51px;

      span{
        font-size: 20rem;
        text-transform: uppercase;
        clip-path: polygon(0 0,100% 0%,calc(100% - 26px) 100%,0% 100%);
      }
    }
  }

  .cart {
    border: none;
    height: 51px;
    margin-left: -15px;
    width: fit-content !important;
    background-color: transparent;

    span{
      padding: 10px 22px 10px 38px;
      height: 51px;
      display: block;
      border: none;
      background-color: var(--primary-500);
      clip-path: polygon(26px 0, 100% 0%, 100% 100%, 0% 100%);
    }
  }

  @media (max-width: 864px) {
    border: none;
    .mobile-wrap{
      border: 1px solid var(--primary-500);
      height: 100%;
    }

    .content{
      padding-bottom: 28px;
    }

    .buttons{
      margin-top: 10px;
      padding: 0;
    }
  }
`