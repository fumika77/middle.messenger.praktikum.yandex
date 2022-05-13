import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import { withStore, withRouter } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { signUp } from '../../services/AuthService';

type SignUpPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class SignUp extends Block {
    constructor(props: SignUpPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().signUpFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onClick: () => this.props.router.go('/login'),
            login: () => this.props.store.getState().signUpFormData.user.login,
            first_name: () => this.props.store.getState().signUpFormData.user.first_name,
            second_name: () => this.props.store.getState().signUpFormData.user.second_name,
            email: () => this.props.store.getState().signUpFormData.user.email,
            phone: () => this.props.store.getState().signUpFormData.user.phone,
            password: () => this.props.store.getState().signUpFormData.user.password,
            password_repeat: () => this.props.store.getState().signUpFormData.user.password_repeat,
        });
    }

    componentDidMount() {
        if (!this.props.store.getState().user.id === null) {
            this.props.router.go('/dialogs');
        }
    }

    protected getStateFromProps() {
        this.state = {
            updateSignUpData: () => {
                const signUpData = {
                    login: (document.getElementById('loginSignUp') as HTMLInputElement)?.value,
                    first_name: (document.getElementById('firstNameSignUp') as HTMLInputElement)?.value,
                    second_name: (document.getElementById('secondNameSignUp') as HTMLInputElement)?.value,
                    password: (document.getElementById('passwordSignUp') as HTMLInputElement)?.value,
                    password_repeat: (document.getElementById('passwordRepeatSignUp') as HTMLInputElement)?.value,
                    email: (document.getElementById('emailSignUp') as HTMLInputElement)?.value,
                    phone: (document.getElementById('phoneSignUp') as HTMLInputElement)?.value,
                };
                const validationResults: { [id: string]: IError } = Validation({ ...signUpData });
                const nextState = {
                    userErrors: {
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
                    user: { ...signUpData },
                };
                this.props.store.dispatch({ signUpFormData: { ...nextState } });
            },
            onSignUpButtonClick: () => {
                const { userErrors } = this.props.store.getState().signUpFormData;
                if (Object.keys(userErrors).find((key) => userErrors[key] !== '') == null) {
                    this.props.store.dispatch(signUp, this.props.store.getState().signUpFormData.user);
                }
            },
            onChange: () => {
                this.state.updateSignUpData();
            },
        };
    }

    render() {
        const errors = { ...this.props.store.getState().signUpFormData.userErrors };
        const values = { ...this.props.store.getState().signUpFormData.user };

        // language=hbs
        return `
            <main>
                <div class="sign__up__box">
                    <div class="sign__up__formBox">
                        <h1 class="header text">Регистрация</h1>
                        {{{InputLabel id="firstNameSignUp"
                                      type="text"
                                      value="${values.first_name}"
                                      error="${errors.first_name}"
                                      label="Имя"
                                      style="sign__up"
                                      onChange=onChange}}}
                        {{{InputLabel id="secondNameSignUp"
                                      type="text"
                                      value="${values.second_name}"
                                      error="${errors.second_name}"
                                      label="Фамилия"
                                      style="sign__up"
                                      onChange=onChange}}}
                        {{{InputLabel id="loginSignUp"
                                      type="text"
                                      value="${values.login}"
                                      error="${errors.login}"
                                      label="Логин"
                                      style="sign__up"
                                      onChange=onChange}}}
                        {{{InputLabel id="passwordSignUp"
                                      type="password"
                                      value="${values.password}"
                                      error="${errors.password}"
                                      label="Пароль"
                                      style="sign__up"
                                      onChange=onChange}}}
                        {{{InputLabel id="passwordRepeatSignUp"
                                      type="password"
                                      value="${values.password_repeat}"
                                      error="${errors.password_repeat}"
                                      label="Повторите пароль"
                                      style="sign__up"
                                      onChange=onChange}}}
                        {{{InputLabel id="emailSignUp"
                                      type="text"
                                      value="${values.email}"
                                      error="${errors.email}"
                                      label="Почта"
                                      style="sign__up"
                                      onChange=onChange}}}
                        {{{InputLabel id="phoneSignUp"
                                      type="number"
                                      value="${values.phone}"
                                      error="${errors.phone}"
                                      label="Телефон"
                                      style="sign__up"
                                      onChange=onChange
                        }}}
                        {{{Button text="Зарегистрироваться" onClick=onSignUpButtonClick}}}
                        {{{ErrorText errorText=formError}}}
                        {{{Link class="textLink" text="Войти" link="/profile-settings" onClick=onClick}}}
                    </div>
                </div>
            </main>
        `;
    }
}

export default withRouter(withStore(SignUp));
