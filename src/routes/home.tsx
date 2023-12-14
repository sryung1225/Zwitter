import WindowTop from '../components/window-top.tsx';
import PostTweetForm from '../components/post-tweet-form.tsx';
import Timeline from '../components/timeline.tsx';
import * as W from '../styles/window.ts';

export default function Home() {
  return (
    <W.Window>
      <WindowTop />
      <PostTweetForm />
      <Timeline />
    </W.Window>
  );
}
