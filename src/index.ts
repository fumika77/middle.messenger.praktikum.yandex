import { renderDOM } from './utils/renderDOM';
import Button from './common/components/button/index';
import registerComponents from './utils/registerComponents';
import { BackArrow } from './common/components/backArrow/backArrow';
import InputLabel from './common/components/inputLabel';
import Avatar from './common/components/avatar';
import { ErrorText } from './common/components/errorText/errorText';
import { ImageButton } from './common/components/imageButton/imageButton';
import { DialogItem } from './common/components/dialogItem';
import Input from './common/components/input';
import Link from './common/components/link';
import {BrowserRouter} from "./core/Route";
import {Store} from "./core/Store";
import {getScreenComponent} from "./utils";
import {defaultState} from "./store/state";
import Login from './views/login';
import Dialogs from "./views/dialogs";
import ProfileDescription from "./views/profileDescription";
import ProfileSettings from "./views/profileSettings";
import ProfileImage from "./views/profileImage";
import SignUp from "./views/signUp";
import ErrorPage from "./views/error";
import InputFile from "./common/components/inputFile";
import ProfilePassword from "./views/profilePassword";
import CreateChat from "./views/createChat/createChat";
import createChat from "./views/createChat/createChat";
import {ChatWebSocket} from "./core/ChatWebSocket";
import {MessageItem} from "./common/components/messageItem";

registerComponents(ErrorText);
registerComponents(Button);
registerComponents(Input);
registerComponents(BackArrow);
registerComponents(InputLabel);
registerComponents(Avatar);
registerComponents(ErrorText);
registerComponents(ImageButton);
registerComponents(DialogItem);
registerComponents(Link);
registerComponents(InputFile);
registerComponents(CreateChat);
registerComponents(MessageItem);


declare global {
    interface Window {
        store: Store<AppState>;
        router: BrowserRouter;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    const router = new BrowserRouter();
    const socket = new ChatWebSocket();

    window.router = router;
    window.store = store;

    /**
     * для переключения активного экрана
     */
    store.on('change', (prevState, nextState) => {
        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen);
            renderDOM(new Page());
        }
    });

    store.dispatch({socket: socket})

    /**
     * Инициализируем роутинг
     */
    router
        .use('/', Login, {})
        .use('', Login, {})
        .use('/login', Login, {})
        .use('/dialogs', Dialogs, {})
        .use('/profile', ProfileDescription, {})
        .use('/profile-settings', ProfileSettings, {})
        .use('/profile-image', ProfileImage, {})
        .use('/profile-password', ProfilePassword, {})
        .use('/create-chat', createChat, {})
        .use('/sign-up', SignUp, {})
        .use('/*', ErrorPage, {})
        .start();

    /**
     * Загружаем данные для приложения
     */
    setTimeout(() => {
        // store.dispatch(initApp);
    }, 100);
});