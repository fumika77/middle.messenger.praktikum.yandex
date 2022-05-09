import Block from '../../../core/Block';

interface LinkProps {
    style?: string;
    link: string;
    text: string;
    onClick?: (e?: MouseEvent) => void;
}

export class Link extends Block {
    constructor({ style, link, text, onClick }: LinkProps) {
        const linkClick = (e: MouseEvent) => {
            e.preventDefault()
            onClick!()
        };
        super({ style, link, text, events: { click: linkClick } });
    }

    static componentName = 'Link';

    render() {
        // language=hbs
        return `
            <a href="{{link}}" class="{{style}}">{{text}}</a>
        `;
    }
}
