import Tweet from '@compo/home/tweet.tsx';
import * as S from '@style/timeline.ts';
import useTimeline from '@hook/useTimeline.tsx';
import { useEffect } from 'react';

export default function Timeline() {
  const { tweets, loadMoreTweets, loading } = useTimeline({ queryOptions: [] });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreTweets();
        }
      },
      { threshold: 1.0 },
    );

    const loadMoreElement = document.querySelector('#loadMore');
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }
    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
      observer.disconnect();
    };
  }, [loading, loadMoreTweets]);

  return tweets.length !== 0 ? (
    <S.TimelineWrapper id="timeline">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
      <S.Text>더보기</S.Text>
    </S.TimelineWrapper>
  ) : (
    <p id="loadMore">흑흑 tweets의 모양은 지금 {tweets.length}</p>
  );
}
