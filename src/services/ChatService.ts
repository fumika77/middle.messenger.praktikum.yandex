import { default as ChatApi } from '../api/Chats';
import { default as UserAPI } from '../api/User';
import { Dispatch } from '../core/Store';
import { hasError } from '../utils/apiHasError';
import { ChatCreateRequest, ChatListRequest, MessageDTO, MessageRequest } from '../api/types';
import { transformDialog, transformMessage } from '../utils/apiTransformers';

export const createChat = async (dispatch: Dispatch<AppState>, state: AppState, payload: ChatCreateRequest) => {
    const response = await ChatApi.createChat(payload);

    if (hasError(response)) {
        dispatch({ createChatFormData: { ...state.createChatFormData, errorDescription: response.reason } });
        return;
    }

    dispatch({ createChatFormData: { ...state.createChatFormData, status: true } });
    dispatch(getChats);
    window.router.go('/dialogs');
};

export const addChatUser = async (dispatch: Dispatch<AppState>, state: AppState) => {
    const userId = state.addUserFormData.user?.id;
    if (!userId) {
        return;
    }
    const chatId = state.activeDialog.id;

    const response = await ChatApi.addChatUser({ users: [userId], chatId: chatId });

    if (hasError(response)) {
        dispatch({ createChatFormError: response.reason });
        return;
    }

    dispatch(getChats);
    window.router.go('/dialogs');
};

export const getChats = async (dispatch: Dispatch<AppState>, state: AppState, payload?: Partial<ChatListRequest>) => {
    const request = payload ? payload : ({} as Partial<ChatListRequest>);
    const chats = await ChatApi.getChats(request);
    if (hasError(chats)) {
        dispatch({ dialogsError: chats.reason });
        return;
    }
    const dialogs: Dialog[] = [];
    chats?.forEach((chat) => dialogs.push(transformDialog(chat)));
    dispatch({ dialogsError: '', dialogs: dialogs });
};

export const initChatWebSocket = async (dispatch: Dispatch<AppState>, state: AppState) => {
    const chatId = state.activeDialog?.id;
    const userId = state.user?.id;
    dispatch({ history: [] });
    //если сокета не существует
    if (!window.socket.checkExist(chatId)) {
        if (typeof userId === 'number') {
            await window.socket.addSocket(userId, chatId);
        }
    }
    window.socket.setActive(chatId);
};

export const sendMessage = async (dispatch: Dispatch<AppState>, state: AppState, payload: MessageRequest) => {
    window.socket.sendMessage(payload);
    dispatch({ message: '' });
};
