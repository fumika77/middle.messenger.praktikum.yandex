import {ChatWebSocket} from "../core/ChatWebSocket";

declare module '*.hbs';
declare global {
    export type Nullable<P> = P | null;
    export type AppState = {
        screen: Screens | null;
        socket: ChatWebSocket | null;
        isLoading: boolean;
        loginFormError: string|null;
        createChatFormError: Nullable<string>;
        user: User;
        userError: User|null;
        dialogsFormData: any;
        updatePasswordFormError: string;
        updateAvatarFormError: string;
    }
    export type User = {
        id: number;
        login: string;
        first_name: string;
        second_name: string;
        email: string;
        phone: string;
        display_name: string;
        avatar: string;
    }
}
