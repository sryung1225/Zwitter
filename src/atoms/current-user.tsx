import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const currentUserAtom = atom({
  key: 'currentUser',
  default: {
    userId: '',
    userName: '',
    userAvatar: '',
  },
  dangerouslyAllowMutability: true,
  effects: [persistAtom],
});

export default currentUserAtom;
