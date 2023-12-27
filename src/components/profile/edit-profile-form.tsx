import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { auth, db, storage } from '@/firebase.ts';
import IUser from '@type/IUser.ts';
import CompressImage from '@util/compress-image.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/profile-form.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconChange } from '@img/i-change.svg';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface IEditProfileForm extends Pick<IUser, 'userAvatar' | 'userName'> {
  onClose: () => void;
}

export default function EditProfileForm({
  userAvatar: initialAvatar,
  userName: initialName,
  onClose,
}: IEditProfileForm) {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.photoURL);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images && images.length === 1) {
      const selectedImage = images[0];
      const compressedImage = await CompressImage({
        imageFile: selectedImage,
        size: 200,
      });
      setAvatar(compressedImage);
      const previewUrl = compressedImage
        ? URL.createObjectURL(compressedImage)
        : '';
      setAvatarPreview(previewUrl);
    }
  };
  const onAvatarDelete = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const [name, setName] = useState(initialName);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || isLoading || name === '') return;
    try {
      setLoading(true);
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        userName: name,
      });
      await updateProfile(user, {
        displayName: name,
      });
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      if (avatar) {
        const result = await uploadBytes(locationRef, avatar);
        const url = await getDownloadURL(result.ref);
        await updateDoc(userDocRef, {
          userAvatar: url,
        });
        await updateProfile(user, {
          photoURL: url,
        });
      } else if (!avatar && initialAvatar && initialAvatar !== avatarPreview) {
        await updateProfile(user, {
          photoURL: '',
        });
        await deleteObject(locationRef);
        await updateDoc(userDocRef, {
          userAvatar: null,
        });
      }
      setAvatarPreview(null);
      setAvatar(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  useEscClose(onClose);
  return (
    <S.Form onSubmit={onSubmit}>
      {avatarPreview ? (
        <S.AttachAvatar>
          <S.AttachAvatarPreview
            src={avatarPreview}
            alt="프로필이미지 미리보기"
            width="120"
            height="120"
          />
          <S.AttachAvatarDelete type="button" onClick={onAvatarDelete} />
          <S.AttachAvatarChange htmlFor="avatar_edit">
            <IconChange />
          </S.AttachAvatarChange>
        </S.AttachAvatar>
      ) : (
        <S.AttachAvatarLabel htmlFor="avatar_edit">
          <IconUser />
        </S.AttachAvatarLabel>
      )}
      <S.AttachAvatarInput
        onChange={onAvatarChange}
        id="avatar_edit"
        type="file"
        accept="image/*"
      />
      <S.InputText
        onChange={onNameChange}
        name="name_edit"
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        required
      />
      <S.SubmitButton type="submit">
        {isLoading ? <LoadingSpinner /> : '수정'}
      </S.SubmitButton>
    </S.Form>
  );
}
