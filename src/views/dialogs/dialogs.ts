import Block from '../../core/Block';
import { IError, Validation } from '../../utils/validation';
import {withRouter, withStore} from "../../utils";
import {BrowserRouter} from "../../core/Route";
import {Store} from "../../core/Store";
import {getChats, initChatWebSocket} from "../../services/ChatService";
import {getProfileInfo, logout} from "../../services/AuthService";

type DialogsPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
    isLoading?: () => boolean;
};

export class Dialogs extends Block {
    constructor(props:DialogsPageProps) {
        super(props);
        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            isLoading: () => Boolean(this.props.store.getState().isLoading),
            onProfileButtonClick: () => this.props.router.go('/profile'),
            onCreateChatButtonClick: () => this.props.router.go('/create-chat'),
            onLogoutClick: () => {
                this.props.store.dispatch(logout)
            },
            dialogs: () => this.props.store.getState().dialogsFormData.dialogs,
            activeDialogAvatar: () => this.props.store.getState().dialogsFormData?.activeDialog?.avatar
        });
    }
    componentDidMount() {
        this.props.store.dispatch(getChats)
        this.props.store.dispatch(getProfileInfo)
        //this.props.store.dispatch(initChatWebSocket)
    }
    protected getStateFromProps() {
        this.state = {
            values: {
                message: '',
                searchValue: '',
                activeDialogSenderName: this.props.store.getState().dialogsFormData.activeDialog.title,

            },
            errors: {
                message: '',
            },
            updateDialogData: () => {
                const dialogData = {
                    message: (this.refs.message.childNodes[3] as HTMLInputElement)?.value,
                };
                const validationResults: { [id: string]: IError } = Validation({ ...dialogData });
                const nextState = {
                    errors: {
                        message: validationResults.message.status ? '' : validationResults.message.errorText,
                    },
                    values: { ...this.state.values, ...dialogData },
                };
                this.setState(nextState);
            },
            onClick: () => {
                this.state.updateDialogData();
                console.log('message:', this.state.values.message);
            },
            onChange: () => {
                this.state.updateDialogData();
            },
            onLogoutClick: () => {
                this.props.store.dispatch(logout)
            },
        };
    }

    render() {
        const { errors, values} = this.state;
        const activeDialog = this.props.store.getState().dialogsFormData;
        // language=hbs
        return `
            <main>
                <div class="dialogs__wrapper">
                    <div class="dialogs__header">
                        {{{Avatar style="dialogs__item__img"
                                   src=activeDialogAvatar}}}
                        <div class="dialogs__header__person__name && text">${activeDialog.activeDialogSenderName}</div>
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
                                              messageText=last_message}}}
                                {{/with}}
                            {{/each}}
                        </div>
                    </div>
                    <div class="dialogs__content">
                    </div>
                    <div class="dialogs__footer">
                        {{{InputLabel ref="message"
                                 id="message"
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
            </main>
        `;
    }
}

export default withRouter(withStore(Dialogs))