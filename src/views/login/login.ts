import Block from 'core/Block';
import { getProfileInfo, login } from 'services/AuthService';
import { withRouter, withStore } from 'utils';
import { Store } from 'core/Store';
import { BrowserRouter } from 'core/Route';

interface ILoginData {
    login: string;
    password: string;
}
type LoginPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    isLoading: boolean;
};

class Login extends Block {
    constructor(props: LoginPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onSignUpClick: () => this.props.router.go('/sign-up'),
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
        let intervalId = setInterval(() => {
            if (this.props.store.getState().user?.id) {
                this.props.router.go('/dialogs');
                clearInterval(intervalId);
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
                }
            },
        };
    }

    render() {
        // language=hbs
        return `
        <main {{#if isLoading}}class="loading"{{/if}}>
            <div class="login">
                <img class="login__img" src="img/user(144x144)@1x.png">
                {{{InputLabel id="loginLoginPage"
                              style="login"
                              placeholder="??????????" 
                              type="text"
                              validationType="login"
                }}}
                {{{InputLabel id="passwordLoginPage"
                              style="login"
                              placeholder="????????????" 
                              type="password"
                }}}
                {{{ Button text="??????????" link="/dialogs" onClick=onLogin}}}
                {{#if formError}}{{{ ErrorText errorText = formError}}}{{/if}}
                {{{Link link="/sign-up" style="textLink"  text="?????? ?????????????????" onClick=onSignUpClick}}}
            </div>
        </main>
        `;
    }
}

export default withRouter(withStore(Login));
