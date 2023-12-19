import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase.ts';
import WindowTop from '../components/window-top.tsx';
import UserTimeline from '../components/user-timeline.tsx';
import * as W from '../styles/window.ts';
import * as S from '../styles/profile.ts';
import { ReactComponent as IconUser } from '../assets/images/i-user.svg';

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const updateUserAvatar = async (uid: string, newAvatarUrl: string) => {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      userAvatar: newAvatarUrl,
    });
  };
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
      await updateUserAvatar(user.uid, avatarUrl);
    }
  };
  return (
    <W.Window>
      <WindowTop />
      <S.Avatar>
        <S.AvatarUpload htmlFor="avatar">
          {avatar ? (
            <S.AvatarImage
              src={avatar}
              alt="프로필 이미지"
              width="120"
              height="120"
            />
          ) : (
            <IconUser />
          )}
        </S.AvatarUpload>
        <S.AvatarInput
          onChange={onAvatarChange}
          id="avatar"
          type="file"
          accept="image/*"
        />
        <S.Name>{user?.displayName ?? 'Anonymous'}</S.Name>
      </S.Avatar>
      <UserTimeline />
    </W.Window>
  );
}
