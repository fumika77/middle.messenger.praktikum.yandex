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
    onBlur: () => void;
}


                    // onblur = {document.getElementById('errorText')!.style.display = "block"}
                    //    onfocus =  {document.getElementById('errorText')!.style.display = "none"}
export class InputLabel extends Block {
    constructor({type, id, label, style, placeholder, value, error, disabled, onBlur}: InputLabelProps) {
        super({type, id, label, style, placeholder, value, error, disabled, onBlur,
            events: {
                input: ()=>{
                    console.log('input')
                }
        }}, 'inputLabel____asas');

    }


    render(){
        //language=hbs
        return `
            <div class="{{style}}__inputWrapper">
                <label class="{{style}}__label" for={{id}}>{{label}}</label>
                <input class="inputLabel && {{style}}__input"
                       type={{type}} size="40" id="{{id}}" value="{{value}}" {{disabled}}/>
                <div  id="errorText" class="input__error">{{#if error}}{{error}}{{/if}}</div>
            </div>
        `
    }
}