import Block from 'core/Block';
import { withStore, withRouter } from 'utils';
import { BrowserRouter } from 'core/Route';
import { Store } from 'core/Store';
import { signUp } from 'services/AuthService';

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
            onSignUpButtonClick: () => this.state.onClick(),
        });
    }

    componentDidMount() {
        if (!this.props.store.getState().user.id === null) {
            this.props.router.go('/dialogs');
        }
    }

    protected getStateFromProps() {
        this.state = {
            onClick: () => {
                const values = {
                    login: (document.getElementById('loginSignUpPage') as HTMLInputElement)?.value,
                    first_name: (document.getElementById('firstNameSignUpPage') as HTMLInputElement)?.value,
                    second_name: (document.getElementById('secondNameSignUpPage') as HTMLInputElement)?.value,
                    password: (document.getElementById('passwordSignUpPage') as HTMLInputElement)?.value,
                    password_repeat: (document.getElementById('passwordRepeatSignUpPage') as HTMLInputElement)?.value,
                    email: (document.getElementById('emailSignUpPage') as HTMLInputElement)?.value,
                    phone: (document.getElementById('phoneSignUpPage') as HTMLInputElement)?.value,
                };
                const errors = {
                    login: (document.getElementById('loginSignUpPageErrorText') as HTMLInputElement)?.innerText,
                    first_name: (document.getElementById('firstNameSignUpPageErrorText') as HTMLInputElement)
                        ?.innerText,
                    second_name: (document.getElementById('secondNameSignUpPageErrorText') as HTMLInputElement)
                        ?.innerText,
                    password: (document.getElementById('passwordSignUpPageErrorText') as HTMLInputElement)?.innerText,
                    password_repeat: (document.getElementById('passwordRepeatSignUpPageErrorText') as HTMLInputElement)
                        ?.innerText,
                    email: (document.getElementById('emailSignUpPageErrorText') as HTMLInputElement)?.innerText,
                    phone: (document.getElementById('phoneSignUpPageErrorText') as HTMLInputElement)?.innerText,
                };
                if (Object.keys(errors).find((key) => errors[key] !== '') == null) {
                    this.props.store.dispatch(signUp, { ...values });
                }
            },
        };
    }

    render() {
        // language=hbs
        return `
            <main>
                <div class="sign__up__box">
                    <div class="sign__up__formBox">
                        <h1 class="header text">Регистрация</h1>
                        {{{InputLabel id="firstNameSignUpPage"
                                      type="text"
                                      validationType="first_name"
                                      label="Имя"
                                      style="sign__up"
                                      }}}
                        {{{InputLabel id="secondNameSignUpPage"
                                      type="text"
                                      validationType="first_name"
                                      label="Фамилия"
                                      style="sign__up"
                                      }}}
                        {{{InputLabel id="loginSignUpPage"
                                      type="text"
                                      validationType="login"
                                      label="Логин"
                                      style="sign__up"
                                      }}}
                        {{{InputLabel id="passwordSignUpPage"
                                      type="password"
                                      label="Пароль"
                                      style="sign__up"
                                      }}}
                        {{{InputLabel id="passwordRepeatSignUpPage"
                                      type="password"
                                      label="Повторите пароль"
                                      style="sign__up"
                                      }}}
                        {{{InputLabel id="emailSignUpPage"
                                      type="text"
                                      validationType="email"
                                      label="Почта"
                                      style="sign__up"
                                      }}}
                        {{{InputLabel id="phoneSignUpPage"
                                      type="number"
                                      validationType="phone"
                                      label="Телефон"
                                      style="sign__up"
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
