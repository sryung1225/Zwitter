import WindowTop from '@compo/common/window-top.tsx';
import PostTweetForm from '@compo/home/post-tweet-form.tsx';
import Timeline from '@compo/home/timeline.tsx';
import * as W from '@style/window.ts';

export default function Home() {
  return (
    <W.Window>
      <WindowTop />
      <PostTweetForm />
      <Timeline />
    </W.Window>
  );
}
