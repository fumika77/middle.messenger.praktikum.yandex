import { default as ChatApi } from 'api/Chats';
import { Dispatch } from 'core/Store';
import { hasError } from 'utils/apiHasError';
import { ChatCreateRequest, ChatListRequest, MessageRequest } from 'api/types';
import { transformDialog } from 'utils/apiTransformers';

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

export const getChats = async (dispatch: Dispatch<AppState>, state: AppState, payload?: Partial<ChatListRequest>) => {
    dispatch({ isDialogsLoading: true });
    const request = payload || ({} as Partial<ChatListRequest>);
    const chats = await ChatApi.getChats(request);
    if (hasError(chats)) {
        dispatch({ dialogsError: chats.reason });
        return;
    }
    const dialogs: Dialog[] = [];
    chats?.forEach((chat) => dialogs.push(transformDialog(chat)));
    dispatch({ dialogsError: '', dialogs, isDialogsLoading: false });
};

export const addChatUser = async (dispatch: Dispatch<AppState>, state: AppState) => {
    const userId = state.addUserFormData.user?.id;
    if (!userId) {
        return;
    }
    const chatId = state.activeDialogId;

    const response = await ChatApi.addChatUser({ users: [userId], chatId: chatId });

    if (hasError(response)) {
        dispatch({ createChatFormError: response.reason });
        return;
    }

    dispatch(getChats);
    window.router.go('/dialogs');
};

export const initChatWebSocket = async (dispatch: Dispatch<AppState>, state: AppState, payload: any) => {
    const chatId = payload.activeDialogId as number;
    const userId = state.user?.id as number;
    dispatch({ ...payload });

    //если сокета не существует
    if (!window.socket.checkExist(chatId)) {
        await window.socket.addSocket(userId, chatId);
    }

    await window.socket.setActive(chatId, userId);
};

export const sendMessage = async (dispatch: Dispatch<AppState>, state: AppState, payload: MessageRequest) => {
    dispatch({ message: '', isMessageLoading: true });
    window.socket.sendMessage(payload);
};
