import Block from "../../../utils/Block";

interface AvatarProps {
    src: string;
    onClick?: () => void;
}

export class Avatar extends Block {
    constructor({src, onClick}: AvatarProps) {
        super({src, events: {click: onClick}});
    }

    render(){
        //language=hbs
        return `
            <img class="profileImg" src="{{src}}">
        `
    }
}