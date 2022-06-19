import {Dispatch} from "../core/Store";
import {default as UserAPI} from "../api/User";
import {UserPassword, UserSearchById, UserSearchByLogin} from "../api/types";
import {hasError} from "../utils/apiHasError";
import {transformUser} from "../utils/apiTransformers";

export const updateProfileInfo = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: User|any,
) => {
    const updateUser = await UserAPI.updateProfile(payload);
    if (hasError(updateUser)) {
        const {reason}  = updateUser;
        dispatch({profileSettingsFormError: reason});
        return;
    }
    dispatch({ user: (transformUser(updateUser)  as User) });
};


export const updateProfileAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: File,
) => {
    const responseUserImage = await UserAPI.updateAvatar(payload);
    if (hasError(responseUserImage)) {
        const {reason}  = responseUserImage;
        dispatch({profileImageFormData:{...state.profileImageFormData, errorDescription: reason, status: false}});
        return;
    }
    dispatch({ user: (transformUser(responseUserImage)  as User), profileImageFormData:{...state.profileImageFormData, status: true} });
};


export const updateProfilePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: UserPassword,
) => {
    const responseUserPassword = await UserAPI.updatePassword(payload);
    if (hasError(responseUserPassword)) {
        const {reason}  = responseUserPassword;
        dispatch({passwordFormData:{...state.passwordFormData, errorDescription: reason, status: false}});
        return;
    }
    dispatch({passwordFormData:{...state.passwordFormData, status: true}});
};

export const getUserById = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: UserSearchById,
) => {
    const responseUser = await UserAPI.getUserById(payload);
    if (hasError(responseUser)) {
        const {reason}  = responseUser;
        dispatch({dialogsError: reason});
        return;
    }
    const user = transformUser(responseUser)  as User;
    return user.login;
};

export const getUserByLogin = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: UserSearchByLogin
) => {
    const login:string = payload.login;
    const responseUser = await UserAPI.getUserByLogin({login});
    if (hasError(responseUser)) {
        const {reason}  = responseUser;
        dispatch({...state.addUserFormData, error: reason});
        return;
    }
    responseUser?.forEach(user => dispatch({addUserFormData: {...state.addUserFormData, user: user}}));
};