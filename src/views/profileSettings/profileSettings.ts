import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { updateProfileInfo } from '../../services/ProfileService';
import { getProfileInfo } from '../../services/AuthService';

type ProfileSettingsPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
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
        this.props.store.dispatch(getProfileInfo);
    }

    onHide() {
        super.onHide();
        this.props.store.dispatch({
            userErrors: {
                login: '',
                first_name: '',
                second_name: '',
                display_name: '',
                email: '',
                phone: '',
            },
        });
    }

    protected getStateFromProps() {
        this.state = {
            updateProfileSettingsData: () => {
                const profileSettingsData = {
                    login: (document.getElementById('loginProfileSetting') as HTMLInputElement)?.value,
                    first_name: (document.getElementById('firstNameProfileSetting') as HTMLInputElement)?.value,
                    second_name: (document.getElementById('secondNameProfileSetting') as HTMLInputElement)?.value,
                    display_name: (document.getElementById('displayNameProfileSetting') as HTMLInputElement)?.value,
                    email: (document.getElementById('emailProfileSetting') as HTMLInputElement)?.value,
                    phone: (document.getElementById('phoneProfileSetting') as HTMLInputElement)?.value,
                };
                const avatar = this.props.store.getState().user?.avatar;
                const validationResults: { [id: string]: IError } = Validation({ ...profileSettingsData });
                this.props.store.dispatch({
                    user: {
                        ...profileSettingsData,
                        avatar,
                    },
                    userErrors: {
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
                });
            },
            onClick: () => {
                const errors = this.props.store.getState().userErrors;
                if (Object.keys(errors).find((key) => errors[key] !== '') == null) {
                    const request = { ...this.props.store.getState().user };
                    delete request.avatar;
                    this.props.store.dispatch(updateProfileInfo, request);
                }
            },
            onChange: () => {
                this.state.updateProfileSettingsData();
            },
        };
    }

    render() {
        const errors = { ...this.props.store.getState().userErrors };
        const { avatar } = this.props.store.getState().user;
        // language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{{BackArrow link="/profile" onClick=onBackArrowClick}}}
                    {{{Avatar style="profileImg" src="${avatar}"}}}
                    {{{ImageButton style="profile__settings__editImg" src="img/image-edit(40x40)@1x.png" onClick=onEditImageClick}}}
                    <h1 class="profile__settings__header text">Настройки профиля</h1>
                    <div class="profile__settings__formData">
                        {{{InputLabel id="firstNameProfileSetting"
                                      type="text"
                                      value=first_name
                                      error="${errors.first_name}"
                                      onChange=onChange
                                      label="Имя"
                                      style="profile"}}}
                        {{{InputLabel id="secondNameProfileSetting"
                                      type="text"
                                      value=second_name
                                      error="${errors.second_name}"
                                      onChange=onChange
                                      label="Фамилия"
                                      style="profile"}}}
                        {{{InputLabel id="loginProfileSetting"
                                      type="text"
                                      value=login
                                      error="${errors.login}"
                                      onChange=onChange
                                      label="Логин"
                                      style="profile"}}}
                        {{{InputLabel id="displayNameProfileSetting"
                                      type="text"
                                      value=display_name
                                      error="${errors.display_name}"
                                      onChange=onChange
                                      label="Ник"
                                      style="profile"}}}
                        {{{InputLabel id="emailProfileSetting"
                                      type="text"
                                      value=email
                                      error="${errors.email}"
                                      onChange=onChange
                                      label="Почта"
                                      style="profile"}}}
                        {{{InputLabel id="phoneProfileSetting"
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
