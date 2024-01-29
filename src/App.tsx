import { useEffect, useState, lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { auth } from '@/firebase.ts';
import LoadingSpinner from '@compo/loading-spinner.tsx';
import isDarkAtom from '@atom/is-dark.tsx';
import { lightTheme, darkTheme } from '@style/theme.ts';
import GlobalStyles from '@style/global.ts';

const ProtectedRoute = lazy(() => import('@compo/protected-route.tsx'));
const Home = lazy(() => import('@page/home.tsx'));
const Profile = lazy(() => import('@page/profile.tsx'));
const SearchResult = lazy(() => import('@page/search-result.tsx'));
const Auth = lazy(() => import('@page/auth.tsx'));
const Layout = lazy(() => import('@compo/layout.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/user',
        element: <Profile />,
      },
      {
        path: `/search`,
        element: <SearchResult />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
