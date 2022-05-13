import {default as ChatApi } from '../api/Chats';
import {default as UserAPI} from '../api/User';
import {Dispatch} from "../core/Store";
import {hasError} from "../utils/apiHasError";
import {
    ChatCreateRequest,
    ChatListRequest,
    MessageDTO, MessageRequest,
} from "../api/types";
import {transformDialog, transformMessage} from "../utils/apiTransformers";

export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: ChatCreateRequest,
) => {

    const response = await ChatApi.createChat(payload);

    if (hasError(response)) {
        dispatch({ createChatFormData: { ...state.createChatFormData, errorDescription: response.reason }});
        return;
    }

    dispatch({createChatFormData: { ...state.createChatFormData, status: true } });
    dispatch(getChats);
    window.router.go('/dialogs');
};

export const addChatUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    const userId = state.addUserFormData.user?.id;
    if (!userId){
        return;
    }
    const chatId = state.activeDialog.id;

    const response = await ChatApi.addChatUser({users: [userId], chatId: chatId});

    if (hasError(response)) {
        dispatch({ createChatFormError: response.reason });
        return;
    }

    dispatch(getChats);
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
        dispatch({ dialogsError: chats.reason});
        return;
    }
    const dialogs: Dialog[] = []
    chats?.forEach(chat => dialogs.push(transformDialog(chat)))
    dispatch({dialogsError: '', dialogs: dialogs });
};

const saveHistoryData = async (data: MessageDTO[]|MessageDTO) =>  {
    const newMessages: Message[] = [];
    const userId = window.store.getState().user?.id;
    if (Array.isArray(data)){
        data?.forEach(data => {
            const message = transformMessage(data, userId)
            newMessages.push(message)
        })
    } else {
        const message = transformMessage(data, userId)
        newMessages.push(message)
    }
    await Promise.all(newMessages?.map(async (message) => {
        const id = message.userId;
        if (id && message.isOtherUser){
            const responseUser = await UserAPI.getUserById({id});
            if (hasError(responseUser)) {
                window.store.dispatch({ dialogsError: responseUser.reason});
                return;
            }
            message.userLogin = responseUser.login;
        }
    }));
    window.store.dispatch({
            history: [...window.store.getState().history, ...newMessages.sort((a,b) => a.time - b.time)] });
}

export const initChatWebSocket = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    const chatId = state.activeDialog?.id;
    const userId = state.user?.id;
    const request = {
        id: chatId
    }
    dispatch({ history: [] });
    const chatsResponse = await ChatApi.getToken(request);
    if (hasError(chatsResponse)) {
        dispatch({ dialogsError: chatsResponse.reason});
        return;
    }
    const token = chatsResponse.token;
    //если сокета не существует
    if (!window.socket.checkExist(chatId)){
        window.socket.addSocket(userId, chatId, token, saveHistoryData);
    }
    window.socket.setActive(chatId)
};


export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: MessageRequest
) => {
    window.socket.sendMessage(payload)
};
