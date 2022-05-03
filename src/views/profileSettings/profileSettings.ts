import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import {withRouter, withStore} from "../../utils";
import {BrowserRouter} from "../../core/Route";
import {Store} from "../../core/Store";
import {getProfileInfo, login} from "../../services/AuthService";
import {hasError} from "../../utils/apiHasError";
import {updateProfileInfo} from "../../services/ProfileService";


type ProfileSettingsPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    isLoading?: () => boolean;
};

export class ProfileSettings extends Block {
    constructor(props:ProfileSettingsPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.back()
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo)
        this.props.store.on('change', () => {
            this.getStateFromProps()
            }
        )
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                login: this.props.store.getState().user?.login,
                first_name: this.props.store.getState().user?.first_name,
                second_name: this.props.store.getState().user?.second_name,
                display_name: this.props.store.getState().user?.display_name,
                email: this.props.store.getState().user?.email,
                phone: this.props.store.getState().user?.phone,
            },
            errors: {
                login: this.props.store.getState().userErrors?.login,
                first_name: this.props.store.getState().userErrors?.first_name,
                second_name: this.props.store.getState().userErrors?.second_name,
                display_name: this.props.store.getState().userErrors?.display_name,
                email: this.props.store.getState().userErrors?.email,
                phone: this.props.store.getState().userErrors?.phone,
            },
            formError: this.props.store.getState().profileSettingsFormError,
            updateProfileSettingsData: () => {
                const profileSettingsData = {
                    login: (this.refs.login.childNodes[3] as HTMLInputElement)?.value,
                    first_name: (this.refs.first_name.childNodes[3] as HTMLInputElement)?.value,
                    second_name: (this.refs.second_name.childNodes[3] as HTMLInputElement)?.value,
                    display_name: (this.refs.display_name.childNodes[3] as HTMLInputElement)?.value,
                    email: (this.refs.email.childNodes[3] as HTMLInputElement)?.value,
                    phone: (this.refs.phone.childNodes[3] as HTMLInputElement)?.value,
                };

                const validationResults: { [id: string]: IError } = Validation({ ...profileSettingsData });
                const nextState = {
                    errors: {
                        login: validationResults.login.status ? '' : validationResults.login.errorText,
                        first_name: validationResults.first_name.status ? '' : validationResults.first_name.errorText,
                        second_name: validationResults.second_name.status
                            ? ''
                            : validationResults.second_name.errorText,
                        display_name: validationResults.display_name.status
                            ? ''
                            : validationResults.display_name.errorText,
                        email: validationResults.email.status ? '' : validationResults.email.errorText,
                        phone: validationResults.phone.status ? '' : validationResults.phone.errorText,
                    },
                    values: { ...profileSettingsData }
                };
                console.log(nextState.values)

                this.props.store.dispatch({user: {
                    ...nextState.values
                    },
                    userErrors: {
                    ...nextState.errors
                    }
                })
            },
            onClick: () => {
                this.state.updateProfileSettingsData();
                if (Object.keys(this.state.errors).find((key) => this.state.errors[key] !== '') == null) {
                    this.props.store.dispatch(updateProfileInfo, this.state.values);
                }
            },
            onChange: () => {
                this.state.updateProfileSettingsData();
            },
        };
    }

    render() {
        const { errors, values , formError} = this.state;
        // language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{{BackArrow onClick=onBackArrowClick}}}
                    {{{Avatar style="profileImg" src="img/animals.png"}}}
                    <img class="profile__settings__editImg" src="img/image-edit(40x40)@1x.png">
                    <h1 class="profile__settings__header && text">Настройки профиля</h1>
                    <div class="profile__settings__formData">
                        {{{InputLabel ref ="first_name" 
                                      id="first_name" 
                                      type="text" 
                                      value="${values.first_name}"
                                      error="${errors.first_name}"
                                      onChange=onChange
                                      label="Имя"  
                                      style="profile"}}}
                        {{{InputLabel ref ="second_name" 
                                      id="second_name" 
                                      type="text" 
                                      value="${values.second_name}" 
                                      error="${errors.second_name}"
                                      onChange=onChange
                                      label="Фамилия" 
                                      style="profile"}}}
                        {{{InputLabel ref ="login" 
                                      id="login" 
                                      type="text" 
                                      value="${values.login}" 
                                      error="${errors.login}"
                                      onChange=onChange
                                      label="Логин"  
                                      style="profile"}}}
                        {{{InputLabel ref ="display_name" 
                                      id="display_name" 
                                      type="text" 
                                      value="${values.display_name}" 
                                      error="${errors.display_name}"
                                      onChange=onChange
                                      label="Ник"  
                                      style="profile"}}}
                        {{{InputLabel ref ="email" 
                                      id="email" 
                                      type="text" 
                                      value="${values.email}" 
                                      error="${errors.email}"
                                      onChange=onChange
                                      label="Почта"  
                                      style="profile"}}}
                        {{{InputLabel ref ="phone" 
                                      id="phone" 
                                      type="number" 
                                      value="${values.phone}" 
                                      error="${errors.phone}"
                                      onChange=onChange
                                      label="Телефон"  
                                      style="profile"}}}
                        {{{Button text="Сохранить" onClick=onClick}}}
                        {{{ErrorText errorText = "${formError}" }}}
                    </div>
                </div>
            </main>
        `;
    }
}
export default withRouter(withStore(ProfileSettings))