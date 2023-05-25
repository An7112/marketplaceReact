import { AnyAction, Dispatch } from 'redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { loginRequest, loginSuccess, loginFailure, logout } from 'store/reducers/auth';
import { auth } from '../../firebase';

const localStorageKey = 'user';

export const loginWithGoogle = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const provider = new GoogleAuthProvider();
    dispatch(loginRequest());
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(loginSuccess(result.user!));
      localStorage.setItem(localStorageKey, JSON.stringify(result.user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await auth.signOut();
      dispatch(logout());
      localStorage.removeItem(localStorageKey);
    } catch (error) {
      console.log(error);
    }
  };
};

export const restoreUser = (): AnyAction | null => {
  const userStr = localStorage.getItem(localStorageKey);
  if (userStr) {
    const user = JSON.parse(userStr);
    return loginSuccess(user);
  }
  return null;
};
