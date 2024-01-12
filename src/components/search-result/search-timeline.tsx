import { useLocation } from 'react-router-dom';
import { orderBy, where } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import Tweet from '@compo/home/tweet.tsx';
import searchKeywordAtom from '@atom/search-keyword.tsx';
import * as S from '@style/timeline.ts';
import useTimeline from '@hook/useTimeline.tsx';

export default function SearchTimeline() {
  const location = useLocation();
  const searchKeywordFromLocation = decodeURIComponent(
    location.search.slice(7),
  );
  const searchKeywordAtomValue = useRecoilValue(searchKeywordAtom);
  const searchKeyword = searchKeywordFromLocation || searchKeywordAtomValue;
  const queryOptions = [
    orderBy('tweet'),
    where('tweet', '>=', searchKeyword),
    where('tweet', '<=', `${searchKeyword}\uf8ff`),
  ];
  const tweets = useTimeline(queryOptions);
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
