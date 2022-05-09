import Block from '../../../core/Block';

interface BackArrowProps {
    link: string;
    onClick?: () => void;
}

export class BackArrow extends Block {
    constructor({ link, onClick }: BackArrowProps) {
        const linkClick = (e: MouseEvent) => {
            e.preventDefault()
            onClick!()
        };
        super({ link, events: { click: linkClick } });
    }

    static componentName = 'BackArrow';

    render() {
        // language=hbs
        return `
            <a class="arrowLink" href="{{link}}">
                <img class="profileDescription__arrowImg" src="img/arrow-left-square---filled(40x40)@1x.png">
            </a>
        `;
    }
}
