import { atom } from 'recoil';

export const signInUserAtom = atom({
  key: 'signInUser',
  default: null,
});

export const searchKeywordAtom = atom({
  key: 'searchKeyword',
  default: '',
});
