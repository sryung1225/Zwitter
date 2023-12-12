import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase.ts';
import UserTimeline from '../components/user-timeline.tsx';
import * as S from '../styles/profile.ts';
import { ReactComponent as IconUser } from '../assets/images/i-user.svg';

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
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
    }
  };
  return (
    <S.Wrapper>
      <S.AvatarUpload htmlFor="avatar">
        {avatar ? <S.AvatarImage src={avatar} /> : <IconUser />}
      </S.AvatarUpload>
      <S.AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <S.Name>{user?.displayName ?? 'Anonymous'}</S.Name>
      <UserTimeline />
    </S.Wrapper>
  );
}
