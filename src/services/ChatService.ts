import {default as ChatApi } from '../api/Chats';
import {default as UserAPI} from '../api/User';
import {Dispatch} from "../core/Store";
import {hasError} from "../utils/apiHasError";
import {
    ChatCreateRequest,
    ChatListRequest,
    initWebSocketRequest,
    MessageDTO,
} from "../api/types";
import {transformDialog, transformMessage} from "../utils/apiTransformers";

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

export const addChatUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    const userId = state.addUserFormData.user?.id;
    if (!userId){
        return;
    }
    const chatId = state.dialogsFormData.activeDialog.id;

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
        dispatch({ dialogsFormData: {...state.dialogsFormData, dialogsError: chats.reason} });
        return;
    }
    const dialogs: Dialog[] = []
    chats?.forEach(chat => dialogs.push(transformDialog(chat)))
    dispatch({dialogsFormData: { ...state.dialogsFormData, dialogsError: '', dialogs: dialogs }});
};

const saveHistoryData = async (dispatch: Dispatch<AppState>, state: AppState, data: MessageDTO[]|MessageDTO) =>  {
    const history: Message[] = state.dialogsFormData.history;
    const userId = state.user?.id;
    if (Array.isArray(data)){
        data?.forEach(data => {
            const message = transformMessage(data, userId)
            history.push(message)
        })
    } else {
        const message = transformMessage(data, userId)
        history.push(message)
    }
    await Promise.all(history?.map(async (message) => {
        const id = message.userId;
        if (id && message.isOtherUser){
            const responseUser = await UserAPI.getUserById({id});
            if (hasError(responseUser)) {
                dispatch({ dialogsFormData: {...state.dialogsFormData, dialogsError: responseUser.reason} });
                return;
            }
            message.userLogin = responseUser.login;
        }
    }));
    dispatch({ dialogsFormData: {...state.dialogsFormData, history: history.sort((a,b) => a.time - b.time)} });
}

export const initChatWebSocket = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: initWebSocketRequest,
) => {
    const chatId = state.dialogsFormData.activeDialog.id;
    const userId = state.user?.id;
    const request = {
        id: chatId
    }
    dispatch({ dialogsFormData: {...state.dialogsFormData, history: []} });
    const chatsResponse = await ChatApi.getToken(request);
    if (hasError(chatsResponse)) {
        dispatch({ dialogsFormData: {...state.dialogsFormData, dialogsError: chatsResponse.reason} });
        return;
    }
    const token = chatsResponse.token;
    //если сокета не существует
    if (!state.socket!.checkExist(chatId)){
        state.socket!.addSocket(userId, chatId, token, dispatch, state, saveHistoryData);
    }
    state.socket!.setActive(chatId)
};


export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    state.socket?.sendMessage(state.dialogsFormData.message)
};
