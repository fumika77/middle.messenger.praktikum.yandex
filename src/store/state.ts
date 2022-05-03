
export const defaultState: AppState = {
    screen: null,
    isLoading: false,
    loginFormError: "",
    profileSettingsFormError: "",
    user: {
        login: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
        avatar: '',
        display_name: '',
    },
    userErrors: {
        login: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
        avatar: '',
        display_name: '',
    },
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
