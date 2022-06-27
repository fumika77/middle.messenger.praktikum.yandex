import Block from 'core/Block';
import { withRouter, withStore } from 'utils';
import { BrowserRouter } from 'core/Route';
import { Store } from 'core/Store';
import { getUserByLogin } from 'services/ProfileService';
import { addChatUser } from 'services/ChatService';

type AddUserChatPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class AddUserChat extends Block {
    constructor(props: AddUserChatPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.go('/dialogs'),
            chatName: () => this.props.store.getState().activeDialogTitle,
            userLogin: () => this.props.store.getState().addUserFormData.userLogin,
            userId: () => this.props.store.getState().addUserFormData.user?.id,
            formError: () => this.props.store.getState().addUserFormData.error,
            onAddButtonClick: () => this.props.store.dispatch(addChatUser),
        });
    }

    protected getStateFromProps() {
        this.state = {
            onSearchButtonClick: () => {
                const errors = {
                    login: (document.getElementById('userLoginAddUserPageErrorText') as HTMLInputElement)?.innerText,
                };
                const values = {
                    login: (document.getElementById('userLoginAddUserPage') as HTMLInputElement)?.value,
                };
                if (Object.keys(errors).find((key) => errors[key] !== '') == null) {
                    this.props.store.dispatch(getUserByLogin, { login: values.login });
                }
            },
        };
    }

    render() {
        const { user } = this.props.store.getState().addUserFormData;
        // language=hbs
        return `
            <main> 
            <div class="add__user__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                <div class="add__user__search__box">   
                    {{{InputLabel id="userLoginAddUserPage"
                                  type="text"
                                  validationType="login"
                                  label="Логин пользователя"
                                  style="sign__up"
                    }}}
                    {{{ImageButton onClick=onSearchButtonClick
                                   src="img/google-search(24x24)@1x.png"}}}
                </div>
                {{#if userId}}<div class="text">${user?.first_name} ${user?.second_name}</div>{{/if}}
                {{{Button text="Добавить" onClick=onAddButtonClick}}}
                {{{ErrorText text=formError}}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(AddUserChat));
