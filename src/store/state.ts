export const defaultState: AppState = {
    screen: null,
    socket: null,
    isLoading: false,
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
    profileSettingsFormData:{
        user: {
            login: '',
            first_name: '',
            second_name: '',
            email: '',
            phone: '',
            display_name: '',
        },
        userErrors:{
            login: '',
            first_name: '',
            second_name: '',
            email: '',
            phone: '',
            display_name: '',
        }
    },
    dialogsFormData: {
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
    },
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
        },
        status: null,
        errorDescription: ''
    },
    createChatFormData: {
        values: {
            chatName: '',
        },
        errors: {
            chatName: '',
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
        },
        hasError: null,
    }
}
