import {nanoid} from "nanoid";
import Block from "../../../utils/Block";

interface InputLabelProps {
    type: 'text' | 'password' | 'email';
    id: string;
    placeholder?: string;
    value: string;
    error?: string;
    style: string;
    label?:string;
    disabled?:string;
    onInput: () => void;
}

export class InputLabel extends Block {
    constructor({type, id, label, style, placeholder, value, error, disabled, onInput}: InputLabelProps) {
        super({type, id, label, style, placeholder, value, error, disabled, onInput,
            events: {}
        });
    }

    static componentName = 'InputLabel';

    render(){
        // language=hbs
        return `
            <div class="{{style}}__inputWrapper">
                <label class="{{style}}__label" for={{id}}>{{label}}</label>
                    {{{Input style=style
                        placeholder=placeholder
                        disabled=disabled
                        type=type
                        value=value
                        onInput=onInput
                        idForError=id
                }}}
                <div class="input__error" id="{{id}}_errorText">{{error}}</div>
            </div>
        `
    }
}