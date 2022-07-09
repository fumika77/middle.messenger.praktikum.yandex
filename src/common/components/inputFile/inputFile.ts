import Block from 'core/Block';
import { withStore } from 'utils';

interface InputFileProps {
    filename: string;
    onChange?: () => void;
}

export class InputFile extends Block {
    constructor({ filename, onChange }: InputFileProps) {
        super({
            filename,
            events: {
                change: onChange,
            },
        });
    }

    static componentName = 'InputFile';

    render() {
        // language=hbs
        return `
                <label for="inputFile" class="button file__input">
                    <input id="inputFile" type="file" name="file"/>
                    <div class="file__name">{{filename}}</div>
                </label>
        `;
    }
}

export default withStore(InputFile);
