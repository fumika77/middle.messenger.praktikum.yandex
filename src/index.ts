import {Login} from "./views/login/login";
import {ProfileSettings} from "./views/profileSettings/profileSettings";
import {renderDom} from "./utils/renderDom";
import Button from './common/components/button/index';
import registerComponents from "./utils/registerComponents";
import {BackArrow} from "./common/components/backArrow/backArrow";
import InputLabel from "./common/components/inputLabel";
import Avatar from "./common/components/avatar";
import ProfileDescription from "./views/profileDescription";
import Error from "./views/error";
import SignUp from "./views/signUp";
import Dialogs from "./views/dialogs";
import Block from "./utils/Block";
import {ErrorText} from "./common/components/errorText/errorText";
import {ImageButton} from "./common/components/imageButton/imageButton";
import {DialogItem} from "./common/components/dialogItem/dialogItem";
import Input from "./common/components/input";

registerComponents(Button)
registerComponents(Input)
registerComponents(BackArrow)
registerComponents(InputLabel)
registerComponents(Avatar)
registerComponents(ErrorText)
registerComponents(ImageButton)
registerComponents(DialogItem)

export function addEventListner(page) {
    document.addEventListener('DOMContentLoaded', () => {
        let pageCollection:{[key:string]:typeof Block} = {};
            // pageCollection['login']=new Login();
            // pageCollection['profileSettings']=new ProfileSettings();
            // pageCollection['profileDescription']=new ProfileDescription();
            pageCollection['signUp']=new SignUp();
            pageCollection['dialogs']=new Dialogs();
            pageCollection['error']=new Error({
                errorNumber: 404,
                errorDescription: 'Упс, ошибочка вышла...'
            });

        if (pageCollection[page] != null) {
            renderDom('#app', pageCollection[page])
        }
    })
}

// addEventListner('signUp')
addEventListner('dialogs')