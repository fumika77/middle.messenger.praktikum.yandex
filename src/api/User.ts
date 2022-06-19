import {Base, IRequestOptions} from "./Base";
import {UserPassword, UserSearchById, UserSearchByLogin} from "./types";


class User extends Base {
    private baseUrl = 'user';

    public updateProfile(data: User) {
        return super.put(this.baseUrl + '/profile', {data} as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public updateAvatar(file: File) {
        const data = new FormData();
        data.append('avatar', file);
        return super.put(this.baseUrl + '/profile/avatar', {data: data, file:true} as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public updatePassword(data: UserPassword) {
        return super.put(this.baseUrl + '/password', {data: data} as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public getUserByLogin(data: UserSearchByLogin) {
        return super.post(this.baseUrl + '/search', {data: data}).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public getUserById(data: UserSearchById) {
        return super.get(this.baseUrl + `/${data.id}`, {data: data} as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }
}

const instance = new User()
export default instance