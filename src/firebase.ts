import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'xwitter-c64ef.firebaseapp.com',
  projectId: 'xwitter-c64ef',
  storageBucket: 'xwitter-c64ef.appspot.com',
  messagingSenderId: '724526921429',
  appId: '1:724526921429:web:e3180c114a40b1d849d45c',
  measurementId: 'G-0LZDPS3LSH',
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
// Database
export const db = getFirestore(app);
