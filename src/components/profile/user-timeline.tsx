import IUser from '@type/IUser.ts';
import Tweet from '@compo/home/tweet.tsx';
import * as S from '@style/timeline.ts';
import useTimeline from '@hook/useTimeline.tsx';
import { where } from 'firebase/firestore';

interface IUserTimeline {
  user: IUser;
}

export default function UserTimeline({ user }: IUserTimeline) {
  const queryOptions = [where('userId', '==', user.userId)];
  const { tweets } = useTimeline({ queryOptions });
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
