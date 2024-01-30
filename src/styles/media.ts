const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(992),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
};

export default media;
