import Block from '../../../core/Block';
import {withStore} from "../../../utils";
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
        const link = (props.avatar!==undefined && props.avatar!==null) ? `${process.env.API_ENDPOINT}/resources/${props.avatar}` : 'img/user(144x144)@1x.png';
        super({ ...props, link
            , events: { click: () => {
                    this.props.store.dispatch({
                            history: [],
                            activeDialog: {
                                id: this.props.id,
                                title: this.props.title,
                                avatar: props.avatar
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
                <div class="dialogs__person-name text">{{title}}</div>
                <div class="dialogs__message__text text">{{content}}</div>
            </div>
        </div>
        `;
    }
}

export default withStore(DialogItem, 'DialogItem')