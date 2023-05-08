import styled from 'styled-components'
import Layout from '../layout'
import Head from 'next/head'

import Hero from '@/components/templates/hero-shop'
import Categories from '@/components/templates/categories-shop'
import CallToAction from '@/components/templates/call-to-action'
import Reviews from '@/components/templates/reviews'
import Blog from '@/components/templates/blog-slider'

import { gql } from "@apollo/client"
import client from "../apollo/apollo-client"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import ProductGrid from '@/components/templates/product-grid-shop'
import ButtonFilled from '@/components/atoms/button-filled'

const api = new WooCommerceRestApi({
  url: "https://baldur.headlesshub.com",
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3"
})

export default function Sklep({ cta, categories, posts, hero, reviews }) {
  return (
    <Layout>
      <Head>
        <title>Baldur - Strona Sklepu</title>
        <meta name="description" content='Sklep internetowy Baldur' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div className='container'>
          <svg className='background' width="653" height="709" viewBox="0 0 653 709" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M535.923 477.698C507.158 584.031 410.252 662.46 295.443 662.46C253.189 662.46 213.365 651.796 178.451 633.111C172.699 647.461 167.59 662.31 163.375 677.657C203.149 697.688 247.982 708.999 295.443 708.999C448.737 708.999 575.151 591.106 589.534 440.876C573.763 454.23 556.752 466.089 538.7 476.204C537.758 476.752 536.815 477.25 535.873 477.748L535.923 477.698Z" fill="#CCC4C4" fill-opacity="0.15" />
            <path d="M513.592 212.117L456.163 180.277C458.097 175.842 459.981 171.407 461.866 166.923C463.552 162.787 465.189 158.651 466.825 154.516L462.759 152.124L452.493 146.195L423.679 129.502L415.05 124.47L409.049 120.982C408.652 122.028 408.255 123.124 407.809 124.221C406.321 128.057 404.833 131.894 403.296 135.731C401.61 139.866 399.923 144.002 398.188 148.088L347.255 119.836L335.005 113.059C333.766 112.411 332.526 111.764 331.335 111.016L331.038 110.867C302.373 94.1246 283.825 66.52 277.675 36.2746C275.195 24.4654 274.65 12.2078 276.138 0C273.807 12.4569 272.319 24.9637 271.674 37.4704C270.286 63.8791 272.468 90.1882 278.072 115.75C266.268 116.447 254.614 117.843 243.257 119.885C105.139 144.7 0 266.329 0 412.125C0 474.659 19.3415 532.708 52.2717 580.543C60.0579 591.854 68.5881 602.616 77.7629 612.682C67.497 641.183 59.6116 671.13 54.0571 702.322C54.0571 702.521 54.0571 702.72 54.0075 702.87C53.9083 703.268 53.8587 703.667 53.7596 704.116C65.4637 706.856 77.6637 708.251 90.2109 708.251C100.576 708.251 110.743 707.255 120.612 705.361C121.604 700.08 122.695 694.897 123.885 689.715C123.984 689.217 124.133 688.719 124.232 688.27C126.464 678.454 129.043 668.788 131.87 659.271C136.531 643.674 141.937 628.577 148.136 613.927C158.353 589.661 170.652 566.79 184.984 545.315C202.342 519.255 220.246 500.42 237.95 483.628C244.1 477.798 250.25 472.168 256.3 466.686C268.401 455.724 279.857 445.31 290.768 433.651C306.836 416.41 322.21 398.422 336.939 379.787C338.576 377.694 340.213 375.601 341.849 373.509C361.637 347.947 380.136 321.289 397.097 293.685C412.52 268.621 426.704 242.711 439.598 216.302C439.648 216.202 439.648 216.153 439.747 216.053C440.045 216.302 440.441 216.701 440.739 216.95C472.628 245.501 485.423 290.197 473.471 331.354C473.322 332.002 473.124 332.6 472.925 333.198C470.743 340.323 467.817 347.349 464.048 354.126C448.426 382.627 422.191 401.562 393.03 408.737L393.625 410.78L400.221 433.8L407.61 459.412L413.611 480.539C441.136 477.2 468.016 469.925 493.457 458.963C498.863 456.621 504.219 454.18 509.476 451.589C513.443 449.546 517.51 447.403 521.428 445.211C529.115 440.926 536.604 436.242 543.844 431.209C560.458 419.799 576.031 406.544 590.165 391.596C604.795 376.199 617.838 358.959 629.145 339.975C629.741 338.878 630.385 337.882 630.98 336.786C632.071 334.942 633.113 333.048 634.204 331.105C641.693 317.502 647.941 303.6 653 289.399L513.543 212.067L513.592 212.117ZM337.832 264.087C310.06 308.633 278.121 350.389 242.711 388.357C233.735 398.074 223.271 407.491 212.261 417.507C208.194 421.194 204.028 424.981 199.813 428.867C182.753 444.663 164.552 462.551 146.301 486.169C145.111 487.664 143.97 489.209 142.78 490.803C138.614 496.334 134.448 502.164 130.332 508.392C118.331 526.28 107.618 545.016 98.1459 564.598C89.8638 553.835 82.4743 542.325 75.9775 530.267C57.1319 495.088 46.4197 454.778 46.4197 412.075C46.4197 287.655 137.275 184.113 255.804 164.93C267.707 162.986 279.907 161.94 292.305 161.791C292.553 162.488 292.851 163.136 293.099 163.734C293.694 165.328 294.339 166.823 294.983 168.368C299.943 180.227 305.596 191.737 312.093 202.849C312.192 202.849 312.291 202.749 312.391 202.699C328.112 193.88 345.817 188.897 363.819 188.498C365.009 188.498 366.249 188.498 367.44 188.498C371.457 188.498 375.523 188.747 379.491 189.246C379.193 189.943 378.896 190.541 378.598 191.189C369.423 209.725 359.554 228.012 348.991 245.85C348.247 247.046 347.602 248.242 346.858 249.388C343.932 254.321 340.957 259.204 337.931 264.037L337.832 264.087Z" fill="#CCC4C4" fill-opacity="0.15" />
          </svg>
          <div className='content'>
            <h1>DZIĘKUJEMY ZA ZŁOŻENIE ZAMÓWIENIA!</h1>
            <p className='text'>
              ZAMÓWIENIE NR: <strong>{`123123`}</strong><br />
              Potwierdzenie złożenia zamówienia otrzymasz
              na maila!
            </p>
            <p className='annotation'>
              Cieszymy się, że możemy dostarczyć dla Ciebie produkty, z których powstaną piękne noże!
              Do zobaczenia!
            </p>
            <ButtonFilled href='/'>
              WRÓĆ NA STRONĘ GŁÓWNĄ
            </ButtonFilled>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  padding-top: clamp(90px, ${160 / 768 * 100}vw, 160px);
  position: relative;
  /* overflow: hidden; */
  /* padding-bottom: clamp(80px, ${220 / 1440 * 100}vw, 220px); */
  /* margin-bottom: calc(-1 * clamp(80px, ${220 / 1440 * 100}vw, 220px)); */

  .background{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    height: fit-content;
    pointer-events: none;
    max-height: 115%;
  }

  h1{
    text-align: center;
    max-width: 600px;
    font-family: var(--text);
    font-style: normal;
    font-weight: 500;
    font-size: clamp(24rem, ${48 / 768 * 100}vw, 48rem);
    line-height: 120%;
    text-align: center;
    letter-spacing: -0.02em;
    margin: 0 auto 10px;
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
    }
  }

  .text{
    max-width: 560px;
    margin: 0 auto 50px;
    text-align: center;
    font-weight: 400;
    font-size: clamp(16rem, ${20 / 768 * 100}vw, 20rem);
    line-height: 138%;
    text-align: center;
    text-transform: uppercase;
    font-feature-settings: 'pnum' on, 'onum' on;

    @media (max-width: 480px){
      margin-bottom: 40px;
    }
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
    }

    strong{
      font-size: clamp(16rem, ${24 / 768 * 100}vw, 24rem);
      @media (max-width: 360px) {
        font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
      }
    }
  }

  .annotation{
    max-width: 660px;
    margin: 0 auto 50px;
    font-size: clamp(16rem, ${24 / 768 * 100}vw, 24rem);
    line-height: 138%;
    text-align: center;
    font-feature-settings: 'pnum' on, 'onum' on;

    @media (max-width: 480px){
      margin-bottom: 40px;
    }
    @media (max-width: 360px) {
      font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
    }
  }

  a{
    margin: 0 auto;

    @media (max-width: 480px) {
      height: 51px;
    }

    span{
      font-size: clamp(18rem, ${28 / 768 * 100}vw, 28rem);

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${18 / 360 * 100}vw, 18rem);
        clip-path: polygon(0 0,100% 0%,calc(100% - 24px) 100%,0% 100%);
      }
    }
  }
`

export async function getStaticProps() {
  return {
    props: {
      id: ''
    }
  };
}