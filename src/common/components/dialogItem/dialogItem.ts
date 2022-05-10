import Block from '../../../core/Block';
import {withRouter, withStore} from "../../../utils";
import {CreateChat} from "../../../views/createChat/createChat";
import {Store} from "../../../core/Store";
import {initChatWebSocket} from "../../../services/ChatService";

interface DialogItemProps {
    src: string;
    senderName: string;
    lastMessage: {
        user: User,
        time: string,
        content: string,
        id:number,
    };
    id: number;
    store: Store<AppState>;
}

export class DialogItem extends Block {
    constructor(props: DialogItemProps) {
        super({ ...props,
            lastMessage : props.lastMessage?.content
            , events: { click: () => {
                    this.props.store.dispatch({
                        dialogsFormData: {
                            ...this.props.store.getState().dialogsFormData,
                            activeDialog: {
                                id: this.props.id,
                                title: this.props.senderName,
                                avatar: this.props.src
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
            <img class="dialogs__item__img" src="{{src}}">
            <div class="dialogs__message">
                <div class="dialogs__person-name && text">{{senderName}}</div>
                <div class="dialogs__message__text && text">{{lastMessage}}</div>
            </div>
        </div>
        `;
    }
}

export default withStore(DialogItem)