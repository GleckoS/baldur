import { createGlobalStyle } from 'styled-components'
import { Uncial_Antiqua } from 'next/font/google'

const uncialAntiqua = Uncial_Antiqua({ weight: '400', subsets: ['latin'] })

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: none;
  }

  *:focus-visible{
    outline: 2px solid var(--primary-500) ;
    outline-offset: 10px; 
  }

  a{
    text-decoration: none;
  }

  button{
    cursor: pointer;
  }

  :root {
    --primary-100: #F4EDED;
    --primary-200: #F3EAEA;
    --primary-300: #F1E7E7;
    --primary-400: #EFE4E4;
    --primary-500: #EDE2E2;
    --primary-600: #D5CBCB;
    --primary-700: #BEB4B4;
    --primary-800: #A69E9E;
    --primary-900: #8E8787;

    --secondary-100: #DAB6B6;
    --secondary-200: #D4ABAB;
    --secondary-300: #CEA0A0;
    --secondary-400: #C38D8D;
    --secondary-500: #C38D8D;
    --secondary-600: #AE7E7E;
    --secondary-700: #9B7070;
    --secondary-800: #886262;
    --secondary-900: #745454;

    --error-100: #E98092;
    --error-200: #E56B80;
    --error-300: #E1566D;
    --error-400: #DE415B;
    --error-500: #DA2C49;
    --error-600: #C42842;
    --error-700: #AE233A;
    --error-800: #991F33;
    --error-900: #831A2C;

    --dark-100: #6C6C6C;
    --dark-200: #545454;
    --dark-300: #3B3B3B;
    --dark-400: #232323;
    --dark-500: #0A0A0A;
    --dark-600: #090909;
    --dark-700: #080808;
    --dark-800: #070707;
    --dark-900: #060606;

    --light-100: #FFFFFF;
    --light-200: #FAFAFA;
    --light-300: #F6F6F6;
    --light-400: #F5F5F5;
    --light-500: #F4F4F4;
    --light-600: #DCDCDC;
    --light-700: #C3C3C3;
    --light-800: #B7B7B7;
    --light-900: #ABABAB;

    --success-100: #96EDCD;
    --success-200: #6BE5B9;
    --success-300: #56E1AF;
    --success-400: #41DEA5;
    --success-500: #2CDB9B;
    --success-600: #27C98F;
    --success-700: #21A67E;
    --success-800: #1F996D;
    --success-900: #1A835D;

    --title: ${uncialAntiqua.style.fontFamily};
    --text: 'Natom Pro';

    --transition: 0.3s ease-out;
  }

  html{
    background-color: var(--dark-500);
  }

  body {
    font-size: 20rem;
    background-color: var(--dark-500);
    color: var(--primary-500);
    font-family: var(--text);
    line-height: 1.5;
  }

  .container {
    max-width: 1260px;
    padding: 0 clamp(24px, calc(40vw / 7.68), 40px);
    margin: 0 auto;
  }

  h1 {
    font-family: var(--title);
    font-size: 60rem;
    line-height: 1.33;
  }

  h2 {
    font-family: var(--title);
    font-size: 48rem;
    line-height: 1.33;
  }

  h3 {
    font-family: var(--title);
    font-size: 40rem;
    line-height: 1.33;
  }

  h4{
    font-family: var(--title);
    font-size: 32rem;
    line-height: 1.33;
  }

  h5 {
    font-family: var(--title);
    font-size: 30rem;
    line-height: 1.33;
  }

  h6 {
    font-family: var(--title);
    font-size: 24rem;
    line-height: 1.33;
  }

  .error{
    color: var(--error-500);
    font-size: 14rem;
    line-height: 16rem;
  }
`

export default GlobalStyle