export const defaultState: AppState = {
    screen: null,
    socket: null,
    isLoading: false,
    isChatLoading: false,
    loginFormError: "",
    profileSettingsFormError: "",
    createChatFormError: "",
    signUpFormError: "",
    loadUserDataError:"",
    signUpFormData:{
        user: {
            login: '',
            first_name: '',
            second_name: '',
            email: '',
            phone: '',
            password: '',
            password_repeat: '',
        },
        userErrors:{
            login: '',
            first_name: '',
            second_name: '',
            email: '',
            phone: '',
            password: '',
            password_repeat: '',
        }
    },
        dialogsError: "",
        dialogs: [],
        history: [],
        activeDialog: {
            id: null,
            title: null,
            avatar: null,
        },
        message: '',
        messageError:'',
    addUserFormData: {
        userLogin: '',
        user: null,
        error: '',
    },
    profileImageFormData: {
        status: null,
        errorDescription: null,
        file: null,
    },
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
    passwordFormData: {
        status: null,
        errorDescription: ''
    },
    passwordValidation: {
        password: '',
        password_repeat: '',
        passwordErrorText: '',
        password_repeatErrorText: '',
    },
    createChatFormData: {
        errorDescription: '',
        status: null,
    },
    loginData: {
        errors:{
            password: '',
            login: '',
        },
        values: {
            password: '',
            login: '',
        },
        hasError: null,
    }
}
