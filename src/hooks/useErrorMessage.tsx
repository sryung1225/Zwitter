import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import DEFAULT_ERROR from '@const/default-error.tsx';
import AUTH_ERRORS from '@const/auth-errors.tsx';

export default function useAuthErrorMessage(initialMessage: string) {
  const [errorMessage, setErrorMessage] = useState(initialMessage);
  const displayError = (error: unknown) => {
    let message = '';
    if (error instanceof FirebaseError) {
      message = AUTH_ERRORS[error.code] || `${DEFAULT_ERROR} (${error.code})`;
    } else if (error instanceof Error) {
      message = `${DEFAULT_ERROR} (${error.name})`;
    }
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };
  return { errorMessage, displayError };
}
