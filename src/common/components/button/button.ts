import Block from '../../../core/Block';

interface ButtonProps {
    text: string;
    link: string;
    style: string;
    onClick: () => void;
}

export class Button extends Block {
    constructor({ text, link, style, onClick }: ButtonProps) {
        const buttonClick = (e: MouseEvent) => {
            e.preventDefault()
            onClick()
        };
        super({ text, link, style, events: { click: buttonClick } });
    }

    static componentName = 'Button';

    render() {
        // language=hbs
        return `
            <div class="button button__text {{style}}">
            <a class="text " href="{{link}}">{{text}}</a>
        </div>
        `;
    }
}
