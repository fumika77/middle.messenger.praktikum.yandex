import {ChatWebSocket} from "../core/ChatWebSocket";
import {Message} from "../services/ChatService";

declare module '*.hbs';
declare global {
    export type Nullable<P> = P | null;
    export type AppState = {
        screen: Nullable<Screens>;
        socket: Nullable<ChatWebSocket>;
        isLoading: boolean;
        loginFormError: Nullable<string>;
        userErrorRequest: Nullable<string>;
        createChatFormError: Nullable<string>;
        user: Nullable<User>;
        userError:Nullable<User>;
        signUpFormData: {
                user: User;
                userErrors:Nullable<User>;
        },
        dialogsFormData: {
            dialogsError: string,
            dialogs: Dialog[],
            history: Message[],
            activeDialog: {
                id: Nullable<number>,
                title:Nullable<string>,
                avatar: Nullable<string>,
            },
            message: string,
            messageError: string,
        },
        profileImageFormData:{
            status?: Nullable<boolean>
            errorDescription?: Nullable<string>
            file: Nullable<File>
        }
        passwordFormData:{
            values: {
                old_password: string,
                password: string,
                password_repeat: string,
            }
            errors: {
                old_password: string,
                password: string,
                password_repeat: string,
            }
            status?: Nullable<boolean>
            errorDescription?: Nullable<string>
        }
        signUpFormError: Nullable<string>,
        addUserFormData: any;
        profileSettingsFormError: string;
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
}
