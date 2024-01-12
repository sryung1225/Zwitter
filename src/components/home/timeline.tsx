import Tweet from '@compo/home/tweet.tsx';
import * as S from '@style/timeline.ts';
import useTimeline from '@hook/useTimeline.tsx';

export default function Timeline() {
  const tweets = useTimeline([]);
  return tweets.length !== 0 ? (
    <S.TimelineWrapper id="timeline">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.TimelineWrapper>
  ) : (
    <S.Text>작성된 글이 없습니다.</S.Text>
  );
}
