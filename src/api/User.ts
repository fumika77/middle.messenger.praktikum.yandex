import { Base } from './Base';
import { UserPassword, UserSearchById, UserSearchByLogin } from './types';

class UserApi extends Base {
    private baseUrl = 'user';

    public updateProfile(data: User) {
        return super.put(`${this.baseUrl}/profile`, { data }).then((response) => {
            return JSON.parse(response);
        });
    }

    public updateAvatar(file: File) {
        const data = new FormData();
        data.append('avatar', file);
        return super.put(`${this.baseUrl}/profile/avatar`, { data: data, file: true }).then((response) => {
            return JSON.parse(response);
        });
    }

    public updatePassword(data: UserPassword) {
        return super.put(this.baseUrl + '/password', { data: data }).then((response) => {
            return response == 'OK' ? response : JSON.parse(response);
        });
    }

    public getUserByLogin(data: UserSearchByLogin) {
        return super.post(this.baseUrl + '/search', { data: data }).then((response) => {
            return JSON.parse(response);
        });
    }

    public getUserById(data: UserSearchById) {
        return super.get(`${this.baseUrl}/${data.id}`, { data: data }).then((response) => {
            return JSON.parse(response);
        });
    }
}

const instance = new UserApi();
export default instance;
