import {Base} from "./Base";

class Auth extends Base{
    private baseUrl = 'auth';

    public login(data){
        return super.post(this.baseUrl + '/signin',{data} ).then((response) => {
            return response == 'OK'? response : JSON.parse(response);
        })
    }

    public signUp(data){
        return super.post(this.baseUrl + '/signup',{data} ).then((response) => {
            return JSON.parse(response);
        })
    }

    public profileInfo(){
        return super.get(this.baseUrl + '/user',{} ).then((response) => {
            return JSON.parse(response);
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