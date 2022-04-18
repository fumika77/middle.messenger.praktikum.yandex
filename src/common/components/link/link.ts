import Block from '../../../utils/Block';

interface LinkProps {
    style?: string;
    link: string;
    text: string;
    onClick?: () => void;
}

export class Link extends Block {
    constructor({ style, link, text, onClick }: LinkProps) {
        super({ style, link, text, events: { click: onClick } });
    }

    static componentName = 'Link';

    render() {
        // language=hbs
        return `
            <a href={{link}} class={{style}}>{{text}}</a>
        `;
    }
}
