import JSDOM from "jsdom";
import {BrowserRouter} from "../src/core/Route";
import Login from "../src/views/login";
import { createBrowserHistory } from "history";

beforeEach( () => {
    (global as any).window = {
        history: createBrowserHistory()
    };
})

test('Router - синглтон', () => {
    const router = new BrowserRouter();
    expect(router).toBe(new BrowserRouter());
});

test('Router.use() возвращает Router', () => {
    const router = new BrowserRouter();
    const result = router.use('', Login, {})
    expect(router).toBe(result);
});

test('Router.go() возвращает Router', () => {
    const router = new BrowserRouter();
    const result = router.use('', Login, {})
    expect(window.document.getElementById('Login')).not.toBe(null);
});