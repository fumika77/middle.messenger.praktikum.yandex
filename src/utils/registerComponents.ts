import Block from './Block';
import {HelperOptions} from 'handlebars';
import Handlebars from 'handlebars';

export default function registerComponents(Component: typeof Block) {
    Handlebars.registerHelper(Component.name, function ({ hash: { ref, ...hash }, data }: HelperOptions) {
        // console.log({...hash})
        // console.log({...data.root})
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
        // console.log(refs)
        return `<div data-id="id-${component.id}"></div>`;
    })
}