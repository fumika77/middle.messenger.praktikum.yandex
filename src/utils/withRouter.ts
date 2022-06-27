import {BrowserRouter} from "core/Route";
import Block from "../core/Block";


export function withRouter(Component: typeof Block) {
    return class WithRouter extends Component {
        public static componentName = Component.name;

        constructor(props: any & { router: BrowserRouter }) {
            super({ ...props, router: window.router });
        }
    };
}
