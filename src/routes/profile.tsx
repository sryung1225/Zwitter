import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import WindowTop from '@compo/window-top.tsx';
import UserProfile from '@compo/profile/user-profile.tsx';
import UserTimeline from '@compo/profile/user-timeline.tsx';
import currentUserAtom from '@atom/current-user.tsx';
import IUser from '@type/IUser.ts';
import * as W from '@style/window.ts';

export default function Profile() {
  const location = useLocation();
  const userFromLocation = location.search.slice(7);
  const [user, setUser] = useState<IUser | undefined>();
  const currentUser = useRecoilValue(currentUserAtom);
  useEffect(() => {
    const fetchUser = async () => {
      const usersQuery = query(
        collection(db, 'users'),
        where('userId', '==', userFromLocation),
      );
      const snapshot = await getDocs(usersQuery);
      const userData = snapshot.docs[0].data() as IUser;
      setUser(userData);
    };
    fetchUser();
  }, [userFromLocation, currentUser]);
  return (
    <W.Window>
      <WindowTop />
      {user && (
        <>
          <UserProfile user={user} />
          <UserTimeline user={user} />
        </>
      )}
    </W.Window>
  );
}
