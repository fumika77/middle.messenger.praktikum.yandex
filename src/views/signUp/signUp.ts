import Block from '../../utils/Block';
import { IError, Validation } from '../../utils/validation';
import { redirect } from '../../utils/redirect';

export class SignUp extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                first_name: '',
                second_name: '',
                password: '',
                password_repeat: '',
                email: '',
                phone: '',
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
                };

                this.setState(nextState);
            },
            onClick: () => {
                this.state.updateSignUpData();
                if (Object.keys(this.state.errors).find((key) => this.state.errors[key] !== '') == null) {
                    redirect('login');
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
                        {{{Button text="Зарегистрироваться" onClick=onClick}}}
                        <a href="" class="textLink" click=onClick>Войти</a>
                    </div>
                </div>
            </main>
        `;
    }
}
