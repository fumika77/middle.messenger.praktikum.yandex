import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { getUserByLogin } from '../../services/ProfileService';
import { addChatUser } from '../../services/ChatService';

type AddUserChatPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class AddUserChat extends Block {
    constructor(props: AddUserChatPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.go('/dialogs'),
            chatName: () => this.props.store.getState().dialogsFormData.activeDialog.title,
            userLogin: () => this.props.store.getState().addUserFormData.userLogin,
            userId: () => this.props.store.getState().addUserFormData.user?.id,
            formError: () => this.props.store.getState().addUserFormData.error,
            onSearchButtonClick: () => this.props.store.dispatch(getUserByLogin),
            onAddButtonClick: () => this.props.store.dispatch(addChatUser),
        });
    }

    protected getStateFromProps() {
        this.state = {
            updateFormData: () => {
                const userLogin = (document.getElementById('userLogin') as HTMLInputElement)?.value;
                this.props.store.dispatch({
                    addUserFormData: {
                        ...this.props.store.getState().addUserFormData,
                        userLogin: userLogin,
                    },
                });
            },
            onClick: () => {
                this.state.updateFormData();
            },
            onChange: () => {
                this.state.updateFormData();
            },
        };
    }

    render() {
        const user = this.props.store.getState().addUserFormData.user;
        //console.log(this.props.store.getState().addUserFormData?.user)
        // language=hbs
        return `
            <main> 
            <div class="add__user__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                <div class="add__user__search__box">   
                    {{{InputLabel id="userLogin"
                                  type="text"
                                  value=userLogin
                                  error=chatNameError
                                  label="Логин пользователя"
                                  style="signUp"
                                  onChange=onChange}}}
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
