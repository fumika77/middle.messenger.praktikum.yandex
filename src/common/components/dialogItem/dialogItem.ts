import Block from '../../../core/Block';
import {withRouter, withStore} from "../../../utils";
import {AddUserChat} from "../../../views/addUserChat/createChat";
import {Store} from "../../../core/Store";
import {initChatWebSocket} from "../../../services/ChatService";

interface DialogItemProps {
    avatar: string;
    title: string;
    content: string;
    id: number;
    store: Store<AppState>;
}

export class DialogItem extends Block {
    constructor(props: DialogItemProps) {
        const link = props.avatar!==null ? `https://ya-praktikum.tech/api/v2/resources/${props.avatar}` : '';
        super({ ...props, link
            , events: { click: () => {
                    this.props.store.dispatch({ dialogsFormData: {...this.props.store.getState().dialogsFormData, history: []} });
                    this.props.store.dispatch({
                        dialogsFormData: {
                            ...this.props.store.getState().dialogsFormData,
                            activeDialog: {
                                id: this.props.id,
                                title: this.props.title,
                                avatar: this.props.link
                            }
                        }
                    })
                    this.props.store.dispatch(initChatWebSocket)
                }

        }
            });
    }

    static componentName = 'DialogItem';

    render() {
        // language=hbs
        return `
        <div class="dialogs__item">
            <img class="dialogs__item__img" src="{{link}}">
            <div class="dialogs__message">
                <div class="dialogs__person-name && text">{{title}}</div>
                <div class="dialogs__message__text && text">{{content}}</div>
            </div>
        </div>
        `;
    }
}

export default withStore(DialogItem)