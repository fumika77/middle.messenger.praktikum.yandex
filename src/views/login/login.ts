import Block from '../../core/Block';
import { getProfileInfo, login } from '../../services/AuthService';
import { IError, Validation } from '../../utils/validation';
import { withRouter, withStore } from '../../utils';
import { Store } from '../../core/Store';
import { BrowserRouter } from '../../core/Route';

interface ILoginData {
    login: string;
    password: string;
}
type LoginPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

class Login extends Block {
    constructor(props: LoginPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onSignUpClick: () => this.props.router.go('/sign-up'),
            onSignInClick: () => this.props.router.go('/dialogs'),
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
        setTimeout(() => {
            if (this.props.store.getState().user?.id) {
                this.props.onSignInClick();
            }
        }, 100);
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                login: this.props.store.getState().loginData.values.login,
                password: this.props.store.getState().loginData.values.password,
            },
            errors: {
                login: this.props.store.getState().loginData.errors.login,
                password: this.props.store.getState().loginData.errors.password,
            },
            hasError: this.props.store.getState().loginData.hasError,
            updateLoginData: () => {
                const loginData: ILoginData = {
                    login: (document.getElementById('loginLogin') as HTMLInputElement)?.value,
                    password: (document.getElementById('passwordLogin') as HTMLInputElement)?.value,
                };

                const validationResults: { [id: string]: IError } = Validation({ ...loginData });
                const nextState = {
                    errors: {
                        login: validationResults.login.status ? '' : validationResults.login.errorText,
                        password: validationResults.password.status ? '' : validationResults.password.errorText,
                    },
                    values: { ...loginData },
                    hasError: !validationResults.login.status || !validationResults.password.status,
                };
                this.props.store.dispatch({ loginData: { ...nextState } });
            },
            onLogin: () => {
                this.state.updateLoginData();
                if (!this.state.hasError) {
                    this.props.store.dispatch(login, this.props.store.getState().loginData.values);
                    if (!this.props.store.getState().loginFormError) {
                        this.props.onSignInClick();
                    }
                }
            },
            onChange: () => {
                this.state.updateLoginData();
            },
        };
    }

    render() {
        const { values, errors } = this.props.store.getState().loginData;

        // language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src="img/user(144x144)@1x.png">
                {{{InputLabel id="loginLogin"
                              value="${values.login}"
                              error="${errors.login}"
                              style="login"
                              placeholder="Логин" 
                              type="text"
                              onChange=onChange
                }}}
                {{{InputLabel id="passwordLogin"
                              value="${values.password}"
                              error="${errors.password}"
                              style="login"
                              placeholder="Пароль" 
                              type="password"
                              onChange=onChange
                }}}
                {{{ Button text="Войти" link="/dialogs" onClick=onLogin}}}
                {{#if formError}}{{{ ErrorText errorText = formError}}}{{/if}}
                {{{Link link="/sign-up" style="textLink"  text="Нет аккаунта?" onClick=onSignUpClick}}}
            </div>
        </main>
        `;
    }
}

export default withRouter(withStore(Login));
