import { useEffect, useState } from 'react';
import {
  DocumentData,
  Query,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from '@/firebase.ts';
import ITweet from '@type/ITweet.ts';

interface IUseTimeline {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryOptions: any[];
}

export default function useTimeline({ queryOptions }: IUseTimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [lastVisible, setLastVisible] = useState<DocumentData | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  let unsubscribe: ReturnType<typeof onSnapshot> | null = null;

  const fetchNextTweets = async (after?: DocumentData) => {
    setLoading(true);
    const tweetsQuery: Query = query(
      collection(db, 'tweets'),
      ...queryOptions,
      orderBy('createdAt', 'desc'),
      after ? startAfter(after) : limit(10),
      limit(10),
    );
    unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
      const newTweets = snapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as ITweet,
      );
      setTweets((prev) => (after ? [...prev, ...newTweets] : newTweets));
      setLastVisible(
        snapshot.docs.length > 0
          ? snapshot.docs[snapshot.docs.length - 1]
          : undefined,
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNextTweets();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [queryOptions, fetchNextTweets]);

  return {
    tweets,
    loadMoreTweets: () => {
      fetchNextTweets(lastVisible);
    },
    loading,
  };
}
