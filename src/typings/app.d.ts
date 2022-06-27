import {ChatWebSocket} from "core/ChatWebSocket";
import {Store} from "core/Store";
import {BrowserRouter} from "core/Route";
import {UserDictionary} from "core/UserDictionary";

declare module '*.hbs';
declare global {
    export type Nullable<P> = P | null;
    interface Window {
        store: Store<AppState>;
        router: BrowserRouter;
        socket: ChatWebSocket;
        userDict: UserDictionary;
    }
    export type User = {
        id?: number;
        login: string;
        first_name: string;
        second_name: string;
        email: string;
        phone: string;
        display_name?: string;
        avatar?: string;
        password_repeat?: string;
        password?: string;
    }
    export type Message = {
        time: Date,
        timeString: string,
        content: string,
        userId: number,
        userLogin: Nullable<string>,
        isOtherUser: boolean,
    }
    export type DialogDTO = {
        id: number,
        title: string,
        avatar: string,
        unread_count: number,
        last_message: {
            user: User,
            time: string,
            content: string
        }
    }
    export type Dialog = {
        id: number,
        title: string,
        avatar: string,
        unreadCnt: number,
        content: string,
        userLogin: string,
        userAvatar: string,
        time: Date,
        timeString:string
    }
    export type AppState = {
        screen: Nullable<Screens>;
        socket: Nullable<ChatWebSocket>;
        isLoading: boolean;
        isChatLoading: boolean;
        isDialogsLoading: boolean;
        isMessageLoading: boolean;
        loginFormError: Nullable<string>;
        userErrorRequest: Nullable<string>;
        createChatFormError: Nullable<string>;
        loadUserDataError: string;
        user: Nullable<User>;
        userError:Nullable<User>;
        signUpFormData: {
                user: User;
                userErrors:Nullable<User>;
        },
            dialogsError: string,
            dialogs: Dialog[],
            history: Message[],
            activeDialogId: Nullable<number>,
            activeDialogTitle:Nullable<string>,
            activeDialogAvatar: Nullable<string>,
            message: string,
            messageError: string,
        profileImageFormData:{
            status?: Nullable<boolean>
            errorDescription?: Nullable<string>
            file: Nullable<File>
        }
        createChatFormData:{
            errorDescription?: Nullable<string>,
            status?: Nullable<boolean>,
        }
        passwordValidation: {
            password?: string,
            password_repeat?: string,
            passwordErrorText?: string,
            password_repeatErrorText?: string,
        }
        passwordFormData:{
            status?: Nullable<boolean>
            errorDescription?: Nullable<string>
        }
        signUpFormError: Nullable<string>,
        addUserFormData: any;
        profileSettingsFormError: string;
    }
}
