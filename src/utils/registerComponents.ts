import Handlebars, { HelperOptions } from 'handlebars';

import Block from '../core/Block';

export default function registerComponents(Component: typeof Block) {
    Handlebars.registerHelper(
        Component.componentName || Component.name,
        ({ hash: { ref, ...hash }, data }: HelperOptions) => {
            if (!data.root.children) {
                data.root.children = {};
            }
            if (!data.root.refs) {
                data.root.refs = {};
            }

            const { children, refs } = data.root;

            const component = new Component(hash);

            children[component.id] = component;

            if (ref) {
                refs[ref] = component.getContent();
            }
            return `<div data-id="id-${component.id}"></div>`;
        },
    );

    Handlebars.registerHelper(
        'isNeedStubForStyle',
        (value) => value == 'profile' || value == 'signUp' || value == 'login',
    );
}
