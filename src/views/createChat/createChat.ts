import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
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
            errorDescription: () => this.props.store.getState().createChatFormData.errorDescription,
            status: () => this.props.store.getState().createChatFormData.status,
        });
    }

    protected getStateFromProps() {
        this.state = {
            onClick: () => {
                const errors = {
                    title: (document.getElementById('titleCreateChatPageErrorText') as HTMLInputElement)?.innerText,
                };
                const values = {
                    title: (document.getElementById('titleCreateChatPage') as HTMLInputElement)?.value,
                };
                if (Object.keys(errors).find((key) => errors[key] !== '') == null) {
                    this.props.store.dispatch(createChat, { title: values.title });
                }
            },
        };
    }

    render() {
        // language=hbs
        return `
            <main> 
            <div class="create__chat__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                {{{InputLabel id="titleCreateChatPage"
                              type="text"
                              label="Название чата"
                              style="sign__up"
                              validationType="chat_name"}}}
                {{{ErrorText text=errorDescription}}}
                {{#if status}}{{{ImageButton link="/dialogs" onClick=onBackArrowClick
                                             style="done" src="img/like-1(32x32)@1x.png"}}}
                {{else}}
                    {{{Button text="Добавить" onClick=onClick}}}
                {{/if}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(CreateChat));
