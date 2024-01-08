import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { useRecoilValue } from 'recoil';
import Tweet from '@compo/home/tweet.tsx';
import searchKeywordAtom from '@atom/search-keyword.tsx';
import ITweet from '@type/ITweet.ts';
import * as S from '@style/timeline.ts';

export default function SearchTimeline() {
  const location = useLocation();
  const searchKeywordFromLocation = decodeURIComponent(
    location.search.slice(7),
  );
  const searchKeywordAtomValue = useRecoilValue(searchKeywordAtom);
  const searchKeyword = searchKeywordFromLocation || searchKeywordAtomValue;
  const [tweets, setTweets] = useState<ITweet[]>([]);
  useEffect(() => {
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
    fetchTweets();
  }, [searchKeyword]);
  return tweets.length !== 0 ? (
    <S.TimelineWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.TimelineWrapper>
  ) : (
    <S.Text>
      [<span>{searchKeyword}</span>] 에 대한 검색 결과가 없습니다.
    </S.Text>
  );
}
