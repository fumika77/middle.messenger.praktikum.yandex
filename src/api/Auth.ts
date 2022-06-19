import {Base, IRequestOptions} from "./Base";

class Auth extends Base{
    private baseUrl = 'auth';

    public login(data){
        return super.post(this.baseUrl + '/signin',{data} ).then((response) => {
            return response == 'OK'? response : JSON.parse(response as string);
        })
    }

    public signUp(data){
        return super.post(this.baseUrl + '/signup',{data} ).then((response) => {
            return JSON.parse(response as string);
        })
    }

    public profileInfo(){
        return super.get(this.baseUrl + '/user',{} as IRequestOptions).then((response) => {
            return response;
        })
    }

    public logout(){
        return super.post(this.baseUrl + '/logout',{} as IRequestOptions ).then((response) => {
            return response;
        })
    }
}

const instance = new Auth();
export default instance;