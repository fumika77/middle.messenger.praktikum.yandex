import Block from './Block';
import { renderDOM } from '../utils/renderDOM';

function isEqual(value1, value2) {
    return value1 === value2;
}
export class Route {
    protected _pathname;
    protected _blockClass;
    protected _block;
    protected _props;

    constructor(pathname: string, view: typeof Block, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }
    leave() {
        if (this._block) {
            this._block.onHide();
        }
    }
    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }
    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            renderDOM(this._block);
            return;
        }
        this._block.onShow();
    }
}

export class BrowserRouter {
    private routes;
    private history;
    private _currentRoute: Nullable<Route>;
    private static __instance;

    constructor() {
        if (BrowserRouter.__instance) {
            return BrowserRouter.__instance;
        }

        this.routes = [] as Route[];
        this.history = window.history;
        this._currentRoute = null;

        BrowserRouter.__instance = this;
    }

    public use(pathname: string, block: typeof Block, props: any) {
        const route = new Route(pathname, block, props);

        this.routes?.push(route);

        return this;
    }

    public start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname: string) {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history?.back();
    }

    public forward() {
        this.history?.forward();
    }

    private getRoute(pathname: string) {
        const route = this.routes?.find((route) => route.match(pathname));
        return route || this.routes?.find((route) => route.match('*'));
    }
}
