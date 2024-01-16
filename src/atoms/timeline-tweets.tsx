import { atom } from 'recoil';
import ITweet from '@type/ITweet.ts';

const timelineTweetsAtom = atom<ITweet[]>({
  key: 'timelineTweets',
  default: [],
});

export default timelineTweetsAtom;
