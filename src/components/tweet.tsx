import { ITweet } from './timeline.tsx';
import * as S from '../styles/components/tweet.ts';
import FormattedDate from '../utils/formattedDate.tsx';

export default function Tweet({ userName, createdAt, photo, tweet }: ITweet) {
  return (
    <S.Wrapper hasPhoto={!!photo}>
      <S.Column>
        <S.Username>{userName}</S.Username>
        <S.Date>{FormattedDate(createdAt)}</S.Date>
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
