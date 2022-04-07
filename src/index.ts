import {Login} from "./views/login/login";
import {ProfileSettings} from "./views/profileSettings/profileSettings";
import {renderDom} from "./utils/renderDom";
import Button from './common/components/button/index';
import registerComponents from "./utils/registerComponents";
import Input from "./common/components/input";
import {BackArrow} from "./common/components/backArrow/backArrow";
import InputLabel from "./common/components/inputLabel";
import Avatar from "./common/components/avatar";
import ProfileDescription from "./views/profileDescription";
import Error from "./views/error";
import SignUp from "./views/signUp";

registerComponents(Button)
registerComponents(Input)
registerComponents(BackArrow)
registerComponents(InputLabel)
registerComponents(Avatar)
document.addEventListener('DOMContentLoaded', () => {
    const login = new Login();
    // const profileSettings = new ProfileSettings();
    // const profileDescription = new ProfileDescription();
    // const signUp = new SignUp();
    // const error = new Error({
    //     errorNumber: 404,
    //     errorDescription: 'Упс, ошибочка вышла...'
    // });
    renderDom('#app', login)
})

