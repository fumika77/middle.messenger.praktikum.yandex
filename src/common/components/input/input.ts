import Block from '../../../core/Block';

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    error?: string;
    style: string;
    disabled?: string;
    idForError?: string;
    onChange?: () => void;
}

export class Input extends Block {
    constructor({ type, style, placeholder, value, error, disabled, idForError, onChange }: InputProps) {
        super({
            type,
            placeholder,
            value,
            error,
            style,
            disabled,
            idForError,
            onChange,
            events: {
                blur: () => {
                    const errorTextId = `${idForError}_errorText`;
                    document.getElementById(errorTextId)!.style.display = 'block';
                },
                focus: () => {
                    const errorTextId = `${idForError}_errorText`;
                    document.getElementById(errorTextId)!.style.display = 'none';
                },
                change: onChange,
            },
        });
    }

    static componentName = 'Input';

    render() {
        // language=hbs
        return `
                <input class="{{#if (isNeedStubForStyle style)}}inputLabel && {{style}}__input {{else}}{{style}}{{/if}}" 
                       placeholder="{{placeholder}}" 
                       type={{type}} 
                       size="40" 
                       value="{{value}}" 
                        {{#if disabled}}disabled=true{{/if}}
                />
        `;
    }
}
