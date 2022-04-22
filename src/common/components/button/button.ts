import Block from '../../../core/Block';

interface ButtonProps {
    text: string;
    link: string;
    style: string;
    onClick: () => void;
}

export class Button extends Block {
    constructor({ text, link, style, onClick }: ButtonProps) {
        super({ text, link, style, events: { click: onClick } });
    }

    static componentName = 'Button';

    render() {
        // language=hbs
        return `
        <a class="text && button && {{style}}">{{text}}</a>
        `;
    }
}
