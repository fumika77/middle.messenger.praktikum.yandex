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


export type UserSearch = {
    login: string;
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
