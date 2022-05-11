import {Dispatch} from "../core/Store";
import {default as UserAPI} from "../api/User";
import {User, UserPassword, UserSearchById} from "../api/types";
import {hasError} from "../utils/apiHasError";
import {transformUser} from "../utils/apiTransformers";

export const updateProfileInfo = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: User,
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
        dispatch({updateAvatarFormError: reason});
        return;
    }
    dispatch({ user: (transformUser(responseUserImage)  as User) });
};


export const updateProfilePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: UserPassword,
) => {
    const responseUserPassword = await UserAPI.updatePassword(payload);
    if (hasError(responseUserPassword)) {
        const {reason}  = responseUserPassword;
        dispatch({updatePasswordFormError: reason});
        return;
    }
};

export const getUserById = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: UserSearchById,
) => {
    const responseUser = await UserAPI.getUserById(payload);
    if (hasError(responseUser)) {
        const {reason}  = responseUser;
        dispatch({dialogsFormData: {...state.dialogsFormData, dialogsError: reason}});
        return;
    }
    const user = transformUser(responseUser)  as User;
    return user.login;
};

export const getUserByLogin = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    const login:string = state.addUserFormData.userLogin
    const responseUser = await UserAPI.getUserByLogin({login});
    if (hasError(responseUser)) {
        const {reason}  = responseUser;
        dispatch({...state.addUserFormData, error: reason});
        return;
    }
    responseUser?.forEach(user => dispatch({addUserFormData: {...state.addUserFormData, user: user}}));
};