import Block from '../../core/Block';
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
            dialogs: () => this.props.store.getState().dialogs,
            dialogHistory: () => this.props.store.getState().history,
            activeDialogTitle: () => this.props.store.getState().activeDialog?.title,
            activeDialogAvatar: () => this.props.store.getState().activeDialog?.avatar,
            avatar: () => this.props.store.getState().user?.avatar,
        });
    }

    componentDidMount() {
        this.props.store.dispatch(getProfileInfo);
        setTimeout(() => {
            if (this.props.store.getState().user?.id === null) {
                this.props.router.go('/login');
            }
        }, 100);
        this.props.store.dispatch(getChats);
    }

    protected getStateFromProps() {
        this.state = {
            onClick: () => {
                const messageError = (document.getElementById('messageDialogPageErrorText') as HTMLInputElement)
                    ?.innerText;
                const message = (document.getElementById('messageDialogPage') as HTMLInputElement)?.value;
                if (messageError == '') {
                    this.props.store.dispatch(sendMessage, { message });
                }
            },
        };
    }

    render() {
        const { values } = this.state;
        const avatar = this.props.store.getState().user?.avatar;
        const { activeDialog } = this.props.store.getState();
        // language=hbs
        return `
            <main>
                <div class="dialogs__wrapper">
                    <div class="dialogs__header">
                        {{#if activeDialogAvatar}}
                            {{{Avatar style="dialogs__item__img"
                                   src="${activeDialog?.avatar}"}}}
                        {{/if}} 
                        {{#if activeDialogTitle}}
                            <div class="dialogs__header__person__name text">${activeDialog?.title}</div>
                            {{{ImageButton style="add__contact__button" src="img/user-add(40x40)@1x.png" onClick=onAddUserButtonClick}}}
                        {{/if}}
                        {{{ImageButton style="logout__button" src="img/logout(40x40)@1x.png" onClick=onLogoutClick}}}
                    </div>
                    <div class="dialogs__sidebar">
                        <div class="dialogs__profile__box">
                            <div>
                            {{#if avatar}}
                                {{{Avatar style="dialogs__profile__box__img"
                                          src="${avatar}"}}}
                            {{else}} {{{Avatar style="dialogs__profile__box__img"}}}
                            {{/if}}
                                {{{ImageButton link="/profile" onClick=onProfileButtonClick
                                               src="img/profile-edit(32x32)@1x.png"}}}
                            
                            </div>
                            <div style="display: flex">
                                {{{InputLabel id="searchValue"
                                         style="dialogs__search"
                                         placeholder="Поиск"
                                         type="text"}}}
                                {{{ImageButton link="/create-chat" onClick=onCreateChatButtonClick
                                               src="img/round-chat-3(40x40)@1x.png"}}}
                            </div>
                        </div>
                        <div class="dialogs__dialogs__box">
                            {{#each dialogs}}
                                {{#with this}}
                                {{{DialogItem avatar=avatar
                                              title=title
                                              id=id
                                              content=content}}}
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
                            {{{InputLabel id="messageDialogPage"
                                     style="dialogs__input"
                                     placeholder="Написать сообщение"
                                     type="text"
                                     validatonType="message"
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
