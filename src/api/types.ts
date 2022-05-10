export type APIError = {
    reason: string;
};

export type User = {
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

export type UserSearchByLogin = {
    login: string;
}

export type UserSearchById = {
    id: number;
}

export type ChatListRequest = {
    offset: number,
    limit: number,
    title: string,
}

export type ChatCreateRequest = {
    title: string,
}

export type ChatDeleteRequest = {
    id: number,
}

export type ModifyChatUserRequest = {
    users: number[],
    chatId: number,
}

export type initWebSocketRequest = {
    chatId: number,
    userId: number,
}

export type messageRequest = {
    message: string,
}


export type MessageDTO = {
    chat_id: "number",
    time: "string",
    type: "string",
    user_id: "string",
    content: "string",
    file?: {
        id: "number",
        user_id: "number",
        path: "string",
        filename: "string",
        content_type: "string",
        content_size: "number",
        upload_date: "string",
    }
},