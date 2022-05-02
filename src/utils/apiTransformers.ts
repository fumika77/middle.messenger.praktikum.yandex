import { UserDTO } from '../api/types';

export const transformUser = (data: UserDTO): User => {
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