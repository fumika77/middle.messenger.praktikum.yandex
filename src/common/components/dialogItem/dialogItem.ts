import Block from "../../../utils/Block";

interface DialogItemProps {
    src: string;
    senderName: string;
    messageText: string;
    onClick: (pageValues:any) => void;
}

export class DialogItem extends Block<any> {
    constructor({src, senderName, messageText, onClick}: DialogItemProps) {
        super({src,  senderName, messageText, events: {click: onClick}});
    }

    render(){
        //language=hbs
        return `
        <div class="dialogs__item">
            <img class="dialogs__item__img" src="{{src}}">
            <div class="dialogs__message">
                <div class="dialogs__person-name && text">"{{senderName}}"</div>
                <div class="dialogs__message__text && text">"{{messageText}}"</div>
            </div>
        </div>
        `
    }
}