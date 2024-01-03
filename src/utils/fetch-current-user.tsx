import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import IUser from '@type/IUser.ts';

interface IFetchCurrentUser {
  userId: string;
  setCurrentUser: (
    // eslint-disable-next-line no-unused-vars
    newValue: IUser | ((currentValue: IUser) => IUser),
  ) => void;
}

export default async function FetchCurrentUser({
  userId,
  setCurrentUser,
}: IFetchCurrentUser): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const userInfo = snapshot.data() as IUser;
    setCurrentUser(userInfo);
  }
}
