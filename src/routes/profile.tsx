import WindowTop from '@compo/window-top.tsx';
import UserProfile from '@compo/profile/user-profile.tsx';
import UserTimeline from '@compo/profile/user-timeline.tsx';
import * as W from '@style/window.ts';

export default function Profile() {
  return (
    <W.Window>
      <WindowTop />
      <UserProfile />
      <UserTimeline />
    </W.Window>
  );
}
