import Block from 'core/Block';

interface InputLabelProps {
    type: 'text' | 'password' | 'email';
    id: string;
    validationType: string;
    value?: string;
    placeholder?: string;
    style: string;
    label?: string;
    disabled?: string;
}

export class InputLabel extends Block {
    constructor(props: InputLabelProps) {
        super({ ...props, events: {} });
    }

    static componentName = 'InputLabel';

    render() {
        // language=hbs
        return `
            <div class="{{style}}__inputWrapper">
                <label class="{{style}}__label" for={{id}}>{{label}}</label>
                    {{{Input style=style
                        placeholder=placeholder
                        disabled=disabled
                        type=type
                        id=id
                        value=value
                        validationType=validationType
                }}}
            </div>
        `;
    }
}

