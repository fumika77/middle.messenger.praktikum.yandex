import mock from 'xhr-mock';
import User from '../src/api/User';

const updateProfileData = require('./data/user/updateProfile.json');
const updateAvatarData = require('./data/user/updateAvatar.json');
const getUserLoginData = require('./data/user/getUserByLogin.json');

beforeAll(() => {
    mock.setup();
});
afterEach(() => {
    mock.teardown();
});

test('Обновление данных о пользователе', async () => {
    mock.put(`${process.env.API_ENDPOINT}/user/profile`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateProfileData),
    });
    const res = await User.updateProfile({
        login: 'super_archi',
        first_name: 'Арчибальд',
        second_name: 'Котиков',
        display_name: 'super_archi',
        email: 'test@miu.ru',
        phone: '89016272834725',
    });
    expect(res).toEqual(updateProfileData);
});

test('Обновление аватара', async () => {
    mock.put(`${process.env.API_ENDPOINT}/user/profile/avatar`, {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: JSON.stringify(updateAvatarData),
    });
    const res = await User.updateAvatar(new File([''], 'filename'));
    expect(res).toEqual(updateAvatarData);
});

test('Обновление пароля', async () => {
    mock.put(`${process.env.API_ENDPOINT}/user/password`, {
        status: 200,
        body: 'OK',
    });
    const res = await User.updatePassword({
        oldPassword: 'Qwerty12345',
        newPassword: 'Qwerty12345678',
    });
    expect(res).toEqual('OK');
});

test('Поиск пользователя по логину', async () => {
    mock.post(`${process.env.API_ENDPOINT}/user/search`, {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: JSON.stringify(getUserLoginData),
    });
    const res = await User.getUserByLogin({ login: 'wonder_musya' });
    expect(res).toEqual(getUserLoginData);
});
