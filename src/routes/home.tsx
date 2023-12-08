import styled from 'styled-components';
import PostTweetForm from '../components/post-tweet-form.tsx';

const Wrapper = styled.div``;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
    </Wrapper>
  );
}
