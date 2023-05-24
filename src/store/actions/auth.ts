import { AnyAction, Dispatch } from 'redux';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { AuthActionTypes } from 'store/reducers/auth';
import { auth } from '../../firebase';

export const loginRequest = (): AnyAction => ({
    type: AuthActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user: User): AnyAction => ({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error: string): AnyAction => ({
    type: AuthActionTypes.LOGIN_FAILURE,
    payload: error,
});

export const logout = (): AnyAction => ({
    type: AuthActionTypes.LOGOUT,
});

export const loginWithGoogle = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const provider = new GoogleAuthProvider();
        dispatch(loginRequest());
        try {
            const result = await signInWithPopup(auth, provider);
            dispatch(loginSuccess(result.user!));
        } catch (error:any) {
            dispatch(loginFailure(error.message));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            await auth.signOut();
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    };
};
