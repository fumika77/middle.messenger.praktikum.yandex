import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { updateProfilePassword } from '../../services/ProfileService';
import { UserPassword } from '../../api/types';

type ProfilePasswordPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class ProfilePassword extends Block {
    constructor(props: ProfilePasswordPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.go('/profile'),
            errorDescription: () => this.props.store.getState().passwordFormData.errorDescription,
        });
    }

    protected getStateFromProps() {
        this.state = {
            onClick: () => {
                const errors = {
                    old_password: (document.getElementById('oldPasswordPageErrorText') as HTMLInputElement)?.innerText,
                    password: (document.getElementById('passwordPageErrorText') as HTMLInputElement)?.innerText,
                    password_repeat: (document.getElementById('repeatPasswordPageErrorText') as HTMLInputElement)
                        ?.innerText,
                };
                const values = {
                    old_password: (document.getElementById('oldPasswordPage') as HTMLInputElement)?.value,
                    password: (document.getElementById('passwordPage') as HTMLInputElement)?.value,
                    password_repeat: (document.getElementById('repeatPasswordPage') as HTMLInputElement)?.value,
                };
                if (Object.keys(errors).find((key) => errors[key] !== '') == null) {
                    // this.props.store.dispatch(updateProfilePassword, {
                    //     oldPassword: values.old_password,
                    //     newPassword: values.password,
                    // } as UserPassword);
                }
            },
        };
    }

    render() {
        // language=hbs
        return `
            <main> 
            <div class="profile__password__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                {{{InputLabel id="oldPasswordPage"
                              type="password"
                              label="Cтарый пароль"
                              style="sign__up"}}}
                {{{InputLabel id="passwordPage"
                              type="password"
                              validationType="password"
                              label="Новый пароль"
                              style="sign__up"}}}
                {{{InputLabel id="repeatPasswordPage"
                              type="password"
                              validationType="password_repeat"
                              label="Повторите пароль"
                              style="sign__up"}}}
                {{{ErrorText text=errorDescription}}}
            {{#if status}}{{{ImageButton link="/profile" onClick=onBackArrowClick
                                         style="done" src="img/like-1(32x32)@1x.png"}}}
            {{else}}
                {{{Button text="Сохранить" onClick=onClick}}}
            {{/if}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(ProfilePassword));
