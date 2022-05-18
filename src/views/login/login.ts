import Block from '../../core/Block';
import { getProfileInfo, login } from '../../services/AuthService';
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
            onLogin: () => {
                const loginData: ILoginData = {
                    login: (document.getElementById('loginLoginPage') as HTMLInputElement)?.value,
                    password: (document.getElementById('passwordLoginPage') as HTMLInputElement)?.value,
                };

                const errors = {
                    login: (document.getElementById('loginLoginPageErrorText') as HTMLInputElement)?.innerHTML,
                    password: (document.getElementById('passwordLoginPageErrorText') as HTMLInputElement)?.innerHTML,
                };
                const hasNoError = errors.login == '' && errors.password == '';

                if (hasNoError) {
                    this.props.store.dispatch(login, loginData);
                    if (!this.props.store.getState().loginFormError) {
                        this.props.onSignInClick();
                    }
                }
            },
        };
    }

    render() {
        // language=hbs
        return `
        <main>
            <div class="login">
                <img class="login__img" src="img/user(144x144)@1x.png">
                {{{InputLabel id="loginLoginPage"
                              style="login"
                              placeholder="Логин" 
                              type="text"
                              validationType="login"
                }}}
                {{{InputLabel id="passwordLoginPage"
                              style="login"
                              placeholder="Пароль" 
                              type="password"
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
