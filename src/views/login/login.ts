import Block from '../../core/Block';
import { redirect } from '../../utils/redirect';
import { IError, Validation } from '../../utils/validation';
import {withRouter} from "../../utils";
import {withStore} from "../../utils";
import {Store} from "../../core/Store";
import {BrowserRouter} from "../../core/Route";

interface ILoginData {
    login: string;
    password: string;
}
type LoginPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    isLoading?: () => boolean;
};

class Login extends Block {
    constructor(props: LoginPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onSignInClick: () => this.props.router.go('/dialogs'),
            onSignUpClick: () => this.props.router.go('/sign-up')
        });
    }

    componentDidMount() {
        if (this.props.store.getState().user) {
            this.props.router.go('/dialogs');
        }
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                password: '',
            },
            errors: {
                login: '',
                password: '',
            },
            updateLoginData: () => {
                const loginData: ILoginData = {
                    login: (this.refs.login.childNodes[3] as HTMLInputElement)?.value,
                    password: (this.refs.password.childNodes[3] as HTMLInputElement)?.value,
                };

                const validationResults: { [id: string]: IError } = Validation({ ...loginData });
                const nextState = {
                    errors: {
                        login: validationResults.login.status ? '' : validationResults.login.errorText,
                        password: validationResults.password.status ? '' : validationResults.password.errorText,
                    },
                    values: { ...loginData },
                };
                this.setState(nextState);
            },
            onLogin: () => {
                this.state.updateLoginData();
                console.log('loginData', this.state.values);
                this.props.onSignInClick()
            },
            onChange: () => {
                this.state.updateLoginData();
            },
        };
    }

    render() {
        const { values, errors } = this.state;
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
                {{{ Link link="/sign-up" style="textLink"  text="Нет аккаунта?" onClick=this.props.onSignUpClick}}}
            </div>
        </main>
        `;
    }
}

export default withRouter(withStore(Login))