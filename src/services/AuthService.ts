import { default as AuthAPI } from 'api/Auth';
import {Dispatch} from "core/Store";
import {hasError} from "utils/apiHasError";
import {transformUser} from "utils/apiTransformers";

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
    dispatch({isLoading: true})

    const response = await AuthAPI.login(payload);

    if (response.reason) {
        dispatch({ loginFormError: response.reason, isLoading: false });
        return;
    }

    dispatch({ loginFormError: null });

    await getProfileInfo(dispatch, state)

    if (hasError(response)) {
        dispatch(logout);
        return;
    }
    dispatch({isLoading: true})
    window.router.go('/dialogs')
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    window.router.go('/');

    dispatch({ isLoading: true });

    await AuthAPI.logout();

    dispatch({ user: null });


    dispatch({ isLoading: false });
};

export const signUp = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: SignUpPayload,
) => {
    dispatch({isLoading: true})
    const response = await AuthAPI.signUp(payload);
    if (hasError(response)) {
        dispatch({ signUpFormError: response.reason} );
        return;
    }
    window.router.go('/dialogs');
    dispatch({isLoading: false})
};

export const getProfileInfo = async (
    dispatch: Dispatch<AppState>,
) => {
    const responseUser = await AuthAPI.profileInfo()
    if (hasError(responseUser)){
        dispatch({ loadUserDataError: responseUser.reason} );
        return;
    }
    dispatch({ user: transformUser(responseUser as User) });
};