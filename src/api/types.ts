    export type APIError = {
    reason: string;
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
export type MessageRequest = {
    message: string,
}

export type TokenRequest = {
    id: number,
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