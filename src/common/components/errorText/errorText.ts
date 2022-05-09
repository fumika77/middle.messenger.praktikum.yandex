import Block from '../../../core/Block';
import {withStore} from "../../../utils";

interface IErrorTextProps {
    errorText?: string;
}

export class ErrorText extends Block {
    constructor({ errorText }: IErrorTextProps) {
        super({ errorText });
    }

    static componentName = 'ErrorText';

    render() {
        // language=hbs
        return `
            <div class="input__error">{{errorText}}</div>
        `;
    }
}

export default withStore(ErrorText)