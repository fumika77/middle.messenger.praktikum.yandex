import Block from '../../core/Block';
import {withRouter, withStore} from "../../utils";
import {BrowserRouter} from "../../core/Route";
import {Store} from "../../core/Store";
import {updateProfilePassword} from "../../services/ProfileService";
import {IError, Validation} from "../../utils/validation";
import {UserPassword} from "../../api/types";

type ProfilePasswordPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class ProfilePassword extends Block {
    constructor(props:ProfilePasswordPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.go('/profile'),
            passwordFormData: () => this.props.store.getState().passwordFormData,
            old_password: () => this.props.store.getState().passwordFormData.values.old_password,
            password: () => this.props.store.getState().passwordFormData.values.password,
            password_repeat: () => this.props.store.getState().passwordFormData.values.password_repeat,
            old_password_error: () => this.props.store.getState().passwordFormData.errors.old_password,
            password_error: () => this.props.store.getState().passwordFormData.errors.password,
            password_repeat_error: () => this.props.store.getState().passwordFormData.errors.password_repeat,
        });
    }
    protected getStateFromProps() {
        this.state = {
            updateFormData : () => {
                const formData = {
                    old_password: (document.getElementById('old_password') as HTMLInputElement)?.value,
                    password: (document.getElementById('new_password') as HTMLInputElement)?.value,
                    password_repeat: (document.getElementById('password_repeat') as HTMLInputElement)?.value
                }
                const validationResults: { [id: string]: IError } = Validation({ ...formData });
                const nextState = {
                    errors: {
                        old_password: validationResults.old_password.status ? '' : validationResults.old_password.errorText,
                        password: validationResults.password.status ? '' : validationResults.password.errorText,
                        password_repeat: validationResults.password_repeat.status
                            ? ''
                            : validationResults.password_repeat.errorText
                    },
                    values: { ...formData }
                };
                this.props.store.dispatch({passwordFormData: nextState})
            },
            onClick : () => {
                this.state.updateFormData()
                const {passwordFormData} = this.props;
                if (Object.keys(passwordFormData?.errors).find((key) => passwordFormData?.errors[key] !== '') == null) {
                    this.props.store.dispatch(updateProfilePassword,
                        {oldPassword: passwordFormData?.values.old_password, newPassword:passwordFormData?.values.password} as UserPassword);
                }
            },
            onChange: () => {
                this.state.updateFormData()
            }
        }
    }

    render() {
        // language=hbs
        return `
            <main> 
            <div class="profile__password__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                {{{InputLabel id="old_password"
                              type="password"
                              value=old_password
                              error=old_password_error
                              label="Cтарый пароль"
                              style="signUp"
                              onChange=onChange}}}
                {{{InputLabel id="new_password"
                              type="password"
                              value=password
                              error=password_error
                              label="Новый пароль"
                              style="signUp"
                              onChange=onChange}}}
                {{{InputLabel id="password_repeat"
                              type="password"
                              value=password_repeat
                              error=password_repeat_error
                              label="Повторите пароль"
                              style="signUp"
                              onChange=onChange}}}
                {{{Button text="Сохранить" onClick=onClick}}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(ProfilePassword))