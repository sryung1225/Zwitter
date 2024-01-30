import 'styled-components';
import { ColorsTypes, FontsTypes } from '@style/theme.ts';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
    // eslint-disable-next-line no-unused-vars
    LogoTextShadow: (offset: number) => string;
  }
}
