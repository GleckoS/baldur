import HTMLReactParser from "html-react-parser"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function About({ data: { image, title, firstTitle, firstText, secondTitle, secondText } }) {
  return (
    <Wrapper>
      <div className="container">
        <svg xmlns="http://www.w3.org/2000/svg" className="first-rune rune" width="76" height="89" fill="none" viewBox="0 0 76 89"><path fill="#9AACB8" d="M1.296 19.377c.762-.976 3.187-1.781 1.99-3.006 3.351-.345 6.418-.661 10.024-1.03.72.909 2.422 1.173 4.967.526.799-.2 2.461.259 2.386.54-.444 1.595 1.382 1.694 2.614 2.114 6.21 2.098 12.422 4.205 18.81 6.13 1.24.372 3.27-.058 4.921-.085.871-.015 1.863-.105 2.527.113 2.121.698 3.18 4.746 1.65 6.562-1.34 1.585-2.827 3.167-4.507 4.642-3.106 2.734-6.834 6.737-7.984 8.8 5.77.912 11.475 1.87 17.274 2.7 2.135.306 4.505.297 6.741.471 1.26.097 2.52.214 3.698.428 1.666.3 1.975 1.178 1.143 2.477-.706 1.093-1.362 2.189-2.067 3.282-.252.39-.795.811-.832 1.157-.292 2.61-3.011 4.54-5.937 6.487-4.558 3.035-7.602 6.618-10.61 10.189-2.363 2.801-4.611 5.627-6.87 8.447-.774.965-1.426 1.952-2.26 3.103-.781-.035-1.595-.07-2.626-.118-2.596 1.594-5.361 3.055-5.743-.187-4.225-.031-6.128-1.5-6.811-4.212-.756-2.997-2.592-5.657-3.817-8.518-1.627-3.794-3.087-7.65-4.662-11.463-.996-2.405-2.136-4.756-3.103-7.171-1.596-3.967-3.326-7.897-4.532-11.993-.603-2.045-.092-4.447-.249-6.65-.241-3.31-.535-6.606-1.024-9.85-.087-.588-1.066-1.153-1.952-1.256-2.177-.239-3.051-1.119-3.16-2.629ZM47.48 57.603c-2.338.747-2.27.684-3.983-.017-1.16-.474-2.438-.907-3.855-1.078-2.589-.318-5.3-.447-7.99-.607-.569-.035-1.255.136-1.962.221-.145 5.312 2.627 9.415 4.923 13.778 4.45-4.256 8.68-8.298 12.865-12.302l.002.005ZM23.654 44.16c3.255-3.709 6.414-7.268 9.458-10.851.346-.402.393-1.197.029-1.375-2.512-1.24-5.046-2.477-7.835-3.475-1.556-.554-3.614-.637-5.995-1.017.13.906.095 1.353.271 1.724 1.083 2.302.862 4.952 1.172 7.46.337 2.655.374 5.487 2.89 7.532l.01.002Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="second-rune rune" width="48" height="87" fill="none" viewBox="0 0 48 87"><path fill="#9AACB8" d="M14.641 1.37c.886-1.438 1.92-1.685 3.3-1.015 1.48.722 3.034 1.124 4.474 2.119 2.495 1.717 2.989 4.47 4.216 6.816 2.352 4.506 5.055 8.76 8.084 12.823 1.92 2.578 3.722 5.243 5.544 7.893 1.95 2.836 3.854 5.697 5.778 8.554.728 1.082 1.33 2.191.708 3.877-.932-.134-1.934-.155-2.861-.449-1.064-.335-1.797-.185-2.495.738-2 2.65-4.18 5.166-6.078 7.888-1.884 2.702-3.416 5.62-4.114 8.93-.448 2.109-1.975 2.851-4.093 2.197-3.36-1.037-5.992-3.104-8.16-5.724.294-3.098 1.476-5.66 3.257-8.048 2.245-3.006 4.272-6.182 6.486-9.213 1.43-1.954 3.208-3.542 5.631-4.244-2.642-3.856-5.111-7.666-7.784-11.327-4.19-5.744-7.545-11.946-10.31-18.494-.468-1.103-1.028-2.166-1.583-3.32Z"/><path fill="#9AACB8" d="M14.377 31.125c2.189-.119 4.301-.263 6.42.495 1.572.567 2.58 1.614 3.135 3.063.214.556.03 1.448-.285 2.005-.789 1.392-1.74 2.691-2.662 4.001-1.466 2.083-2.973 4.135-4.435 6.218-.213.304-.264.722-.432 1.067-.453.928-.896 1.862-1.41 2.759a125.554 125.554 0 0 1-2.694 4.521c-.595.944-1.277 1.83-2.077 2.955.479.48.983 1.072 1.568 1.562 3.686 3.083 7.484 6.027 11.053 9.244 3.502 3.161 6.766 6.595 10.151 9.89.51.494 1.08.948 1.68 1.335 1.965 1.258 2.846 3.382 4.088 5.212.194.284.112.763.199 1.547-1.003-.227-1.848-.283-2.576-.608-8.34-3.723-15.813-8.61-21.55-15.984-1.614-2.072-3.788-3.686-5.667-5.557-2.438-2.434-4.887-4.862-7.224-7.394-.651-.706-.916-1.779-1.339-2.691-.962-2.063.464-3.63 1.38-5.038 2.887-4.423 6.074-8.646 9.093-12.987 1.227-1.764 2.316-3.62 3.579-5.615h.005Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="third-rune rune" width="39" height="70" fill="none" viewBox="0 0 39 70"><path fill="#9AACB8" d="M-2.965 11.898c2.514.476 4.18 2.173 6.04 3.522 1.508 1.094 2.853 2.408 4.329 3.55 1.583 1.222 3.226 2.365 4.856 3.523.356.255.77.427 1.3.715.091-.425.243-.723.2-.991-.686-4.256-1.44-8.499-2.081-12.76-.276-1.822-.808-3.624-.429-5.534.138-.698-.246-1.497-.39-2.245.644-.905 1.537-1.282 2.598-1.046.894.196 1.816-.053 2.684.75 1.103 1.016 2.695 1.389 3.675 2.727 1.003 1.371 1.34 2.666.79 4.312-.381 1.143-.641 2.405-.592 3.596.123 3.013 1.245 5.83 2.134 8.763.367-.99.758-1.97 1.093-2.975 1.294-3.87 3.362-7.369 5.523-10.768.957-1.506 2.631-2.643 4.166-3.677 1.794-1.214 4.9.763 5.344 3.136.317 1.71.06 3.093-1.178 4.427-1.304 1.405-2.55 2.933-3.48 4.597-.934 1.67-1.471 3.564-2.129 5.382-1.307 3.629-2.538 7.285-3.885 10.901-.748 2.003-.5 4.078-.685 6.119-.042.436.037 1.02-.211 1.278-1.19 1.257-.83 2.648-.402 3.996.68 2.151 1.52 4.246 2.215 6.39.55 1.707.976 3.454 1.48 5.177.706 2.398 1.523 4.762 2.128 7.184.4 1.6.71 3.273.7 4.916-.013 2.33-1.802 3.175-3.928 2.1-2.507-1.267-4.077-3.292-4.83-5.929-.756-2.66-1.313-5.377-2.046-8.047-1.193-4.342-2.18-8.738-3.852-12.955-.922-2.318-1.296-4.847-1.985-7.265-.204-.712-.516-1.461-.981-2.022-3.311-4.001-7.138-7.45-11.423-10.388-1.64-1.123-2.952-2.724-4.93-3.358-.215-.068-.416-.327-.533-.544-.969-1.802-2.507-3.292-2.802-5.43.486-.357.97-.72 1.517-1.127Zm38.638-4.984c.085-.147.19-.276.237-.428.013-.04-.225-.208-.247-.191-.127.104-.226.244-.335.375l.345.244Z"/></svg>
        <ImageWrapper minHeight={image.mediaDetails.height} className="anim animNotTransform">
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
        <Content>
          <h2 className="anim">{title}</h2>
          <h3 className="big-text anim">{firstTitle}</h3>
          <div className="text anim">
            {HTMLReactParser(firstText)}
          </div>
          <h3 className="big-text anim">{secondTitle}</h3>
          <div className="text anim">
            {HTMLReactParser(secondText)}
          </div>
        </Content>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: clamp(70px, ${85 / 768 * 100}vw, 250px);
  overflow: hidden;
  padding-bottom: 150px;
  margin-bottom: -150px;

  @media (max-width: 864px) {
    padding-bottom: 0;
    padding-top: calc(clamp(70px, ${85 / 768 * 100}vw, 250px) + 150px);
    margin-top: -150px;
    margin-bottom: calc(-1 * clamp(70px, ${100 / 864 * 100}vw, 100px) - clamp(80px,13.88888888888889vw,200px)) ;
  }

  .first-rune{
    position: absolute;
    left: 20px;
    bottom: -150px;

    @media (max-width: 864px){
      bottom: unset;
      top: -100px;
      left: 60px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .second-rune{
    position: absolute;
    left: 70px;
    bottom: -90px;

    @media (max-width: 864px){
      bottom: unset;
      top: -200px;
      left: 80px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .third-rune{
    position: absolute;
    top: 10px;
    right: 40px;

    @media (max-width: 864px){
      bottom: unset;
      top: 55%;
      right: -10px;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .container{
    display: grid;
    grid-template-columns: 1fr 608px;
    gap: 80px;
    align-items: center;
    position: relative;

    @media (max-width: 1240px) {
        gap: 0;
    }

    @media (max-width: 864px){
      display: flex;
      flex-direction: column-reverse;
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => props.minHeight}px;

  @media (max-width: 864px){
    min-height: unset;
    width: 100%;
  }
`

const Content = styled.div`
  .text{
    display: grid;
    grid-gap: 30px;
  }

  h3{
    margin-top: 45px;
    margin-bottom: 15px;
  }
`

const ImageBox = styled.div`
  position: absolute;
  right:   0;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1240px) {
    right: -100px;
    z-index: -1;
  }
  @media (max-width: 1024px) {
    right: -200px;
  }
  @media (max-width: 864px){
    position: relative;
    left: unset;
    top: unset;
    transform: unset;

    height: fit-content;
    left: 50%;
    transform: translateX(-50%);
    min-width: 520px;

    max-width: 768px;
    width: 100%;
  }

  img{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    height: fit-content;

  }

  &::after{
    content: '';
    inset: -2px;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 10, 0) 20.77%, #0A0A0A 100%);;
  }
`