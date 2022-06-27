import {MessageDTO, MessageRequest} from "api/types";
import {default as ChatApi} from "api/Chats";
import {hasError} from "utils/apiHasError";
import {transformMessage} from "utils/apiTransformers";
import {default as UserAPI} from "api/User";

export class ChatWebSocket{
    private static __instance;
    private  __socketMap:Map<number, WebSocket>;
    private __activeSocket:WebSocket;
    private __timerId;
    private __historyTimerId;
    constructor() {
        if (ChatWebSocket.__instance) {
            return ChatWebSocket.__instance;
        }
        this.__socketMap = new Map();
        this.__activeSocket = null;
        ChatWebSocket.__instance = this;
    }

    public async saveHistoryData (data: MessageDTO[]|MessageDTO) {
        console.log('saveHistoryData start')
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
                const user = window.userDict.getUser(id);
                if (!user) {
                    const responseUser = await UserAPI.getUserById({id});
                    if (hasError(responseUser)) {
                        window.store.dispatch({dialogsError: responseUser.reason});
                        return;
                    }
                    window.userDict.addUser(responseUser);
                    message.userLogin = responseUser.login;
                } else {
                    message.userLogin = user.login;
                }
            }
        }));
        console.log('saveHistoryData end')
        console.log('saveHistoryData dispatch start')
        const history = [...window.store.getState().history,
            ...newMessages.sort((a,b) => a.time - b.time)];
        console.log('dispatchHisory')
        window.store.dispatch({
            isChatLoading: false,
            history });
        console.log('saveHistoryData dispatch end')
    }

    public async addSocket (userId:number, chatId: number){
        if (this.__socketMap.get(chatId)) {
            return;
        }
        const chatsResponse = await ChatApi.getToken({id: chatId});
        if (hasError(chatsResponse)) {
            window.store.dispatch({ dialogsError: chatsResponse.reason});
            return;
        }
        const {token} = chatsResponse;

        const socket = new WebSocket(`${process.env.SOCKET_ENDPOINT}/${userId}/${chatId}/${token}`);
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
        });
        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        socket.addEventListener('message', event => {
            const data = JSON.parse(event.data);
            if(data.type == "error"){
                console.log('Ошибка', event.data);
            }
            else if (data.type != "pong" && event.type=="message"){
                this.saveHistoryData(data);
            }
        });
        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });

        this.__socketMap.set(chatId, socket);
    }

    public setActive(chatId: number, userId: number){
        if (this.__socketMap.has(chatId)){
            this.__activeSocket = this.__socketMap.get(chatId)!;
            this.__timerId =
                setInterval(() => {
                    if (this.__activeSocket!.readyState !== 1) {
                        this.__activeSocket!.close();
                        this.__socketMap.delete(chatId)
                        this.addSocket(userId, chatId);
                    } else {
                        this.__activeSocket.send(JSON.stringify({
                            type: 'ping',
                        }));
                    }
                }, 10000);
        }
        console.log('socket инициализирован')
        this.getHistory()
    }


    public cancelKeepAlive() {
        if (this.__timerId) {
            clearInterval(this.__timerId);
        }
    }

    public checkExist(chatId: number){
       return !!this.__socketMap[chatId];
    }

    public sendMessage(message: MessageRequest){
        this.__activeSocket.send(JSON.stringify({
            content: message.message,
            type: 'message',
        }))
        window.store.dispatch({isMessageLoading: false})
    }

    public getHistory() {
        console.log('Начинаем получать историю')
        this.__historyTimerId =
            setInterval(() => {
                if (this.__activeSocket!.readyState == 1) {
                    this.__activeSocket?.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));
                    clearInterval(this.__historyTimerId);
                }
            }, 500);
    }
}
