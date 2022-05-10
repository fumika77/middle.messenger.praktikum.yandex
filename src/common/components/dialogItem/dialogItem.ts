import Block from '../../../core/Block';
import {withRouter, withStore} from "../../../utils";
import {CreateChat} from "../../../views/createChat/createChat";
import {Store} from "../../../core/Store";

interface DialogItemProps {
    src: string;
    senderName: string;
    messageText: string;
    id: number;
    store: Store<AppState>;
}

export class DialogItem extends Block {
    constructor(props: DialogItemProps) {
        super({ ...props
            , events: { click: () => this.props.store.dispatch({
                    dialogsFormData: {
                        ...this.props.store.getState().dialogsFormData,
                        activeDialog: {
                            id: this.props.id,
                            title: this.props.senderName,
                            avatar: this.props.src
                        }
                    }
                })}
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
                <div class="dialogs__message__text && text">{{messageText}}</div>
            </div>
        </div>
        `;
    }
}

export default withStore(DialogItem)