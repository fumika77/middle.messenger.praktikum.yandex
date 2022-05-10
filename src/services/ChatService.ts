import { default as ChatApi } from '../api/Chats';
import { default as UserApi } from '../api/User';
import {Dispatch} from "../core/Store";
import {hasError} from "../utils/apiHasError";
import {
    ChatCreateRequest,
    ChatListRequest,
    initWebSocketRequest,
    MessageDTO,
    messageRequest,
    TokenRequest
} from "../api/types";

export type Message = {
    time: Date,
    content: string,
    userId: number,
    userLogin: Nullable<string>,
    isMy: boolean,
}

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
    const chatId = state.dialogsFormData.activeDialog.id;
    const userId = state.user.id;
    const request = {
        id: chatId
    }
    const chatsResponse = await ChatApi.getToken(request);
    if (hasError(chatsResponse)) {
        dispatch({ dialogsFormData: {...state.dialogsFormData, dialogsError: chatsResponse.reason} });
        return;
    }
    const token = chatsResponse.token;
    function saveHistoryData (data: MessageDTO[]|MessageDTO) {
        const history: Message[] = state.dialogsFormData.history||[];
        if (Array.isArray(data)){
        data?.forEach(data => {
            const message = {
                time: new Date(data.time),
                content: data.content,
                userId: parseInt(data.user_id),
                userLogin: null,
                isMy: parseInt(data.user_id) === userId,
            }
            history.push(message)
        })
        } else {
            const message = {
                time: new Date(data.time),
                content: data.content,
                userId: parseInt(data.user_id),
                userLogin: null,
                isMy: parseInt(data.user_id) === userId,
            }
            history.push(message)
        }
        dispatch({ dialogsFormData: {...state.dialogsFormData, history: history} });
    }
    //если сокета не существует
    if (!state.socket!.checkExist(chatId)){
        state.socket!.addSocket(userId, chatId, token, saveHistoryData);
    }
    state.socket!.setActive(chatId)
};


export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: messageRequest,
) => {
    console.log(state.dialogsFormData)
    state.socket?.sendMessage(state.dialogsFormData.message)
};
