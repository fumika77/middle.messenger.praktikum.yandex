import Block from '../../../core/Block';
import {withStore} from "../../../utils";
import {Validation} from "../../../utils/validation";
import {Store} from "../../../core/Store";

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    style: string;
    validationType: string;
    value?: string;
    disabled?: string;
    id: string;
    store: Store<AppState>;
}

export class Input extends Block {
    constructor(props: InputProps) {
        let defaultValue;
        let defaultValueErrorText;
        if (props.validationType=='password'||props.validationType=='password_repeat'){
            defaultValue =  props.store.getState().passwordValidation[props.validationType]
            defaultValueErrorText =  props.store.getState().passwordValidation[`${props.validationType}ErrorText`]
        } else {
            defaultValue = props.value
        }
        super({
            ...props,
            defaultValue,
            defaultValueErrorText,
            events: {
                focusout: () => {
                    document.getElementById(`${props.id}ErrorText`)!.style.display = 'block';
                },
                focusin: () => {
                    document.getElementById(`${props.id}ErrorText`)!.style.display = 'hidden';
                },
                change: () =>{
                    this.state.onChange()
                },
            },
        });
    }

    static componentName = 'Input';

    protected getStateFromProps() {
        this.state = {
            value: this.props.defaultValue || '',
            error: this.props.defaultValueErrorText||'',

            onChange: () => {
                console.log('Input Change')
                let value = (document.getElementById(this.props.id) as HTMLInputElement)?.value;
                let nextState;
                if (this.props.validationType=='password'||this.props.validationType=='password_repeat'){
                    this.props.store.dispatch({passwordValidation: {
                            ...this.props.store.getState().passwordValidation,
                            [this.props.validationType]: value,
                        }})
                    let validationResults = Validation(this.props.store.getState().passwordValidation)[this.props.validationType];
                    nextState = {
                        value: this.props.store.getState().passwordValidation[this.props.validationType],
                        error:  validationResults?.status? '' : validationResults?.errorText
                    }
                    this.props.store.dispatch({passwordValidation: {
                        ...this.props.store.getState().passwordValidation,
                            [`${this.props.validationType}ErrorText`]: nextState.error
                        }})
                } else if (this.props.validationType){
                    let validationResults = Validation({ [this.props.validationType]: value})[this.props.validationType];
                    nextState = {
                        value: value,
                        error:  validationResults.status? '' : validationResults.errorText
                    }
                } else
                {
                    nextState = {value};
                }
                this.setState(nextState)
            }
        }
    }

    protected componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    render() {
         const {error, value} = this.state;
        // language=hbs
        return `
            <div class="input__wrapper">
                <input class="{{#if (isNeedStubForStyle style)}}inputLabel {{style}}__input {{else}}{{style}}{{/if}}" 
                       placeholder="{{placeholder}}" 
                       type={{type}} 
                       size="40" 
                       value="${value}"
                       id="{{id}}"
                       {{#if disabled}}disabled=true{{/if}}
                />
                {{{ErrorText errorText="${error}" id="${this.props?.id}"}}}
            <div/>
        `;
    }
}

export default withStore(Input, 'Input')