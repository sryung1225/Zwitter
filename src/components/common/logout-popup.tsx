import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import timelineTweetsAtom from '@atom/timeline-tweets.tsx';
import useErrorMessage from '@hook/useErrorMessage.tsx';
import * as P from '@style/popup.ts';
import ErrorAlarm from '@style/error-alarm.ts';

export default function LogoutPopup({ toggleLogoutPopup = () => {} }) {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const setTimelineTweets = useSetRecoilState(timelineTweetsAtom);
  const { errorMessage, displayError } = useErrorMessage('');
  const onLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      displayError(error);
    } finally {
      navigate('/auth');
      setCurrentUser({
        userId: '',
        userAvatar: '',
        userName: '',
      });
      setTimelineTweets([]);
    }
  };
  return (
    <>
      <P.PopupWrapper>
        <P.MiniPopup>
          <P.Text>로그아웃 하시겠습니까?</P.Text>
          <P.ButtonWrapper>
            <P.Button onClick={onLogout} type="button">
              예
            </P.Button>
            <P.Button onClick={toggleLogoutPopup} type="button">
              아니요
            </P.Button>
          </P.ButtonWrapper>
        </P.MiniPopup>
      </P.PopupWrapper>
      {errorMessage && <ErrorAlarm>{errorMessage}</ErrorAlarm>}
    </>
  );
}
