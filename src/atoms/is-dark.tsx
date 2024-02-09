import { atom } from 'recoil';

const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export default isDarkAtom;
