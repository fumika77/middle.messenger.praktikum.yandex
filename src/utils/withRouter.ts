import Block from './Block';
import { BrowserRouter } from '../core/HashRouter';

export function withRouter<T>(Component: typeof Block) {
    return class WithRouter extends Component<T> {
        public static componentName = Component.name;

        constructor(props: T & { router: BrowserRouter }) {
            super({ ...props, router: window.router });
        }
    };
}
