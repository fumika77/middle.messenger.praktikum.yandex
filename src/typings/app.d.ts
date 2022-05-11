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
        createChatFormError: Nullable<string>;
        user: User;
        userError:Nullable<User>;
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
            status: Nullable<boolean>
            errorDescription: Nullable<string>
        }
        updatePasswordFormData:{
            status: Nullable<boolean>
            errorDescription: Nullable<string>
        }
        updatePasswordFormError: string;
        updateAvatarFormError: string;
        addUserFormData: any;
        profileSettingsFormError: string;
        profileImageFormError: string;
    }
    export type User = {
        id?: number;
        login: string;
        first_name: string;
        second_name: string;
        email: string;
        phone: string;
        display_name?: string;
        avatar: string;
    }
    export type Message = {
        time: Date,
        timeString: string,
        content: string,
        userId: number,
        userLogin: Nullable<string>,
        isOtherUser: boolean,
    }
    export type Dialog = {
        id: number,
        title: string,
        avatar: string,
        unread_count: 15,
        last_message: {
            user: User,
            time: string,
            content: string
        }
    }
}
