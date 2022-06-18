import Block from '../../../core/Block';
import {withStore} from "../../../utils";

interface IErrorTextProps {
    errorText?: string;
    id  : string;
}

export class ErrorText extends Block {
    constructor({id, errorText }: IErrorTextProps) {
        super({id, errorText });
    }

    static componentName = 'ErrorText';

    render() {
        // language=hbs
        return `
                <div class="input__error" {{#if id}}id="{{id}}ErrorText"{{/if}}>{{errorText}}</div>
        `;
    }
}

export default withStore(ErrorText)