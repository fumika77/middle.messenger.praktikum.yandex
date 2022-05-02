import {BaseService} from "./BaseService";

class LoginAPI extends BaseService{
    public login(login:string, password:string){
        console.log('login post')
        return super.post('auth/signup',{data: {login: login, password:password}} ).then((response) => {
            const isJson = response.headers
                .get('content-type')
                ?.includes('application/json');
            return isJson ? response.json() : null;
        }).then((data) => {
                return data as unknown;
            })
    }
}

const instance = new LoginAPI();
export default instance;