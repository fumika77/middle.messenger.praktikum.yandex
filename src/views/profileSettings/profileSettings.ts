import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import { redirect } from '../../utils/redirect';
import {withRouter, withStore} from "../../utils";
import {BrowserRouter} from "../../core/Route";
import {Store} from "../../core/Store";


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
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onBackArrowClick: () => this.props.router.go('/profile-description')
        });
    }
    protected getStateFromProps() {
        this.state = {
            values: {
                login: 'SuperArchi',
                first_name: 'Арчибальд',
                second_name: 'Котиков',
                email: 'kotikoff@kotomail.ru',
                phone: '88005678286',
            },
            errors: {
                login: '',
                first_name: '',
                second_name: '',
                email: '',
                phone: '',
            },
            updateProfileSettingsData: () => {
                const profileSettingsData = {
                    login: (this.refs.login.childNodes[3] as HTMLInputElement)?.value,
                    first_name: (this.refs.first_name.childNodes[3] as HTMLInputElement)?.value,
                    second_name: (this.refs.second_name.childNodes[3] as HTMLInputElement)?.value,
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
                        email: validationResults.email.status ? '' : validationResults.email.errorText,
                        phone: validationResults.phone.status ? '' : validationResults.phone.errorText,
                    },
                    values: { ...profileSettingsData },
                };
                this.setState(nextState);
            },
            onClick: () => {
                this.state.updateProfileSettingsData();
                console.log('profileSettingsData', this.state.values);
                if (Object.keys(this.state.errors).find((key) => this.state.errors[key] !== '') == null) {
                    this.props.onBackArrowClick()
                }
            },
            onChange: () => {
                this.state.updateProfileSettingsData();
            },
        };
    }

    render() {
        const { errors, values } = this.state;
        // language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{{BackArrow onClick=this.props.onBackArrowClick}}}
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
                        {{{Button link="" text="Сохранить" onClick=onClick}}}
                    </div>
                </div>
            </main>
        `;
    }
}
export default withRouter(withStore(ProfileSettings))