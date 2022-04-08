import Block from "../../utils/Block";
import {IError, Validation} from "../../utils/validation";

export class ProfileSettings extends Block{
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
            }
        }
    }
    render() {
        const {errors, values} = this.state;
        //language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{{BackArrow link="../profileDescription/profileDescription.hbs"}}}
                    {{{Avatar style="profileImg" src="../../../static/img/animals.png"}}}
                    <img class="profile__settings__editImg" src="../../../static/img/image-edit(40x40)@1x.png">
                    <h1 class="profile__settings__header && text">Настройки профиля</h1>
                    <div class="profile__settings__formData">
                        {{{InputLabel ref ="first_name" 
                                        id="first_name" 
                                        type="text" 
                                        value="${values.first_name}"
                                        error="${errors.first_name}"
                                        label="Имя"  
                                        style="profile"}}}
                        {{{InputLabel ref ="second_name" 
                                      id="second_name" 
                                      type="text" 
                                      value="${values.second_name}" 
                                      error="${errors.second_name}" 
                                      label="Фамилия" 
                                      style="profile"}}}
                        {{{InputLabel ref ="login" 
                                      id="login" 
                                      type="text" 
                                      value="${values.login}" 
                                      error="${errors.login}" 
                                      label="Логин"  
                                      style="profile"}}}
                        {{{InputLabel ref ="email" 
                                      id="email" 
                                      type="text" 
                                      value="${values.email}" 
                                      error="${errors.email}" 
                                      label="Почта"  
                                      style="profile"}}}
                        {{{InputLabel ref ="phone" 
                                      id="phone" 
                                      type="number" 
                                      value="${values.phone}" 
                                      error="${errors.phone}" 
                                      label="Телефон"  
                                      style="profile"}}}
                        {{{Button link="" text="Сохранить" onClick=onClick}}}
                    </div>
                </div>
            </main>
        `
    }
}