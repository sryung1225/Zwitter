import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import auth from './firebase.ts';
import Home from './routes/home.tsx';
import Profile from './routes/profile.tsx';
import Login from './routes/login.tsx';
import CreateAccount from './routes/create-account.tsx';
import Layout from './components/layout.tsx';
import LoadingScreen from './components/loading-screen.tsx';
import * as S from './styles/App.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
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
    <S.Wrapper>
      <S.GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </S.Wrapper>
  );
}

export default App;
