import {Base} from "./Base";
import {UserDTO} from "./types";

class User extends Base {
    private baseUrl = 'user';

    public updateProfile(data: UserDTO) {
        return super.put(this.baseUrl + '/profile', {data: {...data}}).then((response) => {
            return JSON.parse(response);
        })
    }
}

const instance = new User()
export default instance