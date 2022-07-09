import { Validation } from '../src/utils/validation';
import { BrowserRouter } from '../src/core/Route';

describe('Тестирование валидации пароля', function () {
    test('Корректный пароль', () => {
        expect(Validation({ password: 'Asdhkf678' })).toStrictEqual({
            password: {
                status: true,
            },
        });
    });
    test('Плохой пароль', () => {
        expect(Validation({ password: 'Asdh' })).toStrictEqual({
            password: {
                status: false,
                errorText: 'Выбранный пароль не удовлетворяет требованиям',
            },
        });
    });
});

describe('Тестирование валидации логина', function () {
    test('Корректный логин', () => {
        expect(Validation({ login: 'Ololosha' })).toStrictEqual({
            login: {
                status: true,
            },
        });
    });
    test('Недопустимые символы в логине', () => {
        expect(Validation({ login: 'Asdh##' })).toStrictEqual({
            login: {
                status: false,
                errorText: 'Недопустимые символы',
            },
        });
    });
    test('Недопустимые символы в логине', () => {
        expect(Validation({ login: 'Asd' })).toStrictEqual({
            login: {
                status: false,
                errorText: 'Значение должно содержать более 3 символов',
            },
        });
    });
});

describe('Тестирование валидации номера телефона', function () {
    test('Корректный номер телефона', () => {
        expect(Validation({ phone: '8800033829789' })).toStrictEqual({
            phone: {
                status: true,
            },
        });
    });
    test('Некорректный номер телефона', () => {
        expect(Validation({ phone: '080003382' })).toStrictEqual({
            phone: {
                status: false,
                errorText: 'Введен некорректный номер телефона',
            },
        });
    });
});

describe('Тестирование валидации email', function () {
    test('Корректный email', () => {
        expect(Validation({ email: 'ololosha@mail.ru' })).toStrictEqual({
            phone: {
                status: true,
            },
        });
    });
    test('Некорректный email', () => {
        expect(Validation({ email: 'ololoshakot.ru' })).toStrictEqual({
            phone: {
                status: false,
                errorText: 'Некорректное значение',
            },
        });
    });
});

describe('Тестирование валидации текста сообщения', function () {
    test('Корректный текст', () => {
        expect(Validation({ message: 'AAAA' })).toStrictEqual({
            message: {
                status: true,
            },
        });
    });
    test('Корректный текст', () => {
        expect(Validation({ message: '' })).toStrictEqual({
            message: {
                status: true,
                message: 'Пустое значение',
            },
        });
    });
});
