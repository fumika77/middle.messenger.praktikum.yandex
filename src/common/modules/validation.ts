interface IValidationFields {
    login?: string,
    password?: string,
    repeatPassword?: string,
    email?: string,
    first_name?: string,
    second_name?: string,
    phone?: string,
}

export interface IError {
    status: boolean,
    errorText?: string
}

function checkNames(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^[A-Z][a-z-]+$/u, "").length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Некорректное значение'
        }
        return false;
    } else return true;
}

function checkLogin(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^[a-zA-Z0-9-_]{3,20}$/, "").length > 0 &&
        value?.replace(/^[0-9]$/, "").length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Недопустимые символы'
        }
        return false;
    } else return true;
}

function checkPassword(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "").length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Выбранный пароль не удовлетворяет требованиям'
        }
        return false;
    } else return true;
}

function checkPhone(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^(8|\+7|7)[\d+]{10,15}$/, "").length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Введен некорректный номер телефона'
        }
        return false;
    } else return true;
}

function checkEmail(validationResults: { [id: string]: IError }, key: string, value: string) {
    if (value?.replace(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "")?.length > 0) {
        validationResults[key] = {
            status: false,
            errorText: 'Некорректное значение'
        }
        return false;
    } else return true;
}

function checkPasswordRepeat(validationResults: { [id: string]: IError }, key: string, value: string, repeatValue: string | undefined) {
    if (value !== repeatValue) {
        validationResults[key] = {
            status: false,
            errorText: 'Значения паролей не совпадают'
        }
        return false;
    } else return true;
}


export function Validation(fields: IValidationFields): { [id: string]: IError } {
    let validationResults: { [id: string]: IError } = {};
    Object.keys(fields).forEach(key => {
        // @ts-ignore
        let value: any = fields[key];
        if (value == undefined || value == null) {
            validationResults[key] = {
                status: false,
                errorText: 'Пустое значение'
            }
        } else {
            if (key == 'second_name' || key == 'first_name') {
                checkNames(validationResults, key, value)
            } else if (key == 'login') {
                checkLogin(validationResults, key, value)
            } else if (key == 'phone') {
                checkPhone(validationResults, key, value)
            } else if (key == 'password') {
                checkPassword(validationResults, key, value)
            }
             else if (key == 'password_repeat') {
               checkPasswordRepeat(validationResults, key, value, fields.password)
            } else if (key == 'email') {
                checkEmail(validationResults, key, value)
            }
            if (!validationResults[key]) {
                validationResults[key] = {
                    status: true
                }
            }
        }
    });
    return validationResults;
}