import WindowTop from '../components/window-top.tsx';
import UserTimeline from '../components/user-timeline.tsx';
import * as W from '../styles/window.ts';
import UserProfile from '../components/user-profile.tsx';

export default function Profile() {
  return (
    <W.Window>
      <WindowTop />
      <UserProfile />
      <UserTimeline />
    </W.Window>
  );
}
