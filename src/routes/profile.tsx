import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WindowTop from '@compo/window-top.tsx';
import UserProfile from '@compo/profile/user-profile.tsx';
import UserTimeline from '@compo/profile/user-timeline.tsx';
import * as W from '@style/window.ts';

export default function Profile() {
  const location = useLocation();
  const userFromLocation = location.search.slice(7);
  console.log(userFromLocation);
  useEffect(() => {
    /* getDocs 로직 이어서 작성해야 함 */
  }, [userFromLocation]);

  return (
    <W.Window>
      <WindowTop />
      <UserProfile />
      <UserTimeline />
    </W.Window>
  );
}
