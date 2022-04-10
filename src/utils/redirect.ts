import { addEventListner } from '../index';

export function redirect(page: string) {
    window.location.hash = page;
    addEventListner();
}
