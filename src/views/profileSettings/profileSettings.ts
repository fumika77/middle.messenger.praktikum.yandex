import Block from "../../utils/Block";
import {IError, Validation} from "../../common/modules/validation";
// import template from "./index.hbs";

export class ProfileSettings extends Block{
    protected getStateFromProps() {
        this.state = {
            values: {
                login:'',
                password:''
            },
            errors: {
                login: '',
                password: '',
            },
            onLogin: () => {
                const loginData = {
                    login: (this.refs.login?.firstElementChild as HTMLInputElement)?.value,
                    password: (this.refs.password?.firstElementChild as HTMLInputElement)?.value,
                };

                let validationResults: {[id: string]: IError} = Validation({...loginData});
                const nextState = {
                    errors: {
                        login: validationResults.login.status? '' : validationResults.login.errorText,
                        password: validationResults.password.status? '' : validationResults.password.errorText,
                    },
                    values: { ...loginData },
                };


                this.setState(nextState);
                console.log('action/login', loginData);
            }
        }
    }
    render() {
        const {errors, values} = this.state;
        //language=hbs
        return `
            <main>
                <div class="profile__box">
                    {{> backArrow/backArrow link="../profileDescription/profileDescription.hbs"}}
                    {{> avatar/avatar}}
                    <img class="profile__settings__editImg" src="../../../static/img/image-edit(40x40)@1x.png">
                    <h1 class="profile__settings__header && text">{{name}}</h1>
                    <div class="profile__settings__formData">
                        {{> input/input id="first_name" type="text" value={{first_name}} label="Имя"  style="profile"}}
                        {{> input/input id="second_name" type="text" value={{second_name}} label="Фамилия"  style="profile"}}
                        {{> input/input id="login" type="text" value={{login}} label="Логин"  style="profile"}}
                        {{> input/input id="email" type="text" value={{email}} label="Почта"  style="profile"}}
                        {{> input/input id="phone" type="number" value={{phone}} label="Телефон"  style="profile"}}
                        {{> button/button link="../profileDescription/profileDescription.hbs" text="Сохранить" }}
                    </div>
                </div>
            </main>
        `
    }
}