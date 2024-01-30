import SCREEN_SIZE from '@const/screen-size.tsx';

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(SCREEN_SIZE.desktop),
  semi: customMediaQuery(SCREEN_SIZE.semi),
  tablet: customMediaQuery(SCREEN_SIZE.tablet),
  phone: customMediaQuery(SCREEN_SIZE.phone),
};

export default media;
