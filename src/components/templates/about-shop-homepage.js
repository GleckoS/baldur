import Image from "next/image"
import React from "react"
import styled from "styled-components"
import ButtonOutlined from "../atoms/button-outlined"
import HTMLReactParser from "html-react-parser"

export default function About({ data: { link, image, title, text, linkTitle } }) {
  return (
    <Wrapper>
      <div className="container">
        <svg xmlns="http://www.w3.org/2000/svg" className="rune" width="145" height="136" fill="none" viewBox="0 0 145 136"><path fill="#ffffff10" d="M71.296 19.377c.762-.976 3.186-1.781 1.99-3.006 3.351-.345 6.418-.661 10.023-1.03.72.909 2.423 1.173 4.968.526.799-.2 2.461.259 2.386.54-.444 1.595 1.382 1.694 2.614 2.114 6.21 2.098 12.422 4.205 18.81 6.13 1.24.372 3.269-.058 4.921-.085.871-.015 1.863-.105 2.527.113 2.121.698 3.18 4.746 1.65 6.562-1.34 1.585-2.827 3.167-4.507 4.642-3.106 2.734-6.834 6.737-7.985 8.8 5.771.912 11.476 1.87 17.275 2.7 2.135.306 4.505.297 6.741.471 1.261.097 2.52.214 3.698.428 1.666.3 1.975 1.178 1.143 2.477-.706 1.093-1.362 2.189-2.067 3.282-.252.39-.795.811-.832 1.157-.292 2.61-3.011 4.54-5.937 6.487-4.558 3.035-7.602 6.618-10.61 10.189-2.363 2.801-4.612 5.627-6.87 8.447-.774.965-1.426 1.952-2.26 3.103-.781-.035-1.595-.07-2.626-.118-2.597 1.594-5.361 3.055-5.743-.187-4.225-.031-6.127-1.5-6.811-4.212-.756-2.997-2.592-5.657-3.817-8.518-1.627-3.794-3.087-7.65-4.663-11.463-.995-2.405-2.136-4.756-3.102-7.171-1.596-3.967-3.326-7.897-4.532-11.993-.603-2.045-.092-4.447-.249-6.65-.241-3.31-.535-6.606-1.025-9.85-.086-.588-1.065-1.153-1.952-1.256-2.176-.239-3.05-1.119-3.158-2.629Zm46.184 38.226c-2.339.747-2.27.684-3.983-.017-1.161-.474-2.438-.907-3.855-1.078-2.589-.318-5.3-.447-7.99-.607-.569-.035-1.255.136-1.962.221-.145 5.312 2.627 9.415 4.923 13.778 4.451-4.256 8.68-8.298 12.865-12.302l.002.005ZM93.654 44.16c3.255-3.709 6.414-7.268 9.458-10.851.346-.402.393-1.197.029-1.375-2.512-1.24-5.047-2.477-7.835-3.475-1.556-.554-3.614-.637-5.995-1.017.13.906.095 1.353.271 1.724 1.083 2.302.862 4.952 1.172 7.46.337 2.655.374 5.487 2.89 7.532l.01.002ZM29.671 44.452c3.225-2.46 7.301-2.135 10.25.648 2.49 2.355 4.587 5.006 6.406 7.894 2.856 4.549 5.786 9.042 8.585 13.616.974 1.595 1.578 3.416 2.47 5.064 2.615 4.86 5.33 9.667 7.926 14.538 1.049 1.965 1.93 4.026 2.838 6.066 1.162 2.606 2.213 5.27 3.432 7.849a137.705 137.705 0 0 0 4.127 8.071c1.413 2.537.577 4.998-.3 7.433-.36.996-1.34 1.359-2.53 1.098-2.662-.576-5.373-.951-8.03-1.555-4.502-1.028-8.969-2.19-13.461-3.248-1.501-.355-3.033-.661-4.572-.796-3.777-.333-7.307-1.444-10.83-2.668-2.897-1.006-5.849-1.892-8.808-2.722-1.964-.552-4.961-4.65-4.584-6.63.105-.557.523-1.269 1.005-1.54 4.079-2.28 5.688-6.352 7.843-10.039 1.692-2.892 3.423-5.762 5.143-8.639.28-.473.603-.927.854-1.415 1.393-2.739 2.464-5.692 4.24-8.167 1.493-2.085.764-3.872.243-5.607-.956-3.17-2.5-6.096-4.574-8.754-2.63-3.369-5.048-6.897-7.655-10.488l-.018-.01ZM47.24 74.31c-2.684 5.583-5.042 10.66-7.559 15.657-1.227 2.433-2.773 4.713-4.13 7.08-.424.735-.705 1.547-1.058 2.349.805.38 1.284.639 1.782.841 3.528 1.405 7.4 1.333 11.078 2.13 3.391.734 6.79 1.31 9.922 2.804 1.635.781 3.369 1.026 5.596.93-5.251-10.68-10.357-21.061-15.63-31.791Z"/></svg>
        <Content>
          <h2 className="anim">{title}</h2>
          <div className="text anim">
            {HTMLReactParser(text)}
          </div>
          <div className="link-wrap">
            <p className="h4 anim">{linkTitle}</p>
            <ButtonOutlined href={link.url} className="anim">
              {link.title}
            </ButtonOutlined>
          </div>
        </Content>
        <ImageWrapper width={image.mediaDetails.width} minHeight={image.mediaDetails.height} className="anim animNotTransform">
          <ImageBox>
            <Image
              className="image"
              src={image.mediaItemUrl}
              alt={image.altText}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
            />
          </ImageBox>
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
`

const ImageBox = styled.div`
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

  img{
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 480px) {
      left: 60%;
    }
  }

  &::after{
    content: '';
    inset: -2px;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0) 20.77%, #0A0A0A 100%);;
  }
`