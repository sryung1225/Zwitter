import { useEffect, useState, lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { auth } from './firebase.ts';
import LoadingSpinner from './components/loading-spinner.tsx';
import * as S from './styles/global.ts';

const ProtectedRoute = lazy(() => import('./components/protected-route.tsx'));
const Home = lazy(() => import('./routes/home.tsx'));
const Profile = lazy(() => import('./routes/profile.tsx'));
const SearchResult = lazy(() => import('./routes/search-result.tsx'));
const Auth = lazy(() => import('./routes/auth.tsx'));
const Layout = lazy(() => import('./components/layout.tsx'));

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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: `/search/:searchKeyword`,
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
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <S.GlobalStyles />
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      </Suspense>
    </>
  );
}

export default App;
