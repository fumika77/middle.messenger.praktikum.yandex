import Block from "../../utils/Block";
import {IError, Validation} from "../../utils/validation";
import {redirect} from "../../utils/redirect";

export class ProfileDescription extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                login: "SuperArchi",
                first_name: "Арчибальд",
                second_name: "Котиков",
                email: "kotikoff@kotomail.ru",
                phone: "88005678286"
            },
            errors: {
                login:'',
                first_name:'',
                second_name:'',
                email:'',
                phone:''
            },
            onEditButtonClick: () => {
                redirect('profileSettings');
            },
            onBackArrowClick: () => {
                redirect('dialogs');
            }
        }
    }
    render() {
        const {values} = this.state;
        //language=hbs
        return `
            <main>
            <div class="profile__box">
                {{{ BackArrow onClick=onBackArrowClick}}}
                {{{ Avatar style="profileImg" src="img/animals.png"}}}
                <h1 class="profile__description__header && text">{{name}}</h1>
                <div class="profile__description__formData">
                    {{{InputLabel ref="first_name" 
                                  id="first_name" 
                                  type="text" 
                                  value="${values.first_name}"
                                  label="Имя" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="second_name"
                                  type="text" 
                                  value="${values.second_name}"
                                  label="Фамилия" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="login" 
                                  type="text" 
                                  value="${values.login}"
                                  label="Логин"
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="email" 
                                  type="text" 
                                  value="${values.email}"
                                  label="Почта" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="phone" 
                                  type="number" 
                                  value="${values.phone}"
                                  label="Телефон" 
                                  disabled="disabled" 
                                  style="profile"}}}
                </div>
                <div class="profile__description__linkBox">
                    {{{Link text="Изменить данные" onClick=onEditButtonClick}}}
                    {{{Link text="Изменить пароль" }}}
                </div>
            </div>
            </main>
        `
    }
}