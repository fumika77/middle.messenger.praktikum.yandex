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
                    login: (this.refs.login.childNodes[3]  as HTMLInputElement)?.value,
                    password: (this.refs.password.childNodes[3]  as HTMLInputElement)?.value,
                };

                const validationResults: { [id: string]: IError } = Validation({...loginData});
                const nextState = {
                    errors: {
                        login: validationResults.login.status ? '' : validationResults.login.errorText,
                        password: validationResults.password.status ? '' : validationResults.password.errorText,
                    },
                    values: {...loginData},
                };
                this.setState(nextState);
                console.log('loginData',loginData)
                if(nextState.errors.login=='' && nextState.errors.password==''){
                    redirect('dialogs');
                }
            },
            onSignUpClick: () => {
                redirect('signUp');
            },
            onInput: (id: string) => {
                const newInputValue = (document.getElementById(id)  as HTMLInputElement)?.value;
                const validationResults: IError = Validation({[id]: newInputValue})[id];
                const nextState = {...this.state};
                nextState.values[id] = newInputValue;
                nextState.errors[id] = validationResults.status? '' : validationResults.errorText;
                console.log('nextState')
                this.setState(nextState);
            }
        }
    }

    render() {
        const {values, errors} = this.state;
        // language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src="img/user(144x144)@1x.png" alt="login">
                {{{InputLabel ref="login"
                              id="login"
                              value="${values.login}"
                              error="${errors.login}"
                              style="login"
                              placeholder="Логин" 
                              type="text"
                              onInput=onInput
                }}}
                {{{InputLabel ref="password"
                              id="password"
                              value="${values.password}"
                              error="${errors.password}"
                              style="login"
                              placeholder="Пароль" 
                              type="password"
                              onInput=onInput
                }}}
                {{{ Button text="Войти" onClick=onLogin}}}
                {{{ Link link="#signUp" style="textLink"  text="Нет аккаунта?" onClick=onSignUpClick}}}
            </div>
        </main>
        `
    }
}