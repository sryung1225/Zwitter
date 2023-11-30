import { createGlobalStyle, styled } from 'styled-components';
import reset from 'styled-reset';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
