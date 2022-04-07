import Block from "../../utils/Block";
import {IError, Validation} from "../../common/modules/validation";
// import template from "./index.hbs";

export class Login extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                login:'',
                password:''
            },
            errors: {
                login: '',
                password: '',
            },
            onLogin: () => {
                const loginData = {
                    login: (this.refs.login?.firstElementChild as HTMLInputElement)?.value,
                    password: (this.refs.password?.firstElementChild as HTMLInputElement)?.value,
                };

                let validationResults: {[id: string]: IError} = Validation({...loginData});
                const nextState = {
                    errors: {
                        login: validationResults.login.status? '' : validationResults.login.errorText,
                        password: validationResults.password.status? '' : validationResults.password.errorText,
                    },
                    values: { ...loginData },
                };


                this.setState(nextState);
                console.log('action/login', loginData);
            }
        }
    }
    render() {
        const {errors, values} = this.state;
        //language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src="../../../static/img/user(144x144)@1x.png">
                {{{ Input ref="login" 
                          value="${values.login}" 
                          error="${errors.password}" 
                          classList="input && login__input__login && text"
                          placeholder="Логин" type="text"}}}
                {{{ Input ref="password"  
                          value="${values.password}"
                          error="${errors.password}" 
                          classList="input && text"
                          placeholder="Пароль" 
                          type="password" }}}
                {{{ Button link="../dialogs/dialogs.hbs" text="Войти" onClick=onLogin}}}
                <a href="../signUp/signUp.hbs" class="textLink" >Нет аккаунта?</a>
            </div>
        </main>
        `
    }
}