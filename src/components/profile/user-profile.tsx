import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { auth, db, storage } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import IUser from '@type/IUser.ts';
import useErrorMessage from '@hook/useErrorMessage.tsx';
import EditProfileForm from '@compo/profile/edit-profile-form.tsx';
import * as S from '@style/profile.ts';
import * as P from '@style/popup.ts';
import ErrorAlarm from '@style/error-alarm.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';

interface IUserProfile {
  user: IUser;
}

export default function UserProfile({ user }: IUserProfile) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [editPopup, setEditPopup] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const { errorMessage, displayError } = useErrorMessage('');
  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };
  const toggleWithdrawPopup = () => {
    setWithdrawPopup(!withdrawPopup);
  };
  const withdrawAccount = async () => {
    const authCurrentUser = auth.currentUser;
    if (!authCurrentUser) return;
    try {
      await deleteDoc(doc(db, 'users', authCurrentUser.uid));
      const photoRef = ref(storage, `avatars/${authCurrentUser.uid}`);
      await deleteObject(photoRef);
      await deleteUser(authCurrentUser);
    } catch (error) {
      displayError(error);
    } finally {
      setCurrentUser({
        userId: '',
        userAvatar: '',
        userName: '',
      });
      navigate('/auth');
    }
  };
  return (
    <>
      <S.Profile>
        <S.Avatar>
          {user.userAvatar ? (
            <S.AvatarImage
              src={user.userAvatar}
              alt={`${user.userName}의 프로필 사진`}
              width="120"
              height="120"
            />
          ) : (
            <IconUser />
          )}
        </S.Avatar>
        <S.Name>{user.userName}</S.Name>
        {user.userId === currentUser.userId && (
          <S.Buttons>
            <S.EditButton onClick={toggleEditPopup} type="button">
              프로필 수정
            </S.EditButton>
            {editPopup && (
              <P.PopupWrapper>
                <P.Popup>
                  <P.CloseButton onClick={toggleEditPopup} type="button" />
                  <EditProfileForm onClose={toggleEditPopup} />
                </P.Popup>
              </P.PopupWrapper>
            )}
            <S.WithdrawButton onClick={toggleWithdrawPopup} type="button">
              회원 탈퇴
            </S.WithdrawButton>
            {withdrawPopup && (
              <P.PopupWrapper>
                <P.MiniPopup>
                  <P.CloseButton onClick={toggleWithdrawPopup} type="button" />
                  <P.Text>
                    정말 <span>탈퇴</span>하시겠습니까?
                  </P.Text>
                  <P.ButtonWrapper>
                    <P.Button onClick={withdrawAccount} type="button">
                      예
                    </P.Button>
                    <P.Button onClick={toggleWithdrawPopup} type="button">
                      아니요
                    </P.Button>
                  </P.ButtonWrapper>
                </P.MiniPopup>
              </P.PopupWrapper>
            )}
          </S.Buttons>
        )}
      </S.Profile>
      {errorMessage && <ErrorAlarm>{errorMessage}</ErrorAlarm>}
    </>
  );
}
