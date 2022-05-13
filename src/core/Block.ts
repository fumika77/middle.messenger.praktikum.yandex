import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    private _element: HTMLElement | null = null;

    private readonly _meta: { props: any };

    public id = nanoid(6);

    static componentName: string;

    protected readonly props: any;

    protected children: { [id: string]: Block } = {};

    eventBus: () => EventBus;

    protected state: any = {};

    protected refs: { [key: string]: HTMLElement } = {};

    constructor(props?: any) {
        const eventBus = new EventBus();

        this._meta = {
            props,
        };

        this.props = this._makePropsProxy(props || ({} as any));

        this.state = this._makePropsProxy(this.state);
        this.getStateFromProps(props);
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    protected getStateFromProps(props: any): void {
        this.state = {...props} as any;
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(props: any) {
        this.componentDidMount(props);
    }

    // Может переопределять пользователь, необязательно трогать
    protected componentDidMount(props: any) {}

    _componentDidUpdate(oldProps: any, newProps: any) {
        if (this._element && this._element.style.display === 'none'){
            return;
        }
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    setState = (nextState: any) => {
        if (!nextState) {
            return;
        }
        Object.assign(this.state, nextState);
        this.dispatchComponentDidMount();
    };

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _render() {
        const fragment = this.compile();
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    // Может переопределять пользователь, необязательно трогать
    protected render(): string {
        return '';
    }

    getContent(): HTMLElement {
        // Хак, чтобы вызвать CDM только после добавления в DOM
        if (this._element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this._element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100);
        }
        return this._element!;
    }

    _makePropsProxy(props: any) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Ошибка доступа');
            },
        });
    }

    _removeEvents() {
        const { events } = this.props;
        if (!events || !this._element) {
        }
    }

    _addEvents() {
        const { events } = this.props as any;
        if (!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element?.addEventListener(event, listener);
        });
    }

    compile() {
        const fragment = document.createElement('template');
        const template = Handlebars.compile(this.render());
        const htmlString = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });
        fragment.innerHTML = htmlString;

        Object.entries(this.children).forEach(([key, child]) => {
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
            if (!stub) {
                return;
            }
            stub.replaceWith(child.getContent()!);
        });
        return fragment.content;
    }

    onShow() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
        this.getContent().style.display = 'block';
    }

    onHide() {
        this.getContent().style.display = 'none';
    }
}