import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase.ts';
import Tweet from './tweet.tsx';
import * as S from '../styles/layout.ts';
import ITweet from '../interfaces/ITweet.ts';

export default function UserTimeline() {
  const user = auth.currentUser;
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25),
    );
    const snapshot = await getDocs(tweetsQuery);
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
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <S.UserTimeLineWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.UserTimeLineWrapper>
  );
}
