import Block from 'core/Block';

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
            <div class="button  {{style}}">
                <a class="button__text text" href="{{link}}">{{text}}</a>
            </div>        `;
    }
}
