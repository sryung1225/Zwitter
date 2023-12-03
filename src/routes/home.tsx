import auth from '../firebase.ts';

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <>
      <h1>Home!</h1>
      <button onClick={logOut}>LogOut</button>
    </>
  );
}
