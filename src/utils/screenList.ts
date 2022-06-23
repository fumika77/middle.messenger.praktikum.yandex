import Login from '../views/login';
import ProfileDescription from '../views/profileDescription';
import Dialogs from '../views/dialogs';
import Block from '../core/Block';
import SignUp from '../views/signUp';
import ProfileSettings from '../views/profileSettings';

export enum Screens {
    Login = 'login',
    ProfileDescription = 'profile',
    Dialogs = 'dialogs',
    SignUp = 'sign-up',
    ProfileSettings = 'profile-settings',
}

const map: Record<Screens, typeof Block> = {
    [Screens.Login]: Login,
    [Screens.ProfileDescription]: ProfileDescription,
    [Screens.Dialogs]: Dialogs,
    [Screens.SignUp]: SignUp,
    [Screens.ProfileSettings]: ProfileSettings,
};

export const getScreenComponent = (screen: Screens): typeof Block => {
    return map[screen];
};
