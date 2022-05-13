import {MessageDTO, MessageRequest} from "../api/types";
import {clearInterval} from "timers";

export class ChatWebSocket{
    private __instance;
    private __socketMap:Map<number, WebSocket>;
    private __activeSocket
    private __timerId
    constructor() {
        if (ChatWebSocket.__instance) {
            return ChatWebSocket.__instance;
        }
        this.__socketMap = new Map();

        ChatWebSocket.__instance = this;
    }

    public addSocket(userId:number, chatId: number, token: string, saveHistoryData: (data: MessageDTO[]) => void){
        if (this.__socketMap.get(chatId)) {
            return;
        }
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
                return;
            }
        else if(data.type != "pong"){
                saveHistoryData(data);
            }
        });
        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });

        this.__socketMap.set(chatId, socket);
    }

    public setActive(chatId: number){
        if (this.__activeSocket){
            this.cancelKeepAlive();
        }
        if (this.__socketMap.has(chatId)){
            this.__activeSocket = this.__socketMap.get(chatId);
            this.__timerId =
                setInterval(() => {
                    if (this.__activeSocket.readyState !== 1) {
                        this.__activeSocket.close().bind;
                        this.__activeSocket(window.store.getState().dialogsFormData.activeDialog.id);
                    } else {
                        this.__activeSocket.send(JSON.stringify({
                            type: 'ping',
                        }));
                    }
                }, 20000);
            this.getHistory()
        }

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
    }

    public getHistory() {
        setTimeout(() => this.__activeSocket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        })), 100);
    }
}
