import { DefaultTheme } from 'styled-components';

const theme = {
  colors: {
    primary: '#FF7AB2',
    gray: '#A7A7A7',
    black: '#070707',
    white: '#FAFAFA',
  },
  fonts: {
    main: 'Galmuri11, sans-serif',
    logo: 'Ycomputer-Regular, sans-serif',
  },
};

export type ColorsTypes = typeof theme.colors & {
  text: string;
  background: string;
};
export type FontsTypes = typeof theme.fonts;

export const lightTheme: DefaultTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: `${theme.colors.black}`,
    background: `${theme.colors.white}`,
  },
  LogoTextShadow: (offset: number) =>
    `${-offset}px 0px ${theme.colors.black}, 0px ${offset}px ${
      theme.colors.black
    }, ${offset}px 0px ${theme.colors.black}, 0px ${-offset}px ${
      theme.colors.black
    }`,
};

export const darkTheme: DefaultTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: `${theme.colors.white}`,
    background: `${theme.colors.black}`,
  },
  LogoTextShadow: (offset: number) =>
    `${-offset}px 0px ${theme.colors.white}, 0px ${offset}px ${
      theme.colors.white
    }, ${offset}px 0px ${theme.colors.white}, 0px ${-offset}px ${
      theme.colors.white
    }`,
};
