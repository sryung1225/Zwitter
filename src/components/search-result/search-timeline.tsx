import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { db } from '@/firebase.ts';
import { searchKeywordAtom } from '@/atoms.tsx';
import Tweet from '@compo/home/tweet.tsx';
import ITweet from '@type/ITweet.ts';
import * as S from '@style/timeline.ts';

export default function SearchTimeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const searchKeyword = useRecoilValue(searchKeywordAtom);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('tweet'),
      where('tweet', '>=', searchKeyword),
      where('tweet', '<=', `${searchKeyword}\uf8ff`),
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
    tweetList.sort((a, b) => b.createdAt - a.createdAt);
    setTweets(tweetList);
  };
  useEffect(() => {
    fetchTweets();
  }, [searchKeyword]);
  return tweets.length !== 0 ? (
    <S.TimelineWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.TimelineWrapper>
  ) : (
    <S.Text>검색 결과가 없습니다.</S.Text>
  );
}
