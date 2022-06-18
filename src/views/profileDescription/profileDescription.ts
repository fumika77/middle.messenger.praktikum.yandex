import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { getProfileInfo } from '../../services/AuthService';

type ProfileDescriptionPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class ProfileDescription extends Block {
    constructor(props: ProfileDescriptionPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onEditButtonClick: () => {
                this.props.router.go('/profile-settings');
            },
            onBackArrowClick: () => this.props.router.go('/dialogs'),
            onEditPasswordClick: () => this.props.router.go('/profile-password'),
            avatar: () => this.props.store.getState().user?.avatar,
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
    }

    render() {
        const userData: User = { ...this.props.store.getState().user };
        // language=hbs
        return `
            <main>
            <div class="profile__box">
                {{{ BackArrow link="/dialogs" onClick=onBackArrowClick}}}
                {{#if avatar}}{{{ Avatar style="profileImg" src="${userData.avatar}"}}}
                {{else}}{{{ Avatar style="profileImg"}}}
                {{/if}}
                <h1 class="profile__description__header text">${userData.first_name}</h1>
                <div class="profile__description__formData">
                    {{{InputLabel id="first_name" 
                                  type="text" 
                                  value="${userData.first_name}"
                                  label="Имя" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="second_name"
                                  type="text" 
                                  value="${userData.second_name}"
                                  label="Фамилия" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="display_name"
                                  type="text" 
                                  value="${userData.display_name}"
                                  label="Ник" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="login" 
                                  type="text" 
                                  value="${userData.login}"
                                  label="Логин"
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="email" 
                                  type="text" 
                                  value="${userData.email}"
                                  label="Почта" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="phone" 
                                  type="number" 
                                  value="${userData.phone}"
                                  label="Телефон" 
                                  disabled="disabled" 
                                  style="profile"}}}
                </div>
                <div class="profile__description__linkBox">
                     {{{Link text="Изменить данные" link="/profile-settings" onClick=onEditButtonClick}}}
                    {{{Link text="Изменить пароль" link="/profile-password" onClick=onEditPasswordClick}}}
                </div>
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(ProfileDescription));
