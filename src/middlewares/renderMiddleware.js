import { render } from '../../node_modules/lit-html/lit-html.js';
const main = document.querySelector('main');


const contextRenderer = (templateResult, location) =>  {
    if (!location) {
        render(templateResult, main)
    } else {
        render(templateResult, location)
    }

}

export function renderMiddleware(ctx, next) {
    ctx.render = contextRenderer;
    next();
}