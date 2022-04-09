import Block from "../../../utils/Block";
import {nanoid} from "nanoid";

interface InputLabelProps {
    type: 'text' | 'password' | 'email';
    id: string;
    placeholder?: string;
    value: string;
    error?: string;
    style: string;
    label?:string;
    disabled?:string;
}

export class InputLabel extends Block {
    constructor({type, id, label, style, placeholder, value, error, disabled}: InputLabelProps) {
        super({type, id, label, style, placeholder, value, error, disabled,
            onBlur: () => {
            },
            onFocus: () => {
            },
            events: {}
        }, 'InputLabel___'+nanoid(2));
    }

    render(){
        //language=hbs
        return `
            <div class="{{style}}__inputWrapper">
                <label class="{{style}}__label" for={{id}}>{{label}}</label>
                    {{{Input style=style
                        placeholder=placeholder
                        type=type
                        value=value
                        onBlur=onBlur
                        onFocus=onFocus
                        idForError=id
                }}}
                <div class="input__error" id="{{id}}_errorText">{{error}}</div>
            </div>
        `
    }
}