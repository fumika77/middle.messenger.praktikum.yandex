import Block from '../../core/Block';
import {getProfileInfo, login, logout} from '../../services/AuthService';
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
            onSignUpClick: () => this.props.router.go('/sign-up')
        });
    }

    componentDidMount() {
        //this.props.store.dispatch(getProfileInfo)
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
            hasError: null,
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
                    hasError: !validationResults.login.status && !validationResults.password.status
                };
                this.setState(nextState);
            },
            onLogin: () => {
                this.state.updateLoginData();
                console.log('loginData', this.state.values);
                if (!this.state.hasError) {
                    this.props.store.dispatch(login, this.state.values);
                }
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
                {{#if this.props.formError}}{{{ ErrorText errorText = this.props.formError}}}{{/if}}
                {{{ Link link="/sign-up" style="textLink"  text="Нет аккаунта?" onClick=this.props.onSignUpClick}}}
            </div>
        </main>
        `;
    }
}

export default withRouter(withStore(Login))