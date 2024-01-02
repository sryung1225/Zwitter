import { atom } from 'recoil';

const searchKeywordAtom = atom({
  key: 'searchKeyword',
  default: '',
});

export default searchKeywordAtom;
