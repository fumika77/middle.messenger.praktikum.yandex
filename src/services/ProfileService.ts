import {Dispatch} from "../core/Store";
import {default as UserAPI} from "../api/User";
import {UserDTO} from "../api/types";
import {hasError} from "../utils/apiHasError";
import {transformUser} from "../utils/apiTransformers";

export const updateProfileInfo = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: UserDTO,
) => {
    const updateUser = await UserAPI.updateProfile(payload);
    console.log(updateUser)
    if (hasError(updateUser)) {
        const {reason}  = updateUser;
        dispatch({profileSettingsFormError: reason});
        return;
    }
    dispatch({ user: transformUser(JSON.parse(updateUser)  as UserDTO) });
};

