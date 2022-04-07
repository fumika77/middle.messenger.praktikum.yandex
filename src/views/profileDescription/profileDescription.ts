import Block from "../../utils/Block";
import {IError, Validation} from "../../common/modules/validation";

export class ProfileDescription extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                login:'',
                first_name:'',
                second_name:'',
                email:'',
                phone:''
            },
            errors: {
                login:'',
                first_name:'',
                second_name:'',
                email:'',
                phone:''
            },
            onClick: () => {
                const profileSettingsData = {
                    login: (this.refs['login'].childNodes[3] as HTMLInputElement)?.value,
                    first_name: (this.refs['first_name'].childNodes[3] as HTMLInputElement)?.value,
                    second_name: (this.refs['second_name'].childNodes[3] as HTMLInputElement)?.value,
                    email: (this.refs['email'].childNodes[3] as HTMLInputElement)?.value,
                    phone: (this.refs['phone'].childNodes[3] as HTMLInputElement)?.value,
                };
                console.log('profileSettingsData')
                console.log(profileSettingsData)
                let validationResults: {[id: string]: IError} = Validation({...profileSettingsData});
                const nextState = {
                    errors: {
                        login: validationResults.login.status? '' : validationResults.login.errorText,
                        first_name: validationResults.first_name.status? '' : validationResults.first_name.errorText,
                        second_name: validationResults.second_name.status? '' : validationResults.second_name.errorText,
                        email: validationResults.email.status? '' : validationResults.email.errorText,
                        phone: validationResults.phone.status? '' : validationResults.phone.errorText,
                    },
                    values: { ...profileSettingsData },
                };


                this.setState(nextState);
                console.log('action/login', profileSettingsData);
            }
        }
    }
    render() {
        const {errors, values} = this.state;
        console.log(errors)
        //language=hbs
        return `
            <main>
            <div class="profile__box">
                {{{ BackArrow link=""}}}
                {{{ Avatar }}}
                <h1 class="profile__description__header && text">{{name}}</h1>
                <div class="profile__description__formData">
                    {{{InputLabel ref="first_name" 
                                  id="first_name" 
                                  type="text" 
                                  value="${values.first_name}"
                                  error="${errors.first_name}"
                                  label="Имя" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="second_name"
                                  type="text" 
                                  value="${values.second_name}"
                                  error="${errors.second_name}"
                                  label="Фамилия" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="login" 
                                  type="text" 
                                  value="${values.login}"
                                  error="${errors.login}"
                                  label="Логин"
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="email" 
                                  type="text" 
                                  value="${values.email}"
                                  error="${errors.email}"
                                  label="Почта" 
                                  disabled="disabled" 
                                  style="profile"}}}
                    {{{InputLabel id="phone" 
                                  type="number" 
                                  value="${values.phone}"
                                  error="${errors.phone}"
                                  label="Телефон" 
                                  disabled="disabled" 
                                  style="profile"}}}
                </div>
                <div class="profile__description__linkBox">
                    <a href="">Изменить данные</a>
                    <a href="">Изменить пароль</a>
                </div>
            </div>
            </main>
        `
    }
}