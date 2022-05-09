export interface IValidationFields {
    login?: string;
    old_password?: string;
    password?: string;
    repeat_password?: string;
    email?: string;
    first_name?: string;
    second_name?: string;
    phone?: string;
    message?: string;
}

export interface IError {
    status: boolean;
    errorText?: string;
}

function checkNames(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^[A-ZА-Я][a-zа-я-]+$/u, '').length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Некорректное значение',
        };
        return false;
    }
    return true;
}

function checkLogin(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^[a-zA-Z0-9-_]{3,20}$/, '').length > 0 && value?.replace(/^[0-9]$/, '').length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Недопустимые символы',
        };
        return false;
    }
    return true;
}

function checkPassword(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, '').length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Выбранный пароль не удовлетворяет требованиям',
        };
        return false;
    }
    return true;
}

function checkPhone(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^(8|\+7|7)[\d+]{10,15}$/, '').length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Введен некорректный номер телефона',
        };
        return false;
    }
    return true;
}

function checkEmail(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, '')?.length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Некорректное значение',
        };
        return false;
    }
    return true;
}

function checkMessage(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value == undefined || value == null || value == '') {
        validationResults[key] = {
            status: false,
            errorText: 'Пустое значение',
        };
        return false;
    }
    return true;
}

function checkPasswordRepeat(
    validationResults: { [id: string]: IError },
    key: string,
    value: string,
    repeatValue: string | undefined,
) {
    if (value !== repeatValue) {
        validationResults[key] = {
            status: false,
            errorText: 'Значения паролей не совпадают',
        };
        return false;
    }
    return true;
}

export function Validation(fields: IValidationFields): { [id: string]: IError } {
    const validationResults: { [id: string]: IError } = {};
    Object.keys(fields).forEach((key) => {
        // @ts-ignore
        const value: any = fields[key];
        if (key == 'second_name' || key == 'first_name') {
            checkNames(validationResults, key, value);
        } else if (key == 'login') {
            checkLogin(validationResults, key, value);
        } else if (key == 'phone') {
            checkPhone(validationResults, key, value);
        } else if (key == 'password') {
            checkPassword(validationResults, key, value);
        } else if (key == 'password_repeat') {
            checkPasswordRepeat(validationResults, key, value, fields.password);
        } else if (key == 'email') {
            checkEmail(validationResults, key, value);
        } else if (key == 'message') {
            checkMessage(validationResults, key, value);
        }
        if (!validationResults[key]) {
            validationResults[key] = {
                status: true,
            };
        }
    });
    return validationResults;
}
