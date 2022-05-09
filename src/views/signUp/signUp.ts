import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import {withStore} from "../../utils";
import {withRouter} from "../../utils";
import {BrowserRouter} from "../../core/Route";
import {Store} from "../../core/Store";
import {signUp} from "../../services/AuthService";


type SignUpPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    isLoading?: () => boolean;
};

export class SignUp extends Block {
    constructor(props:SignUpPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onClick: () => this.props.router.go('/login')
        });
    }
    protected getStateFromProps() {
        this.state = {
            values: {
                login: 'super_archi',
                first_name: 'Арчибальд',
                second_name: 'Котиков',
                password: 'Qwerty12345',
                password_repeat: 'Qwerty12345',
                email: 'kotikoff@yandex.ru',
                phone: '88008001111',
            },
            errors: {
                login: '',
                first_name: '',
                second_name: '',
                password: '',
                password_repeat: '',
                email: '',
                phone: '',
            },
            updateSignUpData: () => {
                const signUpData = {
                    login: (this.refs.login.childNodes[3] as HTMLInputElement)?.value,
                    first_name: (this.refs.first_name.childNodes[3] as HTMLInputElement)?.value,
                    second_name: (this.refs.second_name.childNodes[3] as HTMLInputElement)?.value,
                    password: (this.refs.password.childNodes[3] as HTMLInputElement)?.value,
                    password_repeat: (this.refs.password_repeat.childNodes[3] as HTMLInputElement)?.value,
                    email: (this.refs.email.childNodes[3] as HTMLInputElement)?.value,
                    phone: (this.refs.phone.childNodes[3] as HTMLInputElement)?.value,
                };
                const validationResults: { [id: string]: IError } = Validation({ ...signUpData });
                const nextState = {
                    errors: {
                        login: validationResults.login.status ? '' : validationResults.login.errorText,
                        first_name: validationResults.first_name.status ? '' : validationResults.first_name.errorText,
                        second_name: validationResults.second_name.status
                            ? ''
                            : validationResults.second_name.errorText,
                        password: validationResults.password.status ? '' : validationResults.password.errorText,
                        password_repeat: validationResults.password_repeat.status
                            ? ''
                            : validationResults.password_repeat.errorText,
                        email: validationResults.email.status ? '' : validationResults.email.errorText,
                        phone: validationResults.phone.status ? '' : validationResults.phone.errorText,
                    },
                    values: { ...signUpData },
                    hasError: !validationResults.login.status && !validationResults.first_name.status && !validationResults.second_name.status
                        && !validationResults.password.status && !validationResults.password_repeat.status
                        && !validationResults.email.status && !validationResults.phone.status
                };

                this.setState(nextState);
            },
            onSignUpButtonClick: () => {
                this.state.updateSignUpData();
                this.props.onSignUpButtonClick()
                if (!this.state.hasError) {
                    this.props.store.dispatch(signUp, this.state.values);
                }
            },
            onChange: () => {
                this.state.updateSignUpData();
            },
        };
    }

    render() {
        const { errors, values } = this.state;
        // language=hbs
        return `
            <main>
                <div class="signUp__box">
                    <div class="signUp__formBox">
                        <h1 class="header && text">Регистрация</h1>
                        {{{InputLabel id="first_name"
                                      ref="first_name"
                                      type="text"
                                      value="${values.first_name}"
                                      error="${errors.first_name}"
                                      label="Имя"
                                      style="signUp"
                                      onChange=onChange}}}
                        {{{InputLabel id="second_name"
                                      ref="second_name"
                                      type="text"
                                      value="${values.second_name}"
                                      error="${errors.second_name}"
                                      label="Фамилия"
                                      style="signUp"
                                      onChange=onChange}}}
                        {{{InputLabel id="login"
                                      ref="login"
                                      type="text"
                                      value="${values.login}"
                                      error="${errors.login}"
                                      label="Логин"
                                      style="signUp"
                                      onChange=onChange}}}
                        {{{InputLabel id="password"
                                      ref="password"
                                      type="password"
                                      value="${values.password}"
                                      error="${errors.password}"
                                      label="Пароль"
                                      style="signUp"
                                      onChange=onChange}}}
                        {{{InputLabel id="password_repeat"
                                      ref="password_repeat"
                                      type="password"
                                      value="${values.password_repeat}"
                                      error="${errors.password_repeat}"
                                      label="Повторите пароль"
                                      style="signUp"
                                      onChange=onChange}}}
                        {{{InputLabel id="email"
                                      ref="email"
                                      type="text"
                                      value="${values.email}"
                                      error="${errors.email}"
                                      label="Почта"
                                      style="signUp"
                                      onChange=onChange}}}
                        {{{InputLabel id="phone"
                                      ref="phone"
                                      type="number"
                                      value="${values.phone}"
                                      error="${errors.phone}"
                                      label="Телефон"
                                      style="signUp"
                                      onChange=onChange
                        }}}
                        {{{Button text="Зарегистрироваться" onClick=onSignUpButtonClick}}}
                        {{{Link class="textLink" text="Войти" link="/profile-settings" onClick=onClick}}}
                    </div>
                </div>
            </main>
        `;
    }
}

export default withRouter(withStore(SignUp))