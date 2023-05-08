import styled from "styled-components";

export const Gutenberg = styled.div`
  max-width: 688px;
  
  > * {
    &:first-child{
      margin-top: 0;
    }
  }

  h1,h2{
    font-weight: 500;
    font-size: clamp(24rem, ${40 / 768 * 100}vw, 40rem);
    color: #EDE2E2;
    scroll-margin-top: 100px;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  h3,h4,h5,h6{
    font-weight: 500;
    font-size: clamp(24rem, ${32 / 768 * 100}vw, 32rem);
    color: #EDE2E2;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  h1,h2,h3,h4,h5,h6{
    font-family: var(--text);
    margin-top: 50px;
    margin-bottom: 24px;
  }

  *{
    font-weight: 400;
    font-size: clamp(18rem, ${24 / 768 * 100}vw, 24rem);
    line-height: 138%;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem);
    }
  }

  > * + *{
    margin-top: 24px;
  }

  ul li{
    list-style: none;
    padding-left: 40px;
    position: relative;
    margin-top: 24px;

    &:first-child{
      margin-top: 0;
    }

    &::before{
      content: url('/shield.png');
      position: absolute;
      left: 0;
      top: 4px;
    }
  }

  figure{
    display: block;
    img{
      width: 100%;
      height: 100%;
    }
  }

  a{
    color: #9AACB8;
    text-decoration: underline;
    font-weight: 500;
  }

  .wp-block-columns{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }

    figure{
      width: 100%;
      height: 100%;

      img{
        width: 100%;
        height: 100%;
      }
    }
  }

  blockquote *{
    font-style: italic;
    font-size: clamp(24rem, ${30 / 768 * 100}vw, 30rem);
    line-height: 130%;

    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }
`