import login from "../views/login";

export const defaultState: AppState = {
    screen: null,
    isLoading: false,
    loginFormError: null,
    user: null,
    loginData: {
        errors:{
            password: '',
            login: '',
        },
        values: {
            password: '',
            login: '',
        }
    }
}
