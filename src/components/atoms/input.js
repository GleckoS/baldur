import styled from "styled-components";

export const Input = styled.input`
  border: none;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  line-height: 24rem;
  color: var(--dark-500);

  @media (max-width: 360px) {
    padding: clamp(0rem, ${20 / 360 * 100}vw, 20px);
  }

  &:focus-visible{
    outline-offset: 2px;
  }
`