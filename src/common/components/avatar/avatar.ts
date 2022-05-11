import Block from '../../../core/Block';

interface AvatarProps {
    src: string;
    style?: string;
}

export class Avatar extends Block {
    constructor({ src, style }: AvatarProps) {
        const link = src? `https://ya-praktikum.tech/api/v2/resources/${src}` : null;
        super({ link, style, events: {} });
    }

    static componentName = 'Avatar';

    protected componentDidMount() {
        if (!this.props.src){
            return;
        }
    }

    render() {
        // language=hbs
        return `
            <img class="{{style}}" src="{{link}}">
        `;
    }
}
