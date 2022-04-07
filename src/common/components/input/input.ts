import Block from "../../../utils/Block";

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    error?: string;
    classList: string;
    onChange?: () => void;
}

export class Input extends Block {
    constructor({type, classList, placeholder, value, error, onChange}: InputProps) {
        super({type, placeholder, value, error, classList, events: {input: onChange}});
    }

    render(){
        //language=hbs
        return `
            <div>
                <input class="{{classList}}" placeholder="{{placeholder}}" type={{type}} size="40" value="{{value}}"/>
                <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
            </div>
        `
    }
}