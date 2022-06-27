import Block from 'core/Block';
import {withStore} from "utils";
import {Store} from "core/Store";

interface MessageItemProps {
    timeString: string,
    message: string,
    userId: number,
    userLogin: Nullable<string>,
    isOtherUser: boolean,
    store: Store<AppState>
}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        super({ ...props});
    }

    static componentName = 'MessageItem';

    protected componentDidMount() {
        if (!this.props.userLogin){
            return;
        }
    }

    render() {
        // language=hbs
        return `
        <div class="message__item{{#if isOtherUser}} message__item__other{{/if}}">
            <div>{{timeString}}</div>
            <div class="dialogs__person__name text">{{#if isOtherUser}}{{userLogin}}{{else}}Вы{{/if}}:</div>
            <div class="dialogs__message__text text">{{message}}</div>
        </div>
        `;
    }
}

export default withStore(MessageItem,'MessageItem')