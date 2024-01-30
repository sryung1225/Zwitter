import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import IUser from '@type/IUser.ts';
import useEscClose from '@hook/useEscClose.tsx';
import useErrorMessage from '@hook/useErrorMessage.tsx';
import CompressImage from '@util/compress-image.tsx';
import * as S from '@style/profile-form.ts';
import ErrorAlarm from '@style/error-alarm.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconChange } from '@img/i-change.svg';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface IEditProfileForm {
  onClose: () => void;
}

export default function EditProfileForm({ onClose }: IEditProfileForm) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [isLoading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser.userAvatar);
  const [name, setName] = useState(currentUser.userName);
  const { errorMessage, displayError } = useErrorMessage('');
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
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || isLoading || name === '') return;
    try {
      setLoading(true);
      const userDocRef = doc(db, 'users', currentUser.userId);
      await updateDoc(userDocRef, {
        userName: name,
      });
      setCurrentUser((prevUser: IUser) => ({
        ...prevUser,
        userName: name,
      }));
      const locationRef = ref(storage, `avatars/${currentUser.userId}`);
      if (avatar) {
        const result = await uploadBytes(locationRef, avatar);
        const url = await getDownloadURL(result.ref);
        await updateDoc(userDocRef, {
          userAvatar: url,
        });
        setCurrentUser((prevUser: IUser) => ({
          ...prevUser,
          userAvatar: url,
        }));
      } else if (
        !avatar &&
        currentUser.userAvatar &&
        currentUser.userAvatar !== avatarPreview
      ) {
        await deleteObject(locationRef);
        await updateDoc(userDocRef, {
          userAvatar: null,
        });
        setCurrentUser((prevUser: IUser) => ({
          ...prevUser,
          userAvatar: '',
        }));
      }
      setAvatarPreview(null);
      setAvatar(null);
    } catch (error) {
      displayError(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  useEscClose(onClose);
  return (
    <>
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
      {errorMessage && <ErrorAlarm>{errorMessage}</ErrorAlarm>}
    </>
  );
}
