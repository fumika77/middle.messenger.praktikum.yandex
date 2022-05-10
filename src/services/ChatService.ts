import { default as ChatApi } from '../api/Chats';
import { default as AuthApi } from '../api/Auth';
import {Dispatch} from "../core/Store";
import {hasError} from "../utils/apiHasError";
import {ChatCreateRequest, ChatListRequest, initWebSocketRequest, TokenRequest} from "../api/types";
import {initWebSocket} from "../api/Socket";
import {getProfileInfo} from "./AuthService";

type LoginPayload = {
    login: string;
    password: string;
};

type SignUpPayload = {
    login: string;
    first_name: string;
    second_name: string;
    password: string;
    password_repeat: string;
    email: string;
    phone: string;
};


export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: ChatCreateRequest,
) => {

    const response = await ChatApi.createChat(payload);

    if (hasError(response)) {
        dispatch({ createChatFormError: response.reason });
        return;
    }

    dispatch({ createChatFormError: null });

    window.router.go('/dialogs');
};

export const getChats = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload?: Partial<ChatListRequest>,
) => {
    const request = payload? payload : {} as Partial<ChatListRequest>;
    const chats = await ChatApi.getChats(request);

    if (hasError(chats)) {
        dispatch({ dialogsFormData: {dialogsError: chats.reason} });
        return;
    }
    dispatch({dialogsFormData: { dialogsError: null, dialogs: chats}});
};


export const initChatWebSocket = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: initWebSocketRequest,
) => {
    const chatId = state.dialogsFormData?.activeDialog.id;
    const request = {
        id: state.dialogsFormData?.activeDialog.id
    }
    const chats = await ChatApi.getToken(request);
    if (hasError(chats)) {
        dispatch({ dialogsFormData: {dialogsError: chats.reason} });
        return;
    }
    const token = chats.token;
   // console.log(state.user)
   // console.log( chatId)

   // console.log(chats.token)
    initWebSocket(state.user?.id, chatId, token)
};
