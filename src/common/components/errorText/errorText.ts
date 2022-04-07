import Block from "../../../utils/Block";

interface IErrorTextProps {
    errorText?: string;
}

export class ErrorText extends Block {
    constructor({errorText}: IErrorTextProps) {
        super({errorText
            // , events: {
            // onblur: super.show()
            // , onfocus: () =>{console.log('учспех onfocus');
            //     document.getElementById('errorText')!.style.display = "none"},}});
        }, "ErrorText___component"  )
console.log('Constructor ErrorText')
    }

    render(){
        //language=hbs
        return `
            <div class="input__error">{{errorText}}</div>
        `
    }
}