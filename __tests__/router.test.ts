import { createBrowserHistory } from 'history';
import { BrowserRouter } from '../src/core/Route';
import Login from '../src/views/login';
import Block from '../src/core/Block';
import { TestBlock } from './classes/TestBlock';
import { TestBlock2 } from './classes/TestBlock2';

beforeEach(() => {
    (global as any).window = {
        history: createBrowserHistory(),
    };
});

beforeAll(() => {
    document.body.innerHTML = '<app>\n' + '<div id="app"></div>\n' + '</app>';
});

test('Router - синглтон', () => {
    const router = new BrowserRouter();
    expect(router).toBe(new BrowserRouter());
});

test('Router.use() возвращает Router', () => {
    const router = new BrowserRouter();
    const result = router.use('', Login, {});
    expect(router).toBe(result);
});

test('Router.go() возвращает Router', () => {
    const router = new BrowserRouter();
    class TestBlock extends Block {
        getContent(): HTMLElement {
            const div = document.createElement('div');
            div.id = 'test-div';
            return div;
        }
    }
    router.use('/', TestBlock as any, {});
    router.go('/');
    expect(document.getElementById('test-div')).not.toBe(null);
});

test('Router.back() работает корректно', () => {
    const router = new BrowserRouter();
    router.use('/', TestBlock as any, {});
    router.use('/testBlock2', TestBlock2 as any, {});
    router.go('/');
    router.go('/testBlock2');
    router.back();
    expect(document.getElementById('test-div')).not.toBe(null);
    expect(window.location.pathname).toBe('/');
});

test.only('Router.forward() работает корректно', () => {
    const router = new BrowserRouter();
    router.use('/', TestBlock as any, {});
    router.use('/testBlock2', TestBlock2 as any, {});
    router.go('/');
    router.go('/testBlock2');
    router.back();
    router.forward();
    expect(document.getElementById('test2-div')).not.toBe(null);
    expect(window.location.pathname).toBe('/testBlock2');
});
