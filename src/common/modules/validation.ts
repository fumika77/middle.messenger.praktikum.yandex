interface IValidationFields{
    login?: string,
    password?: string,
    repeatPassword?: string,
    email?:string,
    name?:string,
    secondName?:string,
}

export interface IError{
    status: boolean,
    errorText  ?: string
}

function checkEmpty(validationResults: {[id: string]: IError}, key: string, value: string) {
    if (value?.trim() == '') {
        validationResults[key] = {
            status: false,
            errorText: 'Пустое значение'
        }
        return false;
    }
    else return true;
}

function checkSymbols(validationResults: {[id: string]: IError}, key: string, value: string) {
    if (value?.toLowerCase().replace(/^[a-zA-Z0-9]+$/, "")?.length > 0) {
        console.log('value?.toLowerCase().replace(/^[a-zA-Z0-9]+$/, "")')
        console.log(value?.toLowerCase().replace(/^[a-zA-Z0-9]+$/, ""))
        validationResults[key] = {
            status: false,
            errorText: 'Некорректное значение'
        }
        return false;
    }
    else return true;
}
function checkPasswordLength(validationResults: {[id: string]: IError}, key: string, value: string) {
    if (value.length<5) {
        validationResults[key] = {
            status: false,
            errorText: 'Длина пароля не соответствует требованиям'
        }
        return false;
    }
    else return true;
}

function checkPasswordRepeat(validationResults: {[id: string]: IError}, key: string, value: string, repeatValue: string|undefined) {
    if (value!==repeatValue) {
        validationResults[key] = {
            status: false,
            errorText: 'Значения паролей не совпадают'
        }
        return false;
    }
    else return true;
}

function checkEmail(validationResults: {[id: string]: IError}, key: string, email: string) {
    if (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        validationResults[key] = {
            status: false,
            errorText: 'Некорректное значение'
        }
        return false;
    }
    else return true;
}

export function Validation (fields: IValidationFields): {[id: string]: IError} {
    let validationResults: {[id: string]: IError} = {};
    Object.keys(fields).forEach(key => {
        // @ts-ignore
        let value: any = fields[key];
            if (value == undefined){
                validationResults[key] = {
                    status: false,
                    errorText: 'Пустое значение'
                }
            }
            else {
                if (key == 'login' || key == 'secondName'  || key == 'name'){
                    if (checkEmpty(validationResults, key, value)) {
                        checkSymbols(validationResults, key, value)
                    }
                }
                if (key == 'password') {
                    if (checkPasswordLength(validationResults, key, value))
                    {
                        (checkPasswordRepeat(validationResults, key, value, fields.repeatPassword))
                    }
                }
                if (key == 'email'){
                    if (checkEmpty(validationResults, key, value)) {
                        checkEmail(validationResults, key, value)
                    }
                }
                if (!validationResults[key]){
                    validationResults[key] = {
                        status: true
                    }
                }
        }
    });
    return validationResults;
}