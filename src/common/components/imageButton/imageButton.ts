import Block from '../../../core/Block';

interface ImageButtonProps {
    src: string;
    link: string;
    style: string;
    onClick: (pageValues: any) => void;
}

export class ImageButton extends Block<any> {
    constructor({ src, link, style, onClick }: ImageButtonProps) {
        super({ src, link, style, events: { click: onClick } });
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
