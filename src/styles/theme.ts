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
  LogoTextShadow: (offset: number) =>
    `${-offset}px 0px ${theme.colors.black}, 0px ${offset}px ${
      theme.colors.black
    }, ${offset}px 0px ${theme.colors.black}, 0px ${-offset}px ${
      theme.colors.black
    }`,
};

export default theme;
