import { nanoid } from "nanoid";
import Block from "../../../utils/Block";

interface ButtonProps {
    text: string;
    link: string;
    style: string;
    onClick: (pageValues:any) => void;
}

export class Button extends Block<any> {
    constructor({text, link, style, onClick}: ButtonProps) {
        super({text,  link, style, events: {click: onClick}}, 'button'+nanoid(6));
    }

    render(){
        //language=hbs
        return `
        <a href="{{link}}" class="text && button && {{style}}">{{text}}</a>
        `
    }
}