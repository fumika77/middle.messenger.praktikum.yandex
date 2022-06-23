import Block from '../../../core/Block';

interface BackArrowProps {
    onClick: () => void;
}

export class LogoutButton extends Block {
    constructor({ onClick }: BackArrowProps) {
        const buttonClick = (e: MouseEvent) => {
            e.preventDefault();
            onClick();
        };
        super({ events: { click: buttonClick } });
    }

    static componentName = 'LogoutButton';

    render() {
        // language=hbs
        return `
            <a class="logout__button">
                <img src="img/logout(40x40)@1x.png">
            </a>
        `;
    }
}
