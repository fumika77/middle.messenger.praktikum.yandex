import mock from 'xhr-mock';
import Auth from "../src/api/Auth";

const signUpData = require("./data/auth/signup.json");
const profileInfoData = require("./data/auth/profileInfo.json");

beforeAll(()=>{
    mock.setup();
})
afterEach(() => {
    mock.teardown()
});

test('Логин', async () => {
    mock.post(`${process.env.API_ENDPOINT}/auth/signin`, {
        headers: {'Content-Type':'application/json'},
        body: 'OK'
    });
    const res = await Auth.login({login:"pirozhok", password:"Qwerty12345"});
    expect(res).toEqual('OK');
});

test('Выход', async () => {
    mock.post(`${process.env.API_ENDPOINT}/auth/logout`, {
        headers: {'Content-Type':'application/json'},
        body: 'OK'
    });
    const res = await Auth.logout();
    expect(res).toEqual('OK');
});

test('Регистрация', async () => {
    mock.post(`${process.env.API_ENDPOINT}/auth/signup`, {
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(signUpData)
    });
    const res = await Auth.signUp({
        "first_name": "alina",
        "second_name": "anina",
        "login": "wonder_musya",
        "email": "kotok@miu.ru",
        "password": "Qwerty12345",
        "phone": "89028908822"
    });
    expect(res).toEqual(signUpData);
});

test('Получение инфо о профиле', async () => {
    mock.get(`${process.env.API_ENDPOINT}/auth/user`, {
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(profileInfoData)
    });
    const res = await Auth.profileInfo();
    expect(res).toEqual(profileInfoData);
});
