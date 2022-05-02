declare module '*.hbs';
declare global {
    export type Nullable<P> = P | null;
    export type AppState = {
        screen: Screens | null;
        isLoading: boolean;
        loginFormError: string|null;
        user: User|null;
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

    export interface Window {
        store: any;
        router: any;
    }
}
