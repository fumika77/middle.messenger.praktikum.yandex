import {MessageDTO} from "../api/types";

export class ChatWebSocket{
    private __instance;
    private __socketMap:Record<number, WebSocket>;
    private __activeSocket
    private __timerId
    constructor() {
        if (ChatWebSocket.__instance) {
            return ChatWebSocket.__instance;
        }
        this.__socketMap = {};

        ChatWebSocket.__instance = this;
    }

    public addSocket(userId:number, chatId: number, token: string, saveHistoryData: (data: MessageDTO[]) => void){
        if (this.__socketMap[chatId]) {
            return;
        }
        const socket = this.__socketMap[chatId] = new WebSocket(`${process.env.SOCKET_ENDPOINT}/${userId}/${chatId}/${token}`);
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
            saveHistoryData(data);
        });
        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });

        this.__socketMap[chatId] = socket;
    }

    public setActive(chatId: number){
        if (this.__activeSocket){
            this.cancelKeepAlive();
        }
        if (this.__socketMap[chatId]){
            this.__activeSocket = this.__socketMap[chatId];
            this.keepAlive()
            this.getHistory()
        }

    }

    public keepAlive(timeout = 20000) {
        if (this.__activeSocket.readyState == WebSocket.OPEN) {
            this.__activeSocket.send({
                type: "ping",
            });
        }
        this.__timerId = setTimeout(this.keepAlive.bind(this), timeout);
    }

    public cancelKeepAlive() {
        if (this.__timerId) {
            clearTimeout(this.__timerId);
        }
    }

    public checkExist(chatId: number){
       return !!this.__socketMap[chatId];
    }

    public sendMessage(text:string){
        this.__activeSocket.send(JSON.stringify({
            content: text,
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
