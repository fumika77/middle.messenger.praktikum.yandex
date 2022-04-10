import Block from "../../../utils/Block";

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    error?: string;
    style: string;
    disabled?: string;
    idForError?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onInput?: () => void;
}

export class Input extends Block {
    constructor({type, style, placeholder, value, error, disabled, idForError, onInput}: InputProps) {
        super({type, placeholder, value, error, style, disabled, idForError, onInput,
            events: {
                blur: () => {
                    const errorTextId = `${idForError}_errorText`;
                    document.getElementById(errorTextId)!.style.display = "block"
                },
                focus: () => {
                    const errorTextId = `${idForError}_errorText`;
                    document.getElementById(errorTextId)!.style.display = "none"
                },
                input: onInput
            }}) ;
    }

    static componentName = 'Input';

    render(){
        // language=hbs
        return `
                <input class="{{#if (isNeedStubForStyle style)}}inputLabel && {{style}}__input {{else}}{{style}}{{/if}}" 
                       placeholder="{{placeholder}}" 
                       type={{type}} 
                       size="40" 
                       value="{{value}}" 
                        {{#if disabled}}disabled=true{{/if}}
                />
        `
    }
}