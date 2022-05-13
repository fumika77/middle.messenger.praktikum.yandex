import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { IError, Validation } from '../../utils/validation';
import { createChat } from '../../services/ChatService';

type CreateChatPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class CreateChat extends Block {
    constructor(props: CreateChatPageProps) {
        super(props);
        this.setProps({
            onBackArrowClick: () => this.props.router.go('/dialogs'),
            chatName: () => this.props.store.getState().createChatFormData.values.chatName,
            chatNameError: () => this.props.store.getState().createChatFormData.errors.chatName,
            status: () => this.props.store.getState().createChatFormData.status,
            errorDescription: () => this.props.store.getState().createChatFormData.errorDescription,
        });
    }

    protected getStateFromProps() {
        this.state = {
            updateFormData: () => {
                const formData = {
                    chatName: (document.getElementById('chatName') as HTMLInputElement)?.value,
                };
                const validationResults: { [id: string]: IError } = Validation({ chat_name: formData.chatName });
                const nextState = {
                    errors: {
                        chatName: validationResults.chat_name.status ? '' : validationResults.chat_name.errorText,
                    },
                    values: {
                        chatName: formData.chatName,
                    },
                };
                this.props.store.dispatch({ createChatFormData: nextState });
            },
            onClick: () => {
                if (this.props.store.getState().createChatFormData.errors.chatName == '') {
                    this.props.store.dispatch(createChat, { title: this.props.chatName() });
                }
            },
            onChange: () => {
                this.state.updateFormData();
            },
        };
    }

    render() {
        // language=hbs
        return `
            <main> 
            <div class="create__chat__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                {{{InputLabel id="chatName"
                              type="text"
                              value=chatName
                              error=chatNameError
                              label="Название чата"
                              style="sign__up"
                              onChange=onChange}}}
                {{{Button text="Добавить" onClick=onClick}}}
                {{{ErrorText text=errorDescription}}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(CreateChat));
