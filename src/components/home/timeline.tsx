import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Tweet from '@compo/home/tweet.tsx';
import timelineTweetsAtom from '@atom/timeline-tweets.tsx';
import useTimeline from '@hook/useTimeline.tsx';
import * as S from '@style/timeline.ts';

export default function Timeline() {
  const [recoilTweets, setRecoilTweets] = useRecoilState(timelineTweetsAtom);
  const tweets = useTimeline([]);
  useEffect(() => {
    if (tweets.length !== 0) {
      setRecoilTweets(tweets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweets]);
  return tweets.length !== 0 ? (
    <S.TimelineWrapper id="timeline">
      {recoilTweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.TimelineWrapper>
  ) : (
    <S.Text>작성된 글이 없습니다.</S.Text>
  );
}
