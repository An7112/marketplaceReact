import firebase from 'firebase/auth';

interface AuthState {
    user: firebase.User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export enum AuthActionTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT',
}

interface LoginRequestAction {
    type: AuthActionTypes.LOGIN_REQUEST;
}

interface LoginSuccessAction {
    type: AuthActionTypes.LOGIN_SUCCESS;
    payload: firebase.User;
}

interface LoginFailureAction {
    type: AuthActionTypes.LOGIN_FAILURE;
    payload: string;
}

interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
}

type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutAction;

const authReducer = (
    state: AuthState = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case AuthActionTypes.LOGIN_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case AuthActionTypes.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case AuthActionTypes.LOGOUT:
            return { ...state, user: null, loading: false, error: null };
        default:
            return state;
    }
};

export default authReducer;
