
export const defaultState: AppState = {
    screen: null,
    socket: null,
    isLoading: false,
    loginFormError: "",
    profileSettingsFormError: "",
    profileImageFormError: "",
    updateAvatarFormError: "",
    updatePasswordFormError: "",
    createChatFormError: "",
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
        }
    }
}
