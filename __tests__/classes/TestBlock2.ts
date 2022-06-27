import Block from "../../src/core/Block";

export class TestBlock2 extends Block {
    getContent(): HTMLElement {
        const div = document.createElement('div');
        div.id = 'test2-div';
        return div;
    }
}
