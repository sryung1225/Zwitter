import { ITweet } from './timeline.tsx';
import * as S from '../styles/components/tweet.ts';

export default function Tweet({ userName, photo, tweet }: ITweet) {
  return (
    <S.Wrapper>
      <S.Column>
        <S.Username>{userName}</S.Username>
        <S.Payload>{tweet}</S.Payload>
      </S.Column>
      {photo ? (
        <S.Column>
          <S.Photo src={photo} />
        </S.Column>
      ) : null}
    </S.Wrapper>
  );
}
