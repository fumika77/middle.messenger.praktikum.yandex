import {Base} from "./Base";

class Auth extends Base{
    private baseUrl = 'auth';

    public login(data){
        return super.post(this.baseUrl + '/signin',{data: {...data}} ).then((response) => {
            return response;
        })
    }

    public signUp(data){
        return super.post(this.baseUrl + '/signup',{data: {...data}} ).then((response) => {
            return response;
        })
    }

    public profileInfo(){
        return super.get(this.baseUrl + '/user',{} ).then((response) => {
            return response;
        })
    }

    public logout(){
        return super.post(this.baseUrl + '/logout',{} ).then((response) => {
            return response;
        })
    }
}

const instance = new Auth();
export default instance;