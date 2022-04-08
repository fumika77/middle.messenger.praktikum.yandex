import Block from "../../../utils/Block";

interface AvatarProps {
    src: string;
    style?: string;
}

export class Avatar extends Block {
    constructor({src}: AvatarProps) {
        super({src, events: {}});
    }

    render(){
        //language=hbs
        return `
            <img class="{{style}}" src="{{src}}">
        `
    }
}