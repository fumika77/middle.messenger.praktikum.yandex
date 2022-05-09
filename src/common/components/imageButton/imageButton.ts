import Block from '../../../core/Block';

interface ImageButtonProps {
    src: string;
    link: string;
    style: string;
    onClick: () => void;
}

export class ImageButton extends Block<any> {
    constructor({ src, link, style, onClick }: ImageButtonProps) {
        const buttonClick = (e: MouseEvent) => {
            e.preventDefault()
            onClick()
        };
        super({ src, link, style, events: { click: buttonClick } });
    }

    static componentName = 'ImageButton';

    render() {
        // language=hbs
        return `
            <a class="{{style}}" href="{{link}}">{{text}}
            <img src="{{src}}">
        </a>
        `;
    }
}
