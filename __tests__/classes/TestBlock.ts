import Block from "../../src/core/Block";

export class TestBlock extends Block {
    getContent(): HTMLElement {
        const div = document.createElement('div');
        div.id = 'test-div';
        return div;
    }
}
