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
}

export class InputLabel extends Block {
    constructor({type, id, label, style, placeholder, value, error, disabled}: InputLabelProps) {
        super({type, id, label, style, placeholder, value, error, disabled,
            events: {
                input: ()=>{
                    console.log('input')
                }
        }}, 'inputLavel____asas');

    }
    protected getStateFromProps() {
        this.state = {
            onBlur: () => {
                document.getElementById('errorText')!.style.display = "block"
            },
            onFocus: () => {
                document.getElementById('errorText')!.style.display = "none"
            }
        }
    }
    setListners(){
            document.getElementById('inputField')!.onblur = function () {
                console.log('onblur')
                document.getElementById('errorText')!.style.display = "block";
            };
            document.getElementById('inputField')!.onfocus = function () {
                console.log('onfocus')
                document.getElementById('errorText')!.style.display = "none";
            };
    }


    render(){
        console.log('document.getElementById(\'errorText\').style.display')
        console.log(document.getElementById('errorText')?.style.display)
        return `
            <div class="{{style}}__inputWrapper">
                <label class="{{style}}__label" for={{id}}>{{label}}</label>
                <input
                onblur = onBlur
                onfocus = onFocus
                class="inputLabel && {{style}}__input" type={{type}} size="40" id="{{id}}" value="{{value}}" {{disabled}}/>
                <div  id="errorText" ref="errorText" class="input__error">{{error}}</div>
<!--                <div  id="errorText" ref="errorText" class="input__error">{{#if error}}{{error}}{{/if}}</div>-->
            </div>
        `
    }
}