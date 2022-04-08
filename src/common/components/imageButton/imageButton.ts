import Block from "../../../utils/Block";

interface ImageButtonProps {
    src: string;
    link: string;
    style: string;
    onClick: (pageValues:any) => void;
}

export class ImageButton extends Block<any> {
    constructor({src, link, style, onClick}: ImageButtonProps) {
        super({src,  link, style, events: {click: onClick}});
    }

    render(){
        //language=hbs
        return `
<!--        <a href="{{link}}" class="{{style}}">{{text}}-->
        <a class="{{style}}">{{text}}
            <img src="{{src}}">
        </a>
        `
    }
}