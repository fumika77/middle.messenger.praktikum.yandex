import Block from "../../utils/Block";
import {IError, Validation} from "../../utils/validation";
import {redirect} from "../../utils/redirect";

export class Dialogs extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                message:'',
                searchValue:'',
                activeDialogSenderName:'Муся',
                dialogs: [
                    {
                        senderImg:"img/animals-2.png",
                        senderName:"Барсик",
                        messageText:"Вы: мои кожаные ушли, приходи, на шторах повисим"
                    },
                    {
                        senderImg:"img/negative-space-kitten-series-brown-portrait-2048x1474.jpg",
                        senderName:"Муся",
                        messageText:":3"
                    },
                    {
                        senderImg:"img/negative-space-small-purple-flowers-2048x1367.jpg",
                        senderName:"Садовод",
                        messageText:":3"
                    }
                ]
            },
            errors: {
                message:''
            },
            updateDialogData: () => {
                const dialogData = {
                    message: (this.refs.message.childNodes[3] as HTMLInputElement)?.value,
                };
                const validationResults: {[id: string]: IError} = Validation({...dialogData});
                const nextState = {
                    errors: {
                        message: validationResults.message.status? '' : validationResults.message.errorText,
                    },
                    values: { ...this.state.values, ...dialogData },
                };
                this.setState(nextState);
            },
            onClick: () => {
                this.state.updateDialogData();
                console.log('message:', this.state.values.message)
            },
            onChange: () => {
                this.state.updateDialogData();
            },
            profileButtonClick: () => {
                redirect('profileDescription');
            }
        }
    }

    render() {
        const {errors, values} = this.state;

        // language=hbs
        return `
            <main>
                <div class="dialogs__wrapper">
                    <div class="dialogs__header">
                        {{{ Avatar style="dialogs__item__img"
                                   src="img/negative-space-kitten-series-brown-portrait-2048x1474.jpg"}}}
                        <div class="dialogs__header__person__name && text">${values.activeDialogSenderName}</div>
                    </div>
                    <div class="dialogs__sidebar">
                        <div class="dialogs__profile__box">
                            <div>
                                {{{Avatar style="dialogs__profile__box__img"
                                          src="img/animals.png"}}}
                                {{{ImageButton onClick=profileButtonClick
                                               src="img/profile-edit(32x32)@1x.png"}}}
                            </div>
                            {{{Input style="dialogs__search"
                                     ref="search"
                                     placeholder="Поиск"
                                     type="text"
                                     value="${values.searchValue}"}}}
                        </div>
                        <div class="dialogs__dialogs__box">
                            {{{DialogItem src="${values.dialogs?.[0]?.senderImg}"
                                          senderName="${values.dialogs?.[0]?.senderName}"
                                          messageText="${values.dialogs?.[0]?.messageText}"}}}
                            {{{DialogItem src="${values.dialogs?.[1]?.senderImg}"
                                          senderName="${values.dialogs?.[1]?.senderName}"
                                          messageText="${values.dialogs?.[1]?.messageText}"}}}
                            {{{DialogItem src="${values.dialogs?.[2]?.senderImg}"
                                          senderName="${values.dialogs?.[2]?.senderName}"
                                          messageText="${values.dialogs?.[2]?.messageText}"}}}
                            
                        </div>
                    </div>
                    <div class="dialogs__content">
                    </div>
                    <div class="dialogs__footer">
                        {{{InputLabel ref="message"
                                 id="message"
                                 style="dialogs__input"
                                 placeholder="Написать сообщение"
                                 type="text"
                                 value="${values.message}"
                                 error="${errors.message}"
                                 onChange=onChange
                        }}}
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