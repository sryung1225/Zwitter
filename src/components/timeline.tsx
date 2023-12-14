import { useEffect, useState } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';
import { db } from '../firebase.ts';
import Tweet from './tweet.tsx';
import * as S from '../styles/timeline.ts';
import ITweet from '../interfaces/ITweet.ts';

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, 'tweets'),
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
  }, []);
  return (
    <S.TimelineWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.TimelineWrapper>
  );
}
