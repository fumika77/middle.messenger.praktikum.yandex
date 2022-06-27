import Block from 'core/Block';
import { withRouter, withStore } from 'utils';
import { BrowserRouter } from 'core/Route';
import { Store } from 'core/Store';
import { updateProfileInfo } from 'services/ProfileService';
import { getProfileInfo } from 'services/AuthService';

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
            formError: () => this.props.store.getState().profileSettingsFormError,
            avatar: () => this.props.store.getState().user?.avatar,
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
    }

    protected getStateFromProps() {
        this.state = {
            onClick: () => {
                const errors = {
                    login: (document.getElementById('loginProfileSettingsErrorText') as HTMLInputElement)?.innerText,
                    first_name: (document.getElementById('firstNameProfileSettingsErrorText') as HTMLInputElement)
                        ?.innerText,
                    second_name: (document.getElementById('secondNameProfileSettingsErrorText') as HTMLInputElement)
                        ?.innerText,
                    display_name: (document.getElementById('displayNameProfileSettingsErrorText') as HTMLInputElement)
                        ?.innerText,
                    email: (document.getElementById('emailProfileSettingsErrorText') as HTMLInputElement)?.innerText,
                    phone: (document.getElementById('phoneProfileSettingsErrorText') as HTMLInputElement)?.innerText,
                };
                const values = {
                    login: (document.getElementById('loginProfileSettings') as HTMLInputElement)?.value,
                    first_name: (document.getElementById('firstNameProfileSettings') as HTMLInputElement)?.value,
                    second_name: (document.getElementById('secondNameProfileSettings') as HTMLInputElement)?.value,
                    display_name: (document.getElementById('displayNameProfileSettings') as HTMLInputElement)?.value,
                    email: (document.getElementById('emailProfileSettings') as HTMLInputElement)?.value,
                    phone: (document.getElementById('phoneProfileSettings') as HTMLInputElement)?.value,
                };
                if (Object.keys(errors).find((key) => errors[key] !== '') == null) {
                    this.props.store.dispatch({ user: { ...this.props.store.getState().user.avatar, ...values } });
                    const request = { ...this.props.store.getState().user };
                    delete request.avatar;
                    this.props.store.dispatch(updateProfileInfo, request);
                }
            },
        };
    }

    render() {
        const { user } = this.props.store.getState();
        // language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{{BackArrow link="/profile" onClick=onBackArrowClick}}}
                    {{#if avatar}}{{{Avatar style="profileImg" src="${user.avatar}"}}}{{/if}}
                    {{{ImageButton style="profile__settings__editImg" src="img/image-edit(40x40)@1x.png" onClick=onEditImageClick}}}
                    <h1 class="profile__settings__header text">Настройки профиля</h1>
                    <div class="profile__settings__formData">
                        {{{InputLabel id="firstNameProfileSettings"
                                      type="text"
                                      value="${user.first_name}"
                                      validationType="first_name"
                                      label="Имя"
                                      style="profile"}}}
                        {{{InputLabel id="secondNameProfileSettings"
                                      type="text"
                                      value="${user.second_name}"
                                      value=second_name
                                      validationType="second_name"
                                      label="Фамилия"
                                      style="profile"}}}
                        {{{InputLabel id="loginProfileSettings"
                                      type="text"
                                      value="${user.login}"
                                      value=login
                                      validationType="login"
                                      label="Логин"
                                      style="profile"}}}
                        {{{InputLabel id="displayNameProfileSettings"
                                      type="text"
                                      value="${user.display_name}"
                                      validationType="display_name"
                                      label="Ник"
                                      style="profile"}}}
                        {{{InputLabel id="emailProfileSettings"
                                      type="text"
                                      value="${user.email}"
                                      validationType="email"
                                      label="Почта"
                                      style="profile"}}}
                        {{{InputLabel id="phoneProfileSettings"
                                      type="number"
                                      value="${user.phone}"
                                      validationType="phone"
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
