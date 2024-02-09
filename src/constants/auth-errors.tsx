const AUTH_ERRORS: { [key: string]: string } = {
  'auth/invalid-login-credentials': '유효하지 않은 사용자입니다.',
  'auth/user-not-found': '가입한 적 없는 사용자입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
  'auth/account-exists-with-different-credential':
    '이미 다른 수단의 계정을 갖고 있습니다.',
  'auth/popup-closed-by-user':
    '창이 닫혀 동작이 중지되었습니다. 다시 시도해주세요.',
  'auth/email-already-in-use': '해당 이메일은 이미 사용 중 입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
  'auth/weak-password': '비밀번호가 보안상 약해 사용할 수 없습니다.',
};

export default AUTH_ERRORS;
