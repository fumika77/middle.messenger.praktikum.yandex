import {Dispatch} from "../core/Store";
import {default as UserAPI} from "../api/User";
import {User, UserPassword} from "../api/types";
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
    dispatch({ user: transformUser(JSON.parse(updateUser)  as User) });
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
    dispatch({ user: transformUser(JSON.parse(responseUserImage)  as User) });
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
    console.log('responseUserPassword')
    console.log(responseUserPassword)
};