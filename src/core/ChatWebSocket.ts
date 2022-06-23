import { MessageDTO, MessageRequest } from '../api/types';
import { clearInterval } from 'timers';
import { default as ChatApi } from '../api/Chats';
import { hasError } from '../utils/apiHasError';
import { transformMessage } from '../utils/apiTransformers';
import { default as UserAPI } from '../api/User';

export class ChatWebSocket {
    private static __instance;
    private static __socketMap: Map<number, WebSocket>;
    private static __activeSocket: Nullable<WebSocket>;
    private __timerId;
    constructor() {
        if (ChatWebSocket.__instance) {
            return ChatWebSocket.__instance;
        }
        ChatWebSocket.__socketMap = new Map();
        ChatWebSocket.__activeSocket = null;
        ChatWebSocket.__instance = this;
    }

    public async saveHistoryData(data: MessageDTO[] | MessageDTO) {
        const newMessages: Message[] = [];
        const userId = window.store.getState().user?.id;
        if (Array.isArray(data)) {
            data?.forEach((data) => {
                const message = transformMessage(data, userId);
                newMessages.push(message);
            });
        } else {
            const message = transformMessage(data, userId);
            newMessages.push(message);
        }
        await Promise.all(
            newMessages?.map(async (message) => {
                const id = message.userId;
                if (id && message.isOtherUser) {
                    const responseUser = await UserAPI.getUserById({ id });
                    if (hasError(responseUser)) {
                        window.store.dispatch({ dialogsError: responseUser.reason });
                        return;
                    }
                    message.userLogin = responseUser.login;
                }
            }),
        );
        window.store.dispatch({
            history: [...window.store.getState().history, ...newMessages.sort((a, b) => a.time - b.time)],
        });
    }

    public async addSocket(userId: number, chatId: number) {
        if (ChatWebSocket.__socketMap.get(chatId)) {
            return;
        }
        const chatsResponse = await ChatApi.getToken({ id: chatId });
        if (hasError(chatsResponse)) {
            window.store.dispatch({ dialogsError: chatsResponse.reason });
            return;
        }
        const token = chatsResponse.token;

        const socket = new WebSocket(`${process.env.SOCKET_ENDPOINT}/${userId}/${chatId}/${token}`);
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
        });
        socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.type == 'error') {
                console.log('Ошибка', event.data);
                return;
            } else if (data.type != 'pong' && event.type == 'message') {
                this.saveHistoryData(data);
            }
        });
        socket.addEventListener('error', (event) => {
            console.log('Ошибка', event.message);
        });

        this.__socketMap.set(chatId, socket);
    }

    public setActive(chatId: number) {
        if (ChatWebSocket.__socketMap.has(chatId)) {
            ChatWebSocket.__activeSocket = ChatWebSocket.__socketMap.get(chatId);
            this.__timerId = setInterval(() => {
                if (this.__activeSocket.readyState !== 1) {
                    this.__activeSocket.close();
                    const chatId = window.store.getState().activeDialog.id!;
                    const userId = window.store.getState().user?.id!;
                    ChatWebSocket.__socketMap.delete(chatId);
                    this.addSocket(userId, chatId);
                } else {
                    this.__activeSocket.send(
                        JSON.stringify({
                            type: 'ping',
                        }),
                    );
                }
            }, 10000);
        }
        this.getHistory();
    }

    public cancelKeepAlive() {
        if (this.__timerId) {
            clearInterval(this.__timerId);
        }
    }

    public checkExist(chatId: Nullable<number>) {
        return !!this.__socketMap[chatId];
    }

    public sendMessage(message: MessageRequest) {
        this.__activeSocket.send(
            JSON.stringify({
                content: message.message,
                type: 'message',
            }),
        );
    }

    public getHistory() {
        setTimeout(
            () =>
                ChatWebSocket.__activeSocket?.send(
                    JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }),
                ),
            100,
        );
    }
}
