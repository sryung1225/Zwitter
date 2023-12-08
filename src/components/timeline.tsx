import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import styled from 'styled-components';
import { db } from '../firebase.ts';
import Tweet from './tweet.tsx';

export interface ITweet {
  id: string;
  userId: string;
  userName: string;
  tweet: string;
  createdAt: number;
  photo: string;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc'),
    );
    await onSnapshot(tweetsQuery, (snapshot) => {
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
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
