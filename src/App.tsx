import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { auth } from './firebase.ts';
import ProtectedRoute from './components/protected-route.tsx';
import Home from './routes/home.tsx';
import Profile from './routes/profile.tsx';
import SearchResult from './routes/search-result.tsx';
import Auth from './routes/auth.tsx';
import Layout from './components/layout.tsx';
import LoadingScreen from './components/loading-screen.tsx';
import * as S from './styles/global.ts';

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
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
