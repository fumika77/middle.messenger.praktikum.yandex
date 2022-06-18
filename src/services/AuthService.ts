import { default as AuthAPI } from '../api/Auth';
import {Dispatch} from "../core/Store";
import {hasError} from "../utils/apiHasError";
import {User} from "../api/types";
import {transformUser} from "../utils/apiTransformers";

type LoginPayload = {
    login: string;
    password: string;
};

type SignUpPayload = {
    login: string;
    first_name: string;
    second_name: string;
    password: string;
    password_repeat: string;
    email: string;
    phone: string;
};


export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: LoginPayload,
) => {

    const response = await AuthAPI.login(payload);

    if (response.reason) {
        dispatch({ loginFormError: response.reason });
        return;
    }

    dispatch({ loginFormError: null });

    getProfileInfo(dispatch, state)

    if (hasError(response)) {
        dispatch(logout);
        return;
    }
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    await AuthAPI.logout();

    dispatch({ user: null });

    window.router.go('/login');
};

export const signUp = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: SignUpPayload,
) => {
    const response = await AuthAPI.signUp(payload);
    if (hasError(response)) {
        dispatch({ signUpFormError: response.reason} );
        return;
    }
    dispatch({ user: null} );
    window.router.go('/dialogs');
};

export const getProfileInfo = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
        const responseUser = await AuthAPI.profileInfo()
        if (hasError(JSON.parse(responseUser))) {
            dispatch({ loadUserDataError: responseUser.reason} );
            return;
        }
        dispatch({ user: transformUser(JSON.parse(responseUser)  as User) });
};