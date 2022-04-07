import Block from "../../utils/Block";

interface IErrorPageProps {
    errorNumber:number,
    errorDescription: string
}

export class ErrorPage extends Block<IErrorPageProps>{
    protected getStateFromProps(props:IErrorPageProps) {
        this.state = {
            values: {
                errorNumber:props.errorNumber,
                errorDescription: props.errorDescription
            }
        }
    }

    render() {
        const {values} = this.state;
        //language=hbs
        return `
            <main>
                <div class="error__box">
                    <main class="error__header && error__text && text">"${values.errorNumber}"</main>
                    <main class="error__description && error__text && text">"${values.errorDescription}"}</main>
                    <a class="error__action && error__text && text" href="">Вернуться к чатам</a>
                </div>
            </main>
        `
    }
}