import Block from '../../../core/Block';
import {withStore} from "../../../utils";
import {Store} from "../../../core/Store";
import {getUserById} from "../../../services/ProfileService";

interface MessageItemProps {
    time: Date,
    message: string,
    userId: number,
    userLogin: string,
    isMy: boolean,
    store: Store<AppState>
}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        const isOtherUser = !props.isMy;
        const timeString = props.time.toLocaleString("ru-RU");
        super({ ...props
            ,timeString: timeString
            ,isOtherUser: isOtherUser
            });
    }

    static componentName = 'MessageItem';

    protected componentDidMount() {
        if (this.props.isOtherUser){
            this.props.store.dispatch(getUserById, {id: this.props.user_id})
        }
    }

    render() {
        // language=hbs
        return `
        <div class="message__item">
            <div class="dialogs__person-name && text">{{#if isOtherUser}}{{senderName}}{{else}}Вы{{/if}}:{{time}}</div>
            <div class="dialogs__message__text && text">{{message}}</div>
        </div>
        `;
    }
}

export default withStore(MessageItem)