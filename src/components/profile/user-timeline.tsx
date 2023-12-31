import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import currentUserAtom from '@atom/current-user.tsx';
import { db } from '@/firebase.ts';
import ITweet from '@type/ITweet.ts';
import Tweet from '@compo/home/tweet.tsx';
import * as S from '@style/timeline.ts';

export default function UserTimeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const currentUser = useRecoilValue(currentUserAtom);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        where('userId', '==', currentUser.userId),
        orderBy('createdAt', 'desc'),
        limit(25),
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweetList = snapshot.docs.map((doc) => {
          const { userId, userName, tweet, createdAt, photo } = doc.data();
          return {
            userId,
            userName,
            tweet,
            createdAt,
            photo,
            id: doc.id,
          };
        });
        setTweets(tweetList);
      });
    };
    fetchTweets();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser.userId]);
  return tweets.length !== 0 ? (
    <S.TimelineWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.TimelineWrapper>
  ) : (
    <S.Text>작성된 글이 없습니다.</S.Text>
  );
}
