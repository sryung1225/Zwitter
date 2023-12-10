import PostTweetForm from '../components/post-tweet-form.tsx';
import Timeline from '../components/timeline.tsx';
import * as S from '../styles/layout.ts';

export default function Home() {
  return (
    <S.HomeCenterWrapper>
      <PostTweetForm />
      <Timeline />
    </S.HomeCenterWrapper>
  );
}
