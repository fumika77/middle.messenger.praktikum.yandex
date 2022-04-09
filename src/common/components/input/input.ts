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
}

export class Input extends Block {
    constructor({type, style, placeholder, value, error, disabled, idForError, onFocus, onBlur}: InputProps) {
        super({type, placeholder, value, error, style, disabled, idForError,
            events: {
                blur: () =>{
                        let errorTextId = idForError+'_errorText';
                        // document.getElementById(errorTextId)!.style.display = "block"
                },
                focus: () => {
                    let errorTextId = idForError+'_errorText';
                    // document.getElementById(errorTextId)!.style.display = "none"
                }
        }}) ;
    }

    render(){
        //language=hbs
        return `
                <input 
                        class="{{#if (isNeedStubForStyle style)}}inputLabel && {{style}}__input {{else}}{{style}}{{/if}}" 
                       placeholder="{{placeholder}}" 
                       type={{type}} 
                       size="40" 
                       value="{{value}}" 
                        {{disabled}}/>
        `
    }
}