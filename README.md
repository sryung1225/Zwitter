# Zwitter 🍧

<div align="center">
<img src="https://github.com/sryung1225/Zwitter/assets/26590099/1d562e76-f6fa-4ad0-87f0-b91c79c15b4c" alt="제트위터" height="300px" />
</div>

## 📢 프로젝트 개요

![project_period](https://img.shields.io/badge/Project%20Period-2023--11--29%20~%202024--01--31-FF7AB2)<br>

> 쉿-🤫 지금 Z세대는 **제트위터**에서 조잘거리는 중

실시간 소통 SNS 플랫폼 서비스 프로젝트

초기 '트위터 클론코딩'이라는 목표로 시작해, 사용자들이 실시간으로 소통하고 정보를 공유할 수 있는 독립적인 SNS 플랫폼으로 발전시켰습니다. 사용자들은 자유롭게 글을 남기고 다른 사용자들에게 공감을 남기거나 댓글을 남길 수 있는 기능을 제공합니다.

<br />

## 🏡 배포

> [xwitter-c64ef.web.app](xwitter-c64ef.web.app)

테스트 계정

- ID: guest@guest.com
- PW: guest123

<br />

## 🌈 기술 스택

- **언어** : ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white)
- **라이브러리** : ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black)
- **상태 관리** : ![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=recoil&logoColor=white)
- **스타일링** : ![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=flat&logo=styled-components&logoColor=white)
- **번들링** : ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
- **데이터베이스 & 배포** : ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
- **디자인** : ![Figma](https://img.shields.io/badge/Figma-F24E1E.svg?style=flat&logo=figma&logoColor=white)
- **형상 관리** : ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

<br />

## 🥁 기능 소개

### 📍 로그인 및 회원가입

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/d4f75772-87b6-4839-a7bb-0bf37547c006" alt="로그인 및 회원가입" />

Firebase의 Authentication을 이용하여 구현된 **로그인 및 회원가입** 페이지 입니다.

회원가입 수단은 총 3가지로 **이메일 / Google 연계 / GitHub 연계** 가 존재합니다. 이메일을 기반으로 회원가입을 진행하거나 Google 및 GitHub 계정을 연동하여 소셜 로그인이 가능합니다.

로그인과 회원가입 폼은 팝업으로 열리며 로그인 성공 시, 다음 화면으로 전환됩니다. 로그인하지 않은 사용자는 해당 페이지 외 다른 페이지로 이동이 불가능합니다.

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/fb7f35a0-73ac-43cc-9b1f-3e88f0fc2ac7" alt="로그인 및 회원가입 2" />

해당 과정에서 발생하는 error들은 **각 error.code에 따라 지정된 경고문구를 노출**합니다. 에러 컴포넌트는 해당 페이지 외 서비스 전체에서 공통적으로 사용합니다.

<details>
  <summary>핵심 코드 미리보기</summary>

```tsx
// components/protected-route.tsx
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; // firebase를 통해 추적한 정상 로그인된 현재 사용자
  const [localStorageUser, setLocalStorageUser] =
    useRecoilState(currentUserAtom); // 전역 데이터로 관리하는 현재 사용자
  if (!user && localStorageUser.userId !== '') {
    return <Navigate to="/auth" />; // 로그인 유저가 없다 경우 로그인/회원가입 페이지로 이동시켜 다른 경로를 보호함
  }
  return children;
}
```

```tsx
// hooks/useErrorMessage.tsx
import DEFAULT_ERROR from '@const/default-error.tsx';
import AUTH_ERRORS from '@const/auth-errors.tsx';

export default function useAuthErrorMessage(initialMessage: string) {
  const [errorMessage, setErrorMessage] = useState(initialMessage);
  const displayError = (error: unknown) => {
    let message = '';
    if (error instanceof FirebaseError) {
      // 파이어베이스 에러는 error.code 활용한 문구 노출
      message = AUTH_ERRORS[error.code] || `${DEFAULT_ERROR} (${error.code})`;
    } else if (error instanceof Error) {
      // 그 외 에터는 error.name 활용한 문구 노출
      message = `${DEFAULT_ERROR} (${error.name})`;
    }
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000); // 3초간 노출한 뒤 제거
  };
  return { errorMessage, displayError };
}
```

</details>

<br />

### 📍 메인 타임라인

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/74643817-6192-421a-a91e-e4ff06414fc7" alt="메인 타임라인" />

로그인에 성공하면 이동되는 **메인** 페이지 입니다.

타임라인을 중심으로 좌측에는 **네비게이션**, 우측에는 **검색창**이 배치되어 있습니다.

메인 중심 상단에는 트윗을 직접 포스팅하기 위한 입력 폼이 배치되어 있고, 아래에는 **모든 사용자들이 작성한 트윗**을 최신순으로 확인할 수 있습니다. 특히, 타임라인은 Firebase의 `onSnapshot` 메서드를 사용해 **실시간**으로 Firestore에 저장된 트윗 데이터를 불러와 자동 업데이트를 진행합니다. 해당 로직은 커스텀 훅 `useTimeline`으로 분류해 활용합니다.

📜 [Firestore 데이터베이스 가져오기. getDoc과 onSnapshot의 차이는?](https://s-ryung.tistory.com/78)

📜 [트러블 슈팅 - firestore read 남용 원인 찾기 및 해결 (파이어베이스 일일 사용량 개선하기)](https://s-ryung.tistory.com/76)

<details>
  <summary>핵심 코드 미리보기</summary>

```tsx
// hooks/useTimeline.tsx
const [tweets, setTweets] = useState<ITweet[]>([]);
useEffect(() => {
  let unsubscribe: Unsubscribe | null = null;
  const fetchTweets = async () => {
    const tweetsQuery = query(collection(db, 'tweets'), ...queryOptions);
    unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
      const tweetList = snapshot.docs.map((doc) => {
        /* ... */
      });
      setTweets(tweetList);
    });
  };
  fetchTweets();
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  }; // onSnapshot으로 인한 데이터 누수 방지를 위해 cleanup 활용
}, [queryOptions]);
```

</details>

<br />

### 📍 좋아요 및 댓글 남기기

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/96c39a35-1166-47eb-b72b-d87fcdad345f" alt="좋아요 및 댓글 남기기" />

각 트윗에는 좋아요를 표시하거나 댓글을 남길 수 있습니다.

개별 트윗 하단 하트 아이콘을 클릭하면 채워진 하트를 활성화함으로써 **트윗에 대한 호감을 표현**할 수 있습니다. 다시 한 번 클릭하면 비활성화 가능하고, 각 사용자는 최대 1개의 하트를 줄 수 있습니다.

말풍선 아이콘을 클릭하면 해당 트윗의 댓글 패널이 펼쳐집니다. 댓글 패널을 통해 이미 작성된 댓글을 확인하거나 직접 댓글을 작성하여 **트윗에 대한 의견**을 남길 수 있습니다.

<br />

### 📍 트윗 포스팅

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/57db5c99-0660-4ba1-89e6-68f3224c43d1" alt="트윗 포스팅" />

메인 중앙 상단 입력 폼을 이용하여 **트윗을 포스팅**할 수 있습니다.

텍스트 입력을 필수로 하며, 텍스트를 입력하지 않을 경우 포스팅이 되지 않습니다. 이미지는 선택적으로 포함 가능합니다. 하단 포스팅 버튼을 통해 트윗을 제출하면 Firestore에 해당 데이터가 저장됩니다.

제출에 성공한 트윗은 아래 **타임라인에 즉시 추가 반영**됩니다. 이 때 만일 타임라인 스크롤이 하단에 있는 경우 최상위로 끌어올려집니다. 트윗에는 입력한 내용과 함께 나의 프로필과 작성 시간이 함께 남겨집니다.

<br />

### 📍 트윗 수정 및 삭제

내가 작성한 트윗에 한하여 우측 상단에 수정, 삭제 버튼이 노출됩니다. 이를 이용해 트윗을 자유롭게 수정하거나 삭제할 수 있습니다.

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/c8d1feaa-d0ed-499e-bb21-2c75a06faa17" alt="트윗 수정" />

**수정** 버튼을 클릭하면 팝업 형태로 입력 폼이 노출됩니다. 해당 입력 폼에는 현재 트윗의 텍스트와 이미지를 불러와 사용자가 즉시 수정할 수 있도록 돕습니다.

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/a3724bc1-e5e0-48c6-bc0c-158e51e5048d" alt="트윗 삭제" />

**삭제** 버튼을 클릭하면 삭제를 다시 한 번 확인하는 팝업이 노출됩니다. 긍정 시 해당 트윗 데이터는 삭제됩니다.

해당 팝업을 포함한 서비스에서 제공되는 **모든 팝업은 <kbd>Esc</kbd> 키를 통해 비활성화** 가능합니다.

<br />

### 📍 프로필

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/e280ecf9-f0df-486a-b9e7-f5c0faed1c32" alt="프로필" />

타임라인 속 트윗 또는 댓글에 게시된 사용자의 이름 혹은 프로필 사진을 클릭하면 **해당 사용자의 프로필 페이지로 이동**합니다. 프로필 페이지에서는 사용자의 정보와 해당 사용자가 작성한 트윗만을 모아 볼 수 있습니다.

좌측 프로필 메뉴를 통해 **내 프로필 페이지로 이동**도 가능합니다. 내 프로필에서는 프로필 수정과 회원 탈퇴 버튼이 추가로 노출됩니다.

<br />

### 📍 프로필 수정

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/5a7d1725-e35a-4726-bf33-fc10c4ba4ca7" alt="프로필 수정" />

트윗 수정과 유사하게 **프로필 수정**이 가능합니다. 버튼 클릭 시 수정을 위한 입력 폼 팝업이 활성화 됩니다.

현재 사용자의 정보는 Recoil의 Atom으로 전역 관리되고 있어 수정 완료 시 **변경된 프로필은 모든 컴포넌트에 즉시 반영**됩니다.

<details>
  <summary>핵심 코드 미리보기</summary>

```tsx
// atoms/current-user.tsx
const currentUserAtom = atom({
  key: 'currentUser',
  default: {
    userId: '',
    userName: '',
    userAvatar: '',
  },
  dangerouslyAllowMutability: true,
  effects: [persistAtom],
});
```

</details>

<br />

### 📍 트윗 검색

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/f337f750-8f75-4316-ad72-cd282fe90658" alt="트윗 검색" />

우측 검색창을 통해 해당 **키워드로 시작하는 트윗을 검색**할 수 있습니다.

Firebase의 **query를 활용**하여 입력된 검색 키워드로 시작하는 텍스트의 트윗만을 선별해 노출하는 검색 페이지로 이동시킵니다. 검색 키워드를 전역으로 관리해, 새로고침 후에도 결과를 유지하고 **url 수정을 통한 검색** 또한 가능합니다.

<details>
  <summary>핵심 코드 미리보기</summary>

```tsx
// common/search-keyword.tsx
const navigate = useNavigate();
const [searchValue, setSearchValue] = useState('');
const setSearchKeyword = useSetRecoilState(searchKeywordAtom);
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSearchKeyword(searchValue);
  setSearchValue('');
  navigate(`/search?query=${searchValue}`);
};
```

</details>

<br />

### 📍 로그아웃

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/a2702117-8457-4358-9845-b28b5c1832c0" alt="로그아웃" />

왼쪽 하단 미니 프로필에 포함된 버튼을 통해 **로그아웃**이 가능합니다.

버튼 클릭 시 로그아웃을 다시 한 번 확인하는 팝업을 노출합니다. 긍정한다면 로그아웃과 함께 최초 로그인 화면으로 이동됩니다.

<br />

### 📍 회원 탈퇴

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/47016a5b-d333-4335-a589-bf3b715d4bbd" alt="회원 탈퇴" />

현재 사용자의 프로필 페이지를 통해 **회원 탈퇴**가 가능합니다.

탈퇴를 다시 한 번 확인하는 팝업을 노출한 뒤, 긍정하면 계정 정보 삭제와 동시에 최초 로그인 화면으로 이동됩니다. 이 때 해당 사용자에 대한 트윗 및 프로필 이미지 등 **관련된 모든 데이터를 삭제**해 서비스의 서버를 최적화 시킵니다.

<br />

### 📍 테마 모드 전환

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/59b611c1-c6f4-4e65-82fc-846a0e3b6489" alt="테마 모드 전환" />

우측 하단 버튼을 통해 **테마를 전환**할 수 있습니다.

Recoil의 Atom과 styled-components의 theme를 결합하여 **라이트 테마 모드와 다크 테마 모드**를 자유롭게 전환할 수 있습니다.

<details>
  <summary>핵심 코드 미리보기</summary>

```tsx
// styles/thmeme.ts
export const lightTheme: DefaultTheme = {
  colors: {
    ...theme.colors,
    text: `${theme.colors.black}`,
    background: `${theme.colors.white}`,
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    ...theme.colors,
    text: `${theme.colors.white}`,
    background: `${theme.colors.black}`,
  },
};
```

</details>

<br />

### 📍 반응형 레이아웃

<img src="https://github.com/sryung1225/Zwitter/assets/26590099/8266bb58-ba27-4bd9-9681-acdadded3dd6" alt="반응형 레이아웃" />

최소 너비 360px까지 사용 가능하도록 **반응형 레이아웃**을 적용했습니다.

메인 화면의 네비게이션 영역이 숨겨질 때 모바일용 네비게이션을 사용할 수 있는 햄버거 버튼이 화면 우측 하단에 노출됩니다. 네비게이션 slide-out 애니메이션 구현을 위해 `setTimeout`을 활용한 시간차 렌더링 해제가 이루어집니다.

<details>
  <summary>핵심 코드 미리보기</summary>

```tsx
// styles/media.ts
import SCREEN_SIZE from '@const/screen-size.tsx';

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(SCREEN_SIZE.desktop),
  semi: customMediaQuery(SCREEN_SIZE.semi),
  tablet: customMediaQuery(SCREEN_SIZE.tablet),
  phone: customMediaQuery(SCREEN_SIZE.phone),
};
```

</details>

<br />

## 💎 성능 최적화

### 🔎 코드 스플리팅

react-router를 사용해 SPA로 구현된 프로젝트가 가지는 한계인 페이지 렌더링 문제를 해결하기 위하여 **`lazy` 함수를 활용한 동적 렌더링**을 적용했습니다.

바로 노출되어야 하는 로딩 스피너와 테마 토글 버튼을 제외한 컴포넌트에 적용, 사용자가 실제로 방문하는 페이지의 코드만 불러오도록 하여 불필요한 로딩 비용을 줄였습니다.

```tsx
// App.tsx
const ProtectedRoute = lazy(() => import('@compo/protected-route.tsx'));
/* ... */
function App() {
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      </Suspense>
      <ModeToggle />
    </ThemeProvider>
  );
}
```

📜 [리액트 앱 성능 개선! React.lazy를 이용한 코드 스플리팅](https://s-ryung.tistory.com/74)

<br />

### 🔎 이미지 최적화

트윗, 프로필에서 이미지를 등록할 때 **이미지의 크기와 용량을 제한**하기 위한 수단으로 **browser-image-compression** 라이브러리를 적극 활용했습니다. 이를 이용하여 서버에는 1MB를 넘지 않는 이미지들만 등록되도록 자체적인 압축이 활성화됐습니다.

```tsx
// utils/compress-image.tsx
import imageCompression from 'browser-image-compression';

interface ICompressImage {
  imageFile: File;
  size: number;
}

export default async function CompressImage({
  imageFile,
  size,
}: ICompressImage) {
  if (!imageFile) {
    return null;
  }
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: size,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    return null;
  }
}
```

<!-- ### 🔎 SEO 최적화 -->

<br />

## 🧨 바로 가기

- [프로토타입 디자인 : Figma](https://www.figma.com/file/lGfHRx9UZ6bpdiYaG1YTWC/Zwitter?type=design&node-id=0%3A1&mode=design&t=IbcMGsDoEQOQu4DW-1)
- [백로그 : Github Projects](https://github.com/users/sryung1225/projects/4)
- [개발 회고 일지 : Tistory](https://s-ryung.tistory.com/category/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)
