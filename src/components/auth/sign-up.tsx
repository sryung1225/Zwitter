import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.ts';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/auth.ts';
import * as P from '@style/popup.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface ISignUpProps {
  onClose: () => void;
}

const errors: { [key: string]: string } = {
  'auth/email-already-in-use': '해당 이메일은 이미 사용 중 입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
  'auth/weak-password': '비밀번호가 보안상 약해 사용할 수 없습니다.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
};

export default function SignUp({ onClose }: ISignUpProps) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'userPassword') {
      setUserPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirebaseError('');
    if (isLoading || userName === '' || userEmail === '' || userPassword === '')
      return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword,
      );
      await updateProfile(credentials.user, {
        displayName: userName,
      });
      const userRef = doc(db, 'users', credentials.user.uid);
      await setDoc(userRef, {
        userName: userName || 'Anonymous',
        userId: credentials.user.uid,
        userAvatar: credentials.user.photoURL || null,
      });
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(errors[error.code] || error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEscClose(onClose);
  return (
    <P.PopupWrapper>
      <P.Popup>
        <P.CloseButton onClick={onClose} type="button">
          <span className="a11yHidden">닫기</span>
        </P.CloseButton>
        <P.Logo>
          <span>Z</span>witter
          <img src={ImageComputer} alt="로고 아이콘" width="40" height="40" />
        </P.Logo>
        <P.Title>회원가입</P.Title>
        <S.Form onSubmit={onSubmit}>
          <S.FormInput
            onChange={onChange}
            name="userName"
            value={userName}
            placeholder="이름을 입력해주세요"
            type="text"
            required
          />
          <S.FormInput
            onChange={onChange}
            name="userEmail"
            value={userEmail}
            placeholder="이메일을 입력해주세요"
            type="email"
            required
          />
          <S.FormInput
            onChange={onChange}
            value={userPassword}
            name="userPassword"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            required
          />
          <S.SubmitButton type="submit">
            {isLoading ? <LoadingSpinner /> : '가입하기'}
          </S.SubmitButton>
        </S.Form>
        {firebaseError !== '' ? <S.Error>{firebaseError}</S.Error> : null}
      </P.Popup>
    </P.PopupWrapper>
  );
}
