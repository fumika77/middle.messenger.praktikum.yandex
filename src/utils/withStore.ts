import Block from '../core/Block';
import { Store } from '../core/Store';

export function withStore<T>(Component: typeof Block, name?: string) {
    return class extends Component {
        public static componentName = name || Component.name;

        constructor(props: T & { store: Store<AppState> }) {
            super({ ...props, store: window.store });
        }

        componentDidMount(props: T & { store: Store<AppState> }) {
            super.componentDidMount(props);

            this.props.store.on('change', () => {
                this.setProps({
                    ...this.props,
                    store: window.store,
                });
            });
        }
    };
}
