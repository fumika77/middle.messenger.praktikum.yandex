import {IValidationFields} from "./validation";
import {addEventListner} from "../index";

export function redirect(page: string, errors?: IValidationFields){
    window.location.hash = page;
    addEventListner()
}