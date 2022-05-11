import {MessageDTO, User} from '../api/types';
import {Message} from "../services/ChatService";

export const transformUser = (data: User): User => {
    return {
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        email: data.email,
        phone: data.phone,
        display_name: data.display_name,
        avatar: data.avatar,
        id: data.id,
    };
};

export const transformMessage = (data: MessageDTO, userId: number): Message => {
    return {
        time: new Date(data.time),
        timeString: new Date(data.time).toLocaleDateString() + new Date(data.time).toLocaleTimeString(),
        content: data.content,
        userId: parseInt(data.user_id),
        userLogin: null,
        isOtherUser: parseInt(data.user_id) !== userId,
    };
};

