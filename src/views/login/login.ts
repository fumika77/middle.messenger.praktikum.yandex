import Block from "../../utils/Block";
import img from "../../../static/img/user(144x144)@1x.png";
import {addEventListner} from "../../index";
import {redirect} from "../../utils/redirect";
import {IError, Validation} from "../../utils/validation";

interface ILoginData{
    login:string,
    password: string,
}

export class Login extends Block{

    protected getStateFromProps() {
        this.state = {
            values: {
                login:'',
                password:''
            },
            errors: {
                login:'',
                password:''
            },
            onLogin: () => {
                const loginData:ILoginData = {
                    login: (this.refs['login'].childNodes[3]  as HTMLInputElement)?.value,
                    password: (this.refs['password'].childNodes[3]  as HTMLInputElement)?.value,
                };

                let validationResults: { [id: string]: IError } = Validation({...loginData});
                const nextState = {
                    errors: {
                        login: validationResults.login.status ? '' : validationResults.login.errorText,
                        password: validationResults.password.status ? '' : validationResults.password.errorText,
                    },
                    values: {...loginData},
                };
                this.setState(nextState);
                if(nextState.errors.login=='' && nextState.errors.password==''){
                    redirect('dialogs');
                }
            },
            onSignUpClick: () => {
                redirect('signUp');
            }
        }
    }

    render() {
        const {values, errors} = this.state;
        //language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src="img/user(144x144)@1x.png" alt="login">
                {{{ InputLabel ref="login" 
                              value="${values.login}"
                              error="${errors.login}"
                              style="login"
                              placeholder="Логин" 
                              type="text"}}}
                {{{ InputLabel ref="password"  
                              value="${values.password}"
                              error="${errors.password}"
                              style="login"
                              placeholder="Пароль" 
                              type="password" }}}
                {{{ Button text="Войти" onClick=onLogin}}}
                {{{ Link link="#signUp" style="textLink"  text="Нет аккаунта?" onClick=onSignUpClick}}}
            </div>
        </main>
        `
    }
}