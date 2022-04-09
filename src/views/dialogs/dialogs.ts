import Block from "../../utils/Block";
import {IError, Validation} from "../../utils/validation";

export class Dialogs extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                message:'message',
                searchValue:'',
                activeDialogSenderName:'Муся',
                // dialogs: [
                //     {
                //         senderImg:,
                //         senderName:,
                //         messageText:
                //     }
                // ]
            },
            errors: {
                message:'где мой message'
            },
            onClick: () => {
                let dialogData = {
                    message: (this.refs['message'].childNodes[3] as HTMLInputElement)?.value,
                };
                let validationResults: {[id: string]: IError} = Validation({...dialogData});
                const nextState = {
                    errors: {
                        message: validationResults.message.status? '' : validationResults.message.errorText,
                    },
                    values: { ...dialogData },
                };
                this.setState(nextState);
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
                                   src="img/animals.png"}}}
                        <div class="dialogs__header__person__name && text">"${values.activeDialogSenderName}"</div>
                    </div>
                    <div class="dialogs__sidebar">
                        <div class="dialogs__profile__box">
                            <div>
                                {{{Avatar style="dialogs__profile__box__img"
                                          src="img/animals.png"}}}
                                {{{ImageButton href=""
                                               src="img/profile-edit(32x32)@1x.png"}}}
                            </div>
                            {{{Input style="dialogs__search"
                                     ref="search"
                                     placeholder="Поиск"
                                     type="text"
                                     value="${values.searchValue}"}}}
                        </div>
                        <div class="dialogs__dialogs__box">
                            {{{DialogItem src="${values.senderImg}"
                                          sender="${values.senderName}"
                                          value="${values.messageText}"}}}
                            {{{DialogItem src="${values.senderImg}"
                                          sender="${values.senderName}"
                                          value="${values.messageText}"}}}
                            {{{DialogItem src="${values.senderImg}"
                                          sender="${values.senderName}"
                                          value="${values.messageText}"}}}
                        </div>
                    </div>
                    <div class="dialogs__content">
                    </div>
                    <div class="dialogs__footer">
                        {{{Input ref="my_message"
                                 style="dialogs__send__message"
                                 placeholder="Написать сообщение"
                                 type="text"
                                 value="${values.message}"
                                 error="${errors.message}"}}}
                        {{{ImageButton class="dialogs__send__button"
                                       href=""
                                       src="img/send-button-3(40x40)@1x.png"
                                       onClick=onClick
                        }}}
                    </div>
            </main>
        `
    }
}