import mock from 'xhr-mock';
import Chats from '../src/api/Chats';

const chatData = require('./data/chats/chats.json');
const createChatData = require('./data/chats/createChat.json');
const getTokenData = require('./data/chats/getToken.json');

beforeAll(() => {
    mock.setup();
});
afterEach(() => {
    mock.teardown();
});

test('Получение списка чатов', async () => {
    mock.get(`${process.env.API_ENDPOINT}/chats`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatData),
    });
    const res = await Chats.getChats();
    expect(res).toEqual(chatData);
});

test('Создание чата', async () => {
    mock.post(`${process.env.API_ENDPOINT}/chats`, {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: JSON.stringify(createChatData),
    });
    const res = await Chats.createChat({ title: 'New chat' });
    expect(res).toEqual(createChatData);
});

test('Добавление пользователей в чат', async () => {
    mock.put(`${process.env.API_ENDPOINT}/chats/users`, {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: 'OK',
    });
    const res = await Chats.addChatUser({ users: [298], chatId: 4 });
    expect(res).toEqual('OK');
});

test('Получение токена для чата', async () => {
    mock.post(`${process.env.API_ENDPOINT}/chats/token/2`, {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: JSON.stringify(getTokenData),
    });
    const res = await Chats.getToken({ id: 2 });
    expect(res).toEqual(getTokenData);
});
