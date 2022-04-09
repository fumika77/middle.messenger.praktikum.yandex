import Block from "../../utils/Block";
import img from "../../../static/img/user(144x144)@1x.png";
import {addEventListner} from "../../index";
import {redirect} from "../../utils/redirect";

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
                console.log('login click')
                const loginData:ILoginData = {
                    login: (this.refs['login'].firstElementChild as HTMLInputElement).value,
                    password: (this.refs['password'].firstElementChild as HTMLInputElement).value,
                };
                const nextState = {
                    values: { ...loginData },
                };
                redirect('dialogs');
                this.setState(nextState);
            },
            onSignUpClick: () => {
                console.log('signUP click')
                redirect('signUp');
            }
        }
    }

    render() {
        const {values} = this.state;
        //language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src="img/user(144x144)@1x.png" alt="login">
                {{{ Input ref="login" 
                          value="${values.login}"
                          style="input && login__input__login && text"
                          placeholder="Логин" 
                          type="text"}}}
                {{{ Input ref="password"  
                          value="${values.password}"
                          style="input && text"
                          placeholder="Пароль" 
                          type="password" }}}
                {{{ Button link="#dialogs" text="Войти" pageValues=${values} onClick=onLogin}}}
                {{{ Link link="#signUp" style="textLink"  text="Нет аккаунта?" onClick=onSignUpClick}}}
            </div>
        </main>
        `
    }
}