import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { updateProfileInfo } from '../../services/ProfileService';

type ProfileSettingsPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    isLoading?: () => boolean;
};

export class ProfileSettings extends Block {
    constructor(props: ProfileSettingsPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.go('/profile'),
            onEditImageClick: () => this.props.router.go('/profile-image'),
            login: () => this.props.store.getState().user?.login,
            first_name: () => this.props.store.getState().user?.first_name,
            second_name: () => this.props.store.getState().user?.second_name,
            display_name: () => this.props.store.getState().user?.display_name,
            email: () => this.props.store.getState().user?.email,
            phone: () => this.props.store.getState().user?.phone,
            formError: () => this.props.store.getState().profileSettingsFormError,
        });
    }

    componentDidMount() {
        console.log(this.props.store.getState());
    }

    protected getStateFromProps() {
        this.state = {
            errors: {
                login: this.props.store.getState().userErrors?.login,
                first_name: this.props.store.getState().userErrors?.first_name,
                second_name: this.props.store.getState().userErrors?.second_name,
                display_name: this.props.store.getState().userErrors?.display_name,
                email: this.props.store.getState().userErrors?.email,
                phone: this.props.store.getState().userErrors?.phone,
            },
            updateProfileSettingsData: () => {
                const profileSettingsData = {
                    login: (document.getElementById('login') as HTMLInputElement)?.value,
                    first_name: (document.getElementById('first_name') as HTMLInputElement)?.value,
                    second_name: (document.getElementById('second_name') as HTMLInputElement)?.value,
                    display_name: (document.getElementById('display_name') as HTMLInputElement)?.value,
                    email: (document.getElementById('email') as HTMLInputElement)?.value,
                    phone: (document.getElementById('phone') as HTMLInputElement)?.value,
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
                    values: { ...profileSettingsData },
                };

                this.props.store.dispatch({
                    user: {
                        ...nextState.values,
                    },
                    userErrors: {
                        ...nextState.errors,
                    },
                });
            },
            onClick: () => {
                this.state.updateProfileSettingsData();
                if (Object.keys(this.state.errors).find((key) => this.state.errors[key] !== '') == null) {
                    this.props.store.dispatch(updateProfileInfo, this.props.store.getState().user);
                }
            },
            onChange: () => {
                this.state.updateProfileSettingsData();
            },
        };
    }

    render() {
        const { errors } = this.state;
        // language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{{BackArrow link="/profile" onClick=onBackArrowClick}}}
                    {{{Avatar style="profileImg" src="img/animals.png"}}}
                    {{{ImageButton style="profile__settings__editImg" src="img/image-edit(40x40)@1x.png" onClick=onEditImageClick}}}
                    <h1 class="profile__settings__header && text">Настройки профиля</h1>
                    <div class="profile__settings__formData">
                        {{{InputLabel id="first_name" 
                                      type="text" 
                                      value=first_name
                                      error="${errors.first_name}"
                                      onChange=onChange
                                      label="Имя"  
                                      style="profile"}}}
                        {{{InputLabel id="second_name" 
                                      type="text" 
                                      value=second_name
                                      error="${errors.second_name}"
                                      onChange=onChange
                                      label="Фамилия" 
                                      style="profile"}}}
                        {{{InputLabel id="login" 
                                      type="text" 
                                      value=login
                                      error="${errors.login}"
                                      onChange=onChange
                                      label="Логин"  
                                      style="profile"}}}
                        {{{InputLabel id="display_name" 
                                      type="text" 
                                      value=display_name
                                      error="${errors.display_name}"
                                      onChange=onChange
                                      label="Ник"  
                                      style="profile"}}}
                        {{{InputLabel id="email" 
                                      type="text" 
                                      value=email
                                      error="${errors.email}"
                                      onChange=onChange
                                      label="Почта"  
                                      style="profile"}}}
                        {{{InputLabel id="phone" 
                                      type="number" 
                                      value=phone
                                      error="${errors.phone}"
                                      onChange=onChange
                                      label="Телефон"  
                                      style="profile"}}}
                        {{{Button text="Сохранить" onClick=onClick}}}
                        {{{ErrorText errorText=formError}}}
                    </div>
                </div>
            </main>
        `;
    }
}
export default withRouter(withStore(ProfileSettings));
