import Block from '../../../core/Block';

interface InputLabelProps {
    type: 'text' | 'password' | 'email';
    id: string;
    placeholder?: string;
    value: string;
    error?: string;
    style: string;
    label?: string;
    disabled?: string;
    onChange: () => void;
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
                        value=value
                        onChange=onChange
                        idForError=id
                }}}
                <div class="input__error" id="{{id}}_errorText">{{error}}</div>
            </div>
        `;
    }
}

