import Block from '../core/Block';
import Store from '../core/Store';

export function withStore<T>(Component: typeof Block) {
    return class extends Component{
        public static componentName = Component.name;

        constructor(props: T & { store: Store<AppState> }) {
            super({ ...props, store: window.store });
        }

        componentDidMount(props: T & { store: Store<AppState> }) {
            super.componentDidMount(props);

            this.props.store.on('change', () => {
                console.log('store changed')
                this.setProps({
                    ...this.props,
                    store: window.store,
                });
            });
        }
    };
}
