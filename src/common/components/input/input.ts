import Block from "../../../utils/Block";

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    error?: string;
    classList: string;
    ref?: string;
    onChange?: () => void;
}

export class Input extends Block {
    constructor({type, classList, placeholder, value, error, ref, onChange}: InputProps) {
        super({type, placeholder, value, error, classList, ref, events: {input: onChange}}) ;
    }


    render(){
        //language=hbs
        return `
            <div class="input__wraper">
                <input class="{{classList}}" placeholder="{{placeholder}}" type={{type}} size="40" value="{{value}}"/>
                <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
            </div>
        `
    }
}