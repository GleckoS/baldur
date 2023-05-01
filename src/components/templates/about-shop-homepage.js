import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonOutlined from "../atoms/button-outlined"
import HTMLReactParser from "html-react-parser"

export default function About({ data: { link, image, title, text, linkTitle } }) {
  return (
    <Wrapper>
      <div className="container">
        <svg className="rune" width="145" height="136" viewBox="0 0 145 136" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M71.2957 19.3773C72.0581 18.4015 74.4825 17.5957 73.2856 16.3706C76.6371 16.0256 79.704 15.7096 83.3094 15.3413C84.0297 16.2498 85.7322 16.5136 88.2768 15.8674C89.0757 15.6672 90.7384 16.1257 90.6626 16.4062C90.219 18.0022 92.0451 18.1013 93.2773 18.5213C99.4867 20.6192 105.699 22.7259 112.087 24.6503C113.327 25.0233 115.356 24.5927 117.008 24.5655C117.879 24.5512 118.871 24.4611 119.535 24.6792C121.656 25.3772 122.715 29.4251 121.185 31.2414C119.845 32.826 118.358 34.4076 116.678 35.8834C113.572 38.6166 109.844 42.6196 108.693 44.683C114.464 45.5949 120.169 46.5538 125.968 47.3824C128.103 47.6891 130.473 47.6802 132.709 47.8542C133.97 47.9512 135.229 48.0681 136.407 48.2815C138.073 48.5823 138.382 49.4604 137.55 50.7586C136.844 51.8521 136.188 52.948 135.483 54.0414C135.231 54.431 134.688 54.852 134.651 55.1975C134.359 57.8088 131.64 59.7385 128.714 61.6853C124.156 64.7197 121.112 68.3029 118.104 71.8736C115.741 74.6752 113.492 77.5011 111.234 80.3207C110.46 81.2858 109.808 82.2728 108.974 83.4245C108.193 83.3887 107.379 83.3541 106.348 83.3059C103.751 84.9 100.987 86.3608 100.605 83.1189C96.3796 83.0876 94.4775 81.6194 93.7939 78.9066C93.0378 75.9103 91.2019 73.2496 89.9769 70.3894C88.35 66.5948 86.8901 62.7381 85.3145 58.9259C84.319 56.5207 83.1784 54.1701 82.2121 51.7548C80.6163 47.7881 78.8857 43.8577 77.6796 39.7623C77.0772 37.7169 77.5884 35.3145 77.4314 33.1117C77.1899 29.8021 76.8956 26.5056 76.4065 23.2613C76.32 22.6741 75.3408 22.1087 74.4545 22.006C72.2779 21.7675 71.4036 20.8872 71.2957 19.3773ZM117.48 57.6027C115.141 58.3496 115.21 58.287 113.497 57.5862C112.336 57.1123 111.059 56.6786 109.642 56.5079C107.053 56.1901 104.342 56.0615 101.652 55.9009C101.083 55.8656 100.397 56.0369 99.6898 56.1224C99.545 61.4343 102.317 65.5368 104.613 69.9001C109.064 65.6444 113.293 61.6016 117.478 57.5983L117.48 57.6027ZM93.6537 44.1602C96.9087 40.4511 100.068 36.8922 103.112 33.309C103.458 32.9069 103.505 32.1124 103.141 31.9336C100.629 30.6937 98.0944 29.4569 95.3058 28.4587C93.7496 27.905 91.6916 27.8217 89.3113 27.4424C89.4413 28.3476 89.4064 28.7952 89.5823 29.1657C90.6653 31.4676 90.4437 34.1183 90.7543 36.6259C91.0908 39.2813 91.1276 42.1127 93.6449 44.1584L93.6537 44.1602Z" fill="#9AACB8" fillOpacity="0.3" />
          <g clipPath="url(#clip0_1130_3226)">
            <path d="M29.6713 44.4519C32.8959 41.992 36.972 42.3174 39.9209 45.1005C42.4116 47.4545 44.5083 50.1061 46.3272 52.9944C49.1834 57.5426 52.113 62.0357 54.9121 66.6104C55.8855 68.2053 56.4895 70.0263 57.3818 71.6744C59.9966 76.5337 62.7128 81.3408 65.3078 86.2116C66.3567 88.1765 67.2378 90.2382 68.1458 92.2781C69.3081 94.8838 70.3591 97.5474 71.5784 100.127C72.8733 102.859 74.235 105.56 75.7053 108.198C77.1178 110.735 76.2822 113.196 75.4047 115.631C75.0457 116.627 74.0644 116.99 72.8743 116.729C70.2129 116.153 67.5025 115.778 64.8448 115.174C60.3434 114.146 55.8763 112.984 51.3837 111.926C49.8827 111.571 48.351 111.265 46.812 111.13C43.0345 110.797 39.5046 109.686 35.9821 108.462C33.0854 107.456 30.1334 106.57 27.1739 105.74C25.2102 105.188 22.2129 101.09 22.5895 99.1105C22.6954 98.5531 23.1132 97.841 23.5946 97.5695C27.6738 95.2907 29.2832 91.2184 31.4375 87.5314C33.1296 84.6393 34.8608 81.7691 36.5815 78.8924C36.861 78.4192 37.1845 77.9653 37.4354 77.4768C38.8281 74.7385 39.8993 71.785 41.6741 69.3096C43.1682 67.2254 42.4392 65.4384 41.9178 63.7035C40.9623 60.533 39.4178 57.6071 37.3436 54.9489C34.7145 51.5803 32.2959 48.0521 29.6894 44.4605L29.6713 44.4519ZM47.2392 74.3107C44.5549 79.8944 42.1967 84.9716 39.6802 89.9685C38.4532 92.4012 36.9073 94.6808 35.5506 97.0484C35.1262 97.7833 34.8447 98.5948 34.4918 99.3967C35.2974 99.7778 35.7755 100.036 36.2739 100.238C39.8022 101.643 43.6749 101.571 47.3523 102.368C50.7431 103.102 54.1418 103.678 57.274 105.172C58.9088 105.953 60.6429 106.198 62.8703 106.102C57.619 95.4227 52.5132 85.0408 47.2392 74.3107Z" fill="#9AACB8" fillOpacity="0.3" />
          </g>
          <defs>
            <clipPath id="clip0_1130_3226">
              <rect width="45" height="85" fill="white" transform="translate(81.4711 112.612) rotate(150)" />
            </clipPath>
          </defs>
        </svg>
        <Content>
          <h2>{title}</h2>
          <div className="text">
            {HTMLReactParser(text)}
          </div>
          <div className="link-wrap">
            <p className="h4">{linkTitle}</p>
            <ButtonOutlined href={link.url}>
              {link.title}
            </ButtonOutlined>
          </div>
        </Content>
        <ImageWrapper width={image.mediaDetails.width} minHeight={image.mediaDetails.height}>
          <Image
            className="image"
            src={image.mediaItemUrl}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
          />
        </ImageWrapper>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  overflow: hidden;
  padding-bottom: 100px;
  margin-bottom: -100px;

  .rune{
    position: absolute;
    right: 0;
    bottom: -70px;

    @media (max-width: 864px){
      bottom: 50%;
      transform: translateY(100%);
    }

    @media (max-width: 640px) {
      display: none; 
    }
  }

  .container{
    display: grid;
    grid-template-columns: 608px 1fr;
    align-items: center;
    position: relative;

    @media (max-width: 864px) {
      grid-template-columns: 1fr;
    }
  }
`

const Content = styled.div`
  padding-bottom: 11px;
  max-width: 608px;

  .text{
    margin: 30px 0 clamp(50px, ${80 / 768 * 100}vw, 80px);
    display: grid;
    grid-gap: 30px;
  }

  .link-wrap{
    margin-left: 80px;

    @media (max-width: 768px) {
      margin-left: 0;
    }

    .h4{
      @media (max-width: 480px) {
        text-align: center;
      }
    }

    span{
      @media (max-width: 480px) {
        font-size: clamp(0rem, ${25 / 480 * 100}vw, 25rem) !important;
      }
      @media (max-width: 360px) {
        font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem) !important;
      }
    }
  }

  h3{
    margin-bottom: 5px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => props.minHeight}px;
  @media (max-width: 864px){
    min-height: unset;
    width: calc(100% + clamp(48px,calc(80vw / 7.68),80px));
    transform: translateX(calc(-1 * clamp(24px,calc(40vw / 7.68),40px)));
    overflow: hidden;
  }

  .image{
    position: absolute;
    z-index: -1;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 1240px) {
      left: -100px;
    }
    @media (max-width: 1024px) {
      left: -200px;
    }
    @media (max-width: 864px){
      position: relative;
      left: unset;
      top: unset;
      transform: unset;
      width: 100%;
      height: fit-content;
      left: 50%;
      transform: translateX(-50%);
      min-width: 520px;
    }
  }
`