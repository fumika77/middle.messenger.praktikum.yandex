import Block from "../../../utils/Block";

interface BackArrowProps {
    link: string;
    onClick?: () => void;
}

export class BackArrow extends Block {
    constructor({link, onClick}: BackArrowProps) {
        super({link, events: {click: onClick}});
    }

    render(){
        //language=hbs
        return `
            <a class="arrowLink" href="{{link}}">
                <img class="profileDescription__arrowImg" src="../../../static/img/arrow-left-square---filled(40x40)@1x.png">
            </a>
        `
    }
}