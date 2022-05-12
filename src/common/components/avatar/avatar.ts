import Block from '../../../core/Block';

interface AvatarProps {
    src: Nullable<string>;
    style?: string;
}

export class Avatar extends Block {
    constructor({ src, style }: AvatarProps) {
        const link = (src!=='null') ? `https://ya-praktikum.tech/api/v2/resources/${src}` : 'img/user(144x144)@1x.png';
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
