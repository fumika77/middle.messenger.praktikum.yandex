import {Login} from "./views/login/login";
import {renderDom} from "./utils/renderDom";
import Button from './common/components/button/index';

import registerComponents from "./utils/registerComponents";
import Input from "./common/components/input";

registerComponents(Button)
registerComponents(Input)
document.addEventListener('DOMContentLoaded', () => {
    const login = new Login();
    renderDom('#app', login)
})

