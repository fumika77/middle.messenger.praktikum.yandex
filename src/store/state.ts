
export const defaultState: AppState = {
    screen: null,
    isLoading: false,
    loginFormError: "",
    profileSettingsFormError: "",
    profileImageFormError: "",
    updateAvatarFormError: "",
    updatePasswordFormError: "",
    file: null,
    user: {
        id: null,
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
    passwordFormData: {
        values: {
            old_password: '',
            password: '',
            password_repeat: ''
        },
        errors: {
            old_password: '',
            password: '',
            password_repeat: ''
        }
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
