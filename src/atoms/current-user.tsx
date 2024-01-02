import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const currentUserAtom = atom({
  key: 'currentUser',
  default: null,
  effects: [persistAtom],
});

export const currentUserInfoAtom = atom({
  key: 'currentUserInfo',
  default: {
    userId: '',
    userName: '',
    userAvatar: '',
  },
  effects: [persistAtom],
});
