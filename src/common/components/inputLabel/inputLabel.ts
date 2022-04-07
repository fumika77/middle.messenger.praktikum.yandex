import Block from "../../../utils/Block";

interface InputLabelProps {
    type: 'text' | 'password' | 'email';
    id: string;
    placeholder?: string;
    value: string;
    error?: string;
    style: string;
    label:string;
    disabled?:string;
    onChange?: () => void;
}

export class InputLabel extends Block {
    constructor({type, id, label, style, placeholder, value, error, disabled, onChange}: InputLabelProps) {
        super({type, id, label, style, placeholder, value, error, disabled, events: {input: onChange}});
    }

    render(){
        //language=hbs
        return `
            <div class="{{style}}__inputWrapper">
                <label class="{{style}}__label" for={{id}}>{{label}}</label>
                <input class="inputLabel && {{style}}__input" type={{type}} size="40" id="{{id}}" value="{{value}}" {{disabled}}/>
                <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
            </div>
        `
    }
}