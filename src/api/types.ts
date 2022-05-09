export type APIError = {
    reason: string;
};

export type UserDTO = {
    id?: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar?: string;
    email: string;
    phone: string;
};

export type UserPassword = {
    oldPassword: string;
    newPassword: string;
}