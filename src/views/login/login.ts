import Block from "../../utils/Block";
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
            updateLoginData: () => {
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
            },
            onLogin: () => {
                this.state.updateLoginData();
                console.log('loginData',this.state.values)
                if(this.state.errors.login=='' && this.state.errors.password==''){
                    redirect('dialogs');
                }
            },
            onSignUpClick: () => {
                redirect('signUp');
            },
            onChange: () => {
                this.state.updateLoginData();
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
                              onChange=onChange
                }}}
                {{{InputLabel ref="password"
                              id="password"
                              value="${values.password}"
                              error="${errors.password}"
                              style="login"
                              placeholder="Пароль" 
                              type="password"
                              onChange=onChange
                }}}
                {{{ Button text="Войти" onClick=onLogin}}}
                {{{ Link link="#signUp" style="textLink"  text="Нет аккаунта?" onClick=onSignUpClick}}}
            </div>
        </main>
        `
    }
}