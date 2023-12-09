import { createGlobalStyle, styled } from 'styled-components';
import reset from 'styled-reset';

export const primaryColor = '#FF7AB2';
export const grayColor = '#A7A7A7';
export const blackColor = '#070707';
export const whiteColor = '#FAFAFA';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const GlobalStyles = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'Ycomputer-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/Ycomputer-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
    font-family: Galmuri11, sans-serif;
    color: ${blackColor};
  }
  body {
    background-color: ${whiteColor};
    font-family: Galmuri11, sans-serif;
  }
  h1, h2 {
    font-family: 'Ycomputer-Regular', sans-serif;
  }
  button {
    cursor: pointer;
    &:hover,
    &:active {
      opacity: 0.8;
    }
  }
  .a11yHidden {
    display: inline-block;
    overflow: hidden;
    clip: rect(0px, 0px, 0px, 0px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute !important;
  }
`;
