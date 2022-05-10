import {Base} from "./Base";
import {User, UserPassword, UserSearch} from "./types";

class User extends Base {
    private baseUrl = 'user';

    public updateProfile(data: User) {
        return super.put(this.baseUrl + '/profile', {data: {...data}}).then((response) => {
            return JSON.parse(response);
        })
    }

    public updateAvatar(file: File) {
        const data = new FormData();
        data.append('avatar', file);
        return super.put(this.baseUrl + '/profile/avatar', {data: data, file:true}).then((response) => {
            return JSON.parse(response);
        })
    }

    public updatePassword(data: UserPassword) {
        return super.put(this.baseUrl + '/password', {data: data}).then((response) => {
            return JSON.parse(response);
        })
    }

    public searchUser(data: UserSearch) {
        return super.post(this.baseUrl + '/search', {data: data}).then((response) => {
            return JSON.parse(response);
        })
    }
}

const instance = new User()
export default instance