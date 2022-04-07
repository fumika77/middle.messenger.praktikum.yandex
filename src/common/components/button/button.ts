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

    protected componentDidUpdate (oldProps: any,newProps:any){
        return !oldProps.login==newProps.login && oldProps.password==newProps.password;
    }
    render(){
        //language=hbs
        return `
        <a class="text && button && {{style}}">{{text}}</a>
<!--        <a href="{{link}}" class="text && button && {{style}}">{{text}}</a>-->
        `
    }
}