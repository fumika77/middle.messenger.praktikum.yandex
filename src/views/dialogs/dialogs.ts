import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { getChats, sendMessage } from '../../services/ChatService';
import { getProfileInfo, logout } from '../../services/AuthService';

type DialogsPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class Dialogs extends Block {
    constructor(props: DialogsPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onProfileButtonClick: () => this.props.router.go('/profile'),
            onCreateChatButtonClick: () => this.props.router.go('/create-chat'),
            onAddUserButtonClick: () => this.props.router.go('/add-user-chat'),
            onLogoutClick: () => {
                this.props.store.dispatch(logout);
            },
            dialogs: () => this.props.store.getState().dialogsFormData.dialogs,
            dialogHistory: () => this.props.store.getState().dialogsFormData.history,
            activeDialogAvatar: () => this.props.store.getState().dialogsFormData?.activeDialog?.avatar,
            activeDialogTitle: () => this.props.store.getState().dialogsFormData?.activeDialog?.title,
            message: () => this.props.store.getState().dialogsFormData?.message,
            messageError: () => this.props.store.getState().dialogsFormData?.messageError,
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
        if (this.props.store.getState().user.id === null) {
            this.props.router.go('/login');
            return;
        }
        this.props.store.dispatch(getChats);
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                message: this.props.store.getState().dialogsFormData?.message,
                searchValue: '',
            },
            errors: {
                message: this.props.store.getState().dialogsFormData?.messageError,
            },
            updateDialogData: (messageDefault?: string) => {
                const message = messageDefault || (document.getElementById('message') as HTMLInputElement)?.value;
                const validationResults: { [id: string]: IError } = Validation({ message });
                const nextDialogsFormData = {
                    ...this.props.store.getState().dialogsFormData,
                    message,
                    messageError: validationResults.message.status ? '' : validationResults.message.errorText,
                };
                this.props.store.dispatch({ dialogsFormData: nextDialogsFormData });
            },
            onClick: () => {
                this.state.updateDialogData();
                this.props.store.dispatch(sendMessage);
                this.state.updateDialogData(' ');
            },
        };
    }

    render() {
        const { errors, values } = this.state;
        const activeDialog = this.props.store.getState().dialogsFormData?.activeDialog;
        // language=hbs
        return `
            <main>
                <div class="dialogs__wrapper">
                    <div class="dialogs__header">
                        {{#if activeDialogAvatar}}{{{Avatar style="dialogs__item__img"
                                   src=activeDialogAvatar}}}{{/if}}
                        {{#if activeDialogTitle}}
                            <div class="dialogs__header__person__name && text">${activeDialog?.title}</div>
                        {{/if}}
                        {{#if activeDialogTitle}}
                            {{{ImageButton style="add__contact__button" src="img/user-add(40x40)@1x.png" onClick=onAddUserButtonClick}}}
                        {{/if}}
                        {{{ImageButton style="logout__button" src="img/logout(40x40)@1x.png" onClick=onLogoutClick}}}
                    </div>
                    <div class="dialogs__sidebar">
                        <div class="dialogs__profile__box">
                            <div>
                                {{{Avatar style="dialogs__profile__box__img"
                                          src="img/animals.png"}}}
                                {{{ImageButton link="/profile" onClick=onProfileButtonClick
                                               src="img/profile-edit(32x32)@1x.png"}}}
                            </div>
                            <div style="display: flex">
                                {{{Input style="dialogs__search"
                                         ref="search"
                                         placeholder="Поиск"
                                         type="text"
                                         value="${values.searchValue}"}}}
                                {{{ImageButton link="/create-chat" onClick=onCreateChatButtonClick
                                               src="img/round-chat-3(40x40)@1x.png"}}}
                            </div>
                        </div>
                        <div class="dialogs__dialogs__box">
                            {{#each dialogs}}
                                {{#with this}}
                                {{{DialogItem src=avatar
                                              senderName=title
                                              id=id
                                              lastMessage=last_message}}}
                                {{/with}}
                            {{/each}}
                        </div>
                    </div>
                    <div class="dialogs__content">
                        {{#each dialogHistory}}
                            {{#with this}}
                                {{{MessageItem timeString=timeString
                                            id=id
                                            message=content
                                            userId=userId
                                            userLogin=userLogin
                                            isOtherUser=isOtherUser
                                }}}
                            {{/with}}
                        {{/each}}
                    </div>
                    {{#if activeDialogTitle}}
                        <div class="dialogs__footer">
                            {{{InputLabel id="message"
                                     style="dialogs__input"
                                     placeholder="Написать сообщение"
                                     type="text"
                                     value="${values.message}"
                                     error="${errors.message}"
                                     onChange=onChange
                            }}}
                            {{{ImageButton class="dialogs__send__button"
                                           href=""
                                           src="img/send-button-3(40x40)@1x.png"
                                           onClick=onClick
                            }}}
                        </div>
                    {{/if}}
            </main>
        `;
    }
}

export default withRouter(withStore(Dialogs));
