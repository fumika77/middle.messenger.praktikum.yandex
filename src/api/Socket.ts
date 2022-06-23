export const initWebSocket = (userId: number, chatId: number, token: string) => {
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
        console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', (event) => {
        console.log('Ошибка', event.message);
    });
    return socket;
};
