import Block from "../../utils/Block";
import {IError, Validation} from "../../utils/validation";

export class Dialogs extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                message:'message',
                searchValue:'',
                activeDialogSenderName:'Муся',
            },
            errors: {
                message:'где мой message'
            },
            onClick: () => {
                let dialogData = {
                    // message: (this.refs['message'].childNodes[3] as HTMLInputElement)?.value,
                };
                let validationResults: {[id: string]: IError} = Validation({...dialogData});
                const nextState = {
                    errors: {
                        message: validationResults.message.status? '' : validationResults.message.errorText,
                    },
                    values: { ...dialogData },
                };
                console.log("this.refs")
                console.log(this.refs)
                this.setState(nextState);

                // console.log(this.refs['message'])
                console.log("this.refs")
                console.log(this.refs)
            },
        }
    }

    render() {
        const {errors, values} = this.state;

        //language=hbs
        return `
            <main>
                <div class="dialogs__wrapper">
                    <div class="dialogs__header">
                        {{{ Avatar style="dialogs__item__img" 
                                   src="../../../static/img/animals.png"}}}
                        <div class="dialogs__header__person__name && text">"${this.state.values.activeDialogSenderName}"</div>
                    </div>
                    <div class="dialogs__sidebar">
                        <div class="dialogs__profile__box">
                            <div>
                                {{{Avatar style="dialogs__profile__box__img" 
                                          src="../../../static/img/animals.png"}}}
                                {{{ImageButton href=""
                                               src="../../../static/img/profile-edit(32x32)@1x.png"}}}
                            </div>
                            {{{Input classList="dialogs__search"
                                     ref="search"
                                     placeholder="Поиск"
                                     type="text"
                                     value="${this.state.values.searchValue}"}}}
                        </div>
                        <div class="dialogs__dialogs__box">
                            {{{DialogItem src="${this.state.values.senderImg}" 
                                          sender="${this.state.values.senderName}" 
                                          value="${this.state.values.messageText}"}}}
                            {{{DialogItem src="${this.state.values.senderImg}" 
                                          sender="${this.state.values.senderName}" 
                                          value="${this.state.values.messageText}"}}}
                            {{{DialogItem src="${this.state.values.senderImg}" 
                                          sender="${this.state.values.senderName}" 
                                          value="${this.state.values.messageText}"}}}
                        </div>
                    </div>
                <div class="dialogs__content">
                </div>
                <div class="dialogs__footer">
                    {{{Input ref="my_message" 
                             classList="dialogs__send__message"
                             placeholder="Написать сообщение" 
                             type="text" 
                             value="${this.state.values.message}"
                             error="${this.state.errors.message}"}}}
                    {{{ImageButton class="dialogs__send__button" 
                                   href="" 
                                   src="../../../static/img/send-button-3(40x40)@1x.png"
                                   onClick=onClick
                    }}}
                </div>
            </main>
        `
    }
}