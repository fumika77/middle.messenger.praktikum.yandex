import Block from "../../../utils/Block";

interface ButtonProps {
    text: string;
    link: string;
    style: string;
    onClick: () => void;
}

export class Button extends Block<any> {
    constructor({text, link, style, onClick}: ButtonProps) {
        super({text, link, style, events: {click: onClick}});
    }

    render(){
        //language=hbs
        return `
        <a href="{{link}}" class="text && button && {{style}}">{{text}}</a>
        `
    }
}