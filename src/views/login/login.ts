import Block from "../../utils/Block";
import img from "../../../static/img/user(144x144)@1x.png";

interface ILoginData{
    login:string,
    password: string,
}

export class Login extends Block{
    constructor() {
        super({});
    }

    componentDidUpdate (oldProps: any,newProps:any){
        return !oldProps.login==newProps.login && oldProps.password==newProps.password;
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                login:'',
                password:''
            },
            onLogin: () => {
                const loginData:ILoginData = {
                    login: (this.refs['login'].firstElementChild as HTMLInputElement).value,
                    password: (this.refs['password'].firstElementChild as HTMLInputElement).value,
                };
                const nextState = {
                    values: { ...loginData },
                };

                this.setState(nextState);
            }
        }
    }

    render() {
        const {values} = this.state;
        //language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src=${img} alt="login">
                {{{ Input ref="login" 
                          value="${values.login}" 
                          classList="input && login__input__login && text"
                          placeholder="Логин" 
                          type="text"}}}
                {{{ Input ref="password"  
                          value="${values.password}"
                          classList="input && text"
                          placeholder="Пароль" 
                          type="password" }}}
                {{{ Button link="../profileSettings/ProfileSettings.html" text="Войти" pageValues=${values} onClick=onLogin}}}
                <a href="../profileSettings/profileSettings.html" class="textLink" >Нет аккаунта?</a>
            </div>
        </main>
        `
    }
}