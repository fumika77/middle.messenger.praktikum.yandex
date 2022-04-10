import Block from "../../../utils/Block";

interface AvatarProps {
    src: string;
    style?: string;
}

export class Avatar extends Block {
    constructor({src, style}: AvatarProps) {
        super({src, style, events: {}});
    }

    static componentName = 'Avatar';

    render(){
        // language=hbs
        return `
            <img class="{{style}}" src="{{src}}">
        `
    }
}